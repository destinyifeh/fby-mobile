import { APP_CONFIG, EMAILS, ENV_LINKS, SOCIALS } from "@/lib/constants";
import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system/legacy";
import { Resend } from "resend";

const resendApiKey = process.env.EXPO_PUBLIC_RESEND_API_KEY;
const resend = new Resend(resendApiKey);

/**
 * Helper to load an HTML file from assets and replace placeholders.
 */
async function loadAndPopulate(module: any, data: Record<string, string>) {
  try {
    const asset = Asset.fromModule(module);
    await asset.downloadAsync();

    if (!asset.localUri) {
      throw new Error("Could not get local URI for template");
    }

    let html = await FileSystem.readAsStringAsync(asset.localUri);

    // Replace all {{key}} with value
    Object.entries(data).forEach(([key, value]) => {
      html = html.replace(new RegExp(`{{${key}}}`, "g"), value || "");
    });

    return html;
  } catch (error) {
    console.error("Error loading email template:", error);
    return "";
  }
}

const BASE_DATA = {
  website_link: ENV_LINKS.PROD,
  instagram_link: SOCIALS.INSTAGRAM,
  tiktok_link: SOCIALS.TIKTOK,
  linkedin_link: SOCIALS.LINKEDIN,
};

export const emailService = {
  /**
   * Sends a welcome email to a new user and an admin notification.
   */
  sendSignUpEmails: async (email: string) => {
    try {
      if (!email || !email.includes("@")) {
        console.error("Invalid email");
        return null;
      }

      const now = new Date();
      const dateTimeStr = now.toLocaleString("en-US", {
        dateStyle: "full",
        timeStyle: "long",
      });

      // 1. Send Welcome Email to User
      const welcomeHtml = await loadAndPopulate(
        require("@/assets/welcome-email.html"),
        {
          instagram_link: SOCIALS.INSTAGRAM,
          website_link: ENV_LINKS.PROD,
          linkedin_link: SOCIALS.LINKEDIN,
          tiktok_link: SOCIALS.TIKTOK,
        },
      );

      const { data: userData, error: userError } = await resend.emails.send({
        from: `Face By You <${EMAILS.NOREPLY}>`,
        to: email,
        subject: "Welcome to Face By You!",
        html: welcomeHtml,
      });

      if (userError) {
        console.error("Error sending welcome email:", userError);
      }

      // 2. Send Admin Notification
      const adminHtml = await loadAndPopulate(
        require("@/assets/admin-notification.html"),
        {
          email: email,
          dateTime: dateTimeStr,
          origin: APP_CONFIG.ORIGIN,
          status: APP_CONFIG.STATUS,
          website_link: ENV_LINKS.PROD,
        },
      );

      const { data: adminData, error: adminError } = await resend.emails.send({
        from: `Waitlist Notifier <${EMAILS.NOREPLY}>`,
        to: EMAILS.ADMIN,
        subject: "New Waitlist Entry!",
        html: adminHtml,
      });

      if (adminError) {
        console.error("Error sending admin notification:", adminError);
      }

      return { userData, adminData };
    } catch (error) {
      console.error("Waitlist API error:", error);
      return null;
    }
  },

  /**
   * Sends a support or issue report email to the admin.
   */
  sendSupportEmail: async (
    type: "contact" | "issue",
    name: string,
    email: string,
    message: string,
  ) => {
    try {
      const supportHtml = await loadAndPopulate(
        require("@/assets/support-email-template.html"),
        {
          TYPE: type === "issue" ? "ISSUE" : "SUPPORT",
          USER_NAME: name,
          USER_EMAIL: email,
          MESSAGE: message,
          TIMESTAMP: new Date().toLocaleString("en-US", {
            dateStyle: "full",
            timeStyle: "long",
          }),
        },
      );

      const result = await resend.emails.send({
        from: `Support Form <${EMAILS.NOREPLY}>`,
        to: EMAILS.ADMIN,
        subject:
          type === "issue"
            ? "Issue Report - Face By You"
            : "Support Inquiry - Face By You",
        html: supportHtml,
      });
      console.log(result, "rirriii");
      if (result?.error) {
        console.error("Error sending support email:", result.error);
        throw result.error;
      }
      return result;
    } catch (error) {
      console.error("Failed to send support email:", error);
      throw error;
    }
  },
};
