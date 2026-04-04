// Type definitions for Face By You app

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  makeupScore?: number;
}

export interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export interface MakeupLook {
  id: string;
  name: string;
  image: string;
  score?: number;
  createdAt: Date;
}

export interface ScoreCategory {
  id: string;
  name: string;
  score: number;
  icon: string;
}

export interface MakeupAnalysis {
  overallScore: number;
  lookType: string;
  categories: ScoreCategory[];
  tips: AnalysisTip[];
}

export interface AnalysisTip {
  id: string;
  text: string;
  position: { x: number; y: number };
  type: "positive" | "suggestion";
}

export interface AuthFormData {
  email: string;
  password: string;
  confirmPassword?: string;
  name?: string;
}

export type AuthMode = "login" | "signup";

export type TabRoute = "home" | "scan" | "bookings" | "profile";

export type FbyIconName =
  | "user"
  | "shield"
  | "logout"
  | "map"
  | "pencil"
  | "userDouble"
  | "share"
  | "copy"
  | "questionMark"
  | "calendarLove"
  | "camera"
  | "qrcode";

export const fbyIcons: Record<FbyIconName, any> = {
  user: require("@/assets/icons/user-icon.png"),
  shield: require("@/assets/icons/shield-heart.png"),
  logout: require("@/assets/icons/logout.png"),
  map: require("@/assets/icons/map.png"),
  pencil: require("@/assets/icons/pencil.png"),
  userDouble: require("@/assets/icons/user-double.png"),
  share: require("@/assets/icons/share.png"),
  copy: require("@/assets/icons/copy.png"),
  questionMark: require("@/assets/icons/question-mark.png"),
  calendarLove: require("@/assets/icons/calendar-love.png"),
  camera: require("@/assets/icons/camera.png"),
  qrcode: require("@/assets/images/qrcode.png"),
};
