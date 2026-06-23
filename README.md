# Face By You — Mobile

> AI-powered makeup assistant mobile app that scans your face, scores your look, and delivers personalised beauty guidance.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [App Screens](#app-screens)
- [Project Structure](#project-structure)
- [Styling & Theming](#styling--theming)
- [Authentication](#authentication)
- [Configuration](#configuration)

---

## Overview

**Face By You** is a React Native mobile app (iOS & Android) for an AI-driven makeup companion. Users capture multi-angle face photos, receive a detailed makeup score broken down by category (contour, blend quality, foundation, symmetry, colour balance, etc.), view their history of scanned looks, and get actionable improvement tips — all wrapped in a modern purple-and-cream brand aesthetic.

---

## Tech Stack

| Layer          | Technology                                                                   |
| -------------- | ---------------------------------------------------------------------------- |
| Framework      | [Expo](https://expo.dev/) (SDK 54) with Expo Router (file-based routing)     |
| Language       | TypeScript                                                                   |
| UI Library     | React Native                                                                 |
| Styling        | [NativeWind](https://www.nativewind.dev/) (Tailwind CSS for React Native)    |
| State (global) | [Zustand](https://zustand-demo.pmnd.rs/)                                     |
| State (server) | [TanStack React Query](https://tanstack.com/query/latest)                    |
| Forms          | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) v4 |
| Backend / Auth | [Supabase](https://supabase.com/) (Auth, Database)                           |
| Email          | [Resend](https://resend.com/)                                                |
| Camera         | Expo Camera + Expo Image Manipulator                                         |
| Animations     | React Native Reanimated                                                      |
| Fonts          | Inter, Abhaya Libre (via `@expo-google-fonts`)                               |
| Icons          | Ionicons (`@expo/vector-icons`)                                              |
| Secure Storage | Expo Secure Store                                                            |

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** (bundled with Node)
- **Expo CLI** (installed via npx)
- **iOS Simulator** (macOS) or **Android Emulator** / physical device with [Expo Go](https://expo.dev/go)

### Installation

```bash
# Clone the repository
git clone <repo-url> fby-mobile
cd fby-mobile

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the project root with:

```env
EXPO_PUBLIC_SUPABASE_URL=<your-supabase-url>
EXPO_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>
EXPO_PUBLIC_RESEND_API_KEY=<your-resend-api-key>
```

### Development

```bash
# Start the Expo dev server
npx expo start

# Start with cache cleared
npx expo start -c
```

Scan the QR code with Expo Go (Android) or open the iOS Simulator link.

---

## Available Scripts

| Script    | Command            | Description                                   |
| --------- | ------------------ | --------------------------------------------- |
| `start`   | `expo start`       | Start the Expo development server             |
| `android` | `expo run:android` | Build and run on an Android device / emulator |
| `ios`     | `expo run:ios`     | Build and run on an iOS simulator / device    |
| `web`     | `expo start --web` | Start the web version (Metro bundler)         |

---

## App Screens

### Tab Navigation

The app uses a bottom tab bar with four tabs (custom rounded pill design with purple active state):

| Tab     | Screen           | Description                                                                         |
| ------- | ---------------- | ----------------------------------------------------------------------------------- |
| Home    | `(tabs)/index`   | Personalised greeting, makeup score badge, camera CTA, recent looks carousel        |
| Scan    | `(tabs)/scan`    | Viewfinder UI with "Score your look" button to launch the camera                    |
| History | `(tabs)/history` | Featured last-score gradient card, past look list, daily tips, overall analysis     |
| Profile | `(tabs)/profile` | Avatar, user info, avg score badge, links to settings (info, privacy, help, invite) |

### Core Flows

| Screen              | Route              | Description                                                                                                                         |
| ------------------- | ------------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| Onboarding / Splash | `index`            | Animated FBY logo splash with fade-in transition                                                                                    |
| Auth                | `auth`             | Login / Sign-up tabs with form validation, email verification, social login stubs (Google, Apple, Facebook)                         |
| Forgot Password     | `forgot-password`  | OTP-based password reset via Supabase                                                                                               |
| Reset Password      | `reset-password`   | New password entry after OTP verification                                                                                           |
| Take Picture        | `take-picture`     | Multi-step camera capture (front face → right profile → left profile) with face frame guide                                         |
| Scan Score          | `scan-score`       | Captured image with AI callout overlays + 6-category score grid (contour, blend, foundation, base finish, symmetry, colour balance) |
| Full Analysis       | `full-analysis`    | Detailed breakdown and recommendations for a scanned look                                                                           |
| Overall Analysis    | `overall-analysis` | Aggregated analysis across all scans                                                                                                |
| Personal Info       | `personal-info`    | Edit username, DOB, nationality                                                                                                     |
| Privacy & Data      | `privacy-data`     | Privacy settings, data permissions, privacy policy, terms of use                                                                    |
| Help & Support      | `help-support`     | FAQ sections (how it works, makeup guidance), contact us form                                                                       |
| Invite a Friend     | `invite-friend`    | Referral / invite flow                                                                                                              |
| Notifications       | `notifications`    | Notification centre                                                                                                                 |

---

## Project Structure

```
fby-mobile/
├── app/                        # Expo Router screens (file-based routing)
│   ├── (tabs)/                 # Tab navigator screens
│   │   ├── _layout.tsx         # Tab bar config (custom rounded design)
│   │   ├── index.tsx           # Home tab
│   │   ├── scan.tsx            # Scan tab
│   │   ├── history.tsx         # History tab
│   │   └── profile.tsx         # Profile tab
│   ├── _layout.tsx             # Root layout (providers, theme, auth gate)
│   ├── index.tsx               # Splash / onboarding
│   ├── auth.tsx                # Login & sign-up
│   └── ...                     # Other screens (take-picture, scan-score, etc.)
├── components/
│   ├── ui/                     # Reusable UI components (Avatar, Button, Card, Input, LookCard, ScoreCard)
│   ├── chat/                   # Chat animation components (onboarding preview)
│   ├── icons/                  # Custom tab bar icons
│   └── navigation/             # Bottom navigation components
├── src/
│   ├── api/                    # API service layer
│   │   ├── auth/               # Supabase auth service
│   │   └── email/              # Resend email service
│   ├── components/             # Auth gate component
│   ├── hooks/                  # Custom hooks (useAuth, useSocialAuth)
│   ├── providers/              # React context providers (AuthProvider)
│   └── store/                  # Zustand stores (useAuthStore)
├── store/                      # Additional stores (capturedImageStore)
├── constants/                  # Theme tokens, utility helpers
├── lib/                        # Constants (emails, socials, env links) & Zod validation schemas
├── types/                      # TypeScript type definitions
├── assets/                     # Images, icons, fonts, splash screens
├── supabase/                   # Supabase migrations
├── android/                    # Native Android project
├── app.json                    # Expo configuration
├── tailwind.config.js          # NativeWind / Tailwind theme (V2 purple palette)
├── babel.config.js             # Babel config (NativeWind preset)
├── metro.config.js             # Metro bundler config
└── package.json
```

---

## Styling & Theming

### NativeWind (Tailwind CSS for React Native)

The app uses **NativeWind v4** with a comprehensive custom theme defined in `tailwind.config.js`.

#### Brand Palette (V2)

| Token           | Value     | Usage                                          |
| --------------- | --------- | ---------------------------------------------- |
| `v2-bg-base`    | `#f4f0e8` | Main screen background (warm cream)            |
| `v2-purple`     | `#b891f7` | Primary accent — buttons, active nav, progress |
| `v2-text-dark`  | `#1c1b22` | Headings, bold labels                          |
| `v2-text-body`  | `#383643` | Body copy, card titles                         |
| `v2-text-muted` | `#565364` | Secondary labels, placeholders                 |
| `v2-text-nav`   | `#737080` | Bottom nav bar background                      |
| `v2-coral`      | `#ff7a6d` | Avatar ring, icon accent                       |

#### Typography

| Family           | Class                   | Usage               |
| ---------------- | ----------------------- | ------------------- |
| Inter            | `font-inter`            | Body text, labels   |
| Inter SemiBold   | `font-inter-semibold`   | Buttons, navigation |
| Abhaya Libre     | `font-abhaya-bold`      | Headlines, scores   |
| Abhaya ExtraBold | `font-abhaya-extrabold` | Hero CTA text       |

---

## Authentication

Authentication is handled via **Supabase Auth** with the following flows:

- **Email/Password** — Sign up with username, email, DOB, and password
- **Email Verification** — OTP code sent via Supabase, verified in-app
- **Forgot/Reset Password** — OTP-based password reset flow
- **Social Login** — Google, Apple, and Facebook stubs (currently disabled)
- **Auth Gate** — `AuthGate` component wraps the app to redirect unauthenticated users
- **Session Persistence** — Via `expo-secure-store` and Zustand

Transactional emails (welcome, admin notifications) are sent through **Resend** after successful email verification.

---

## Configuration

| File                 | Purpose                                                    |
| -------------------- | ---------------------------------------------------------- |
| `app.json`           | Expo config — app name, slug, icons, splash, bundle IDs    |
| `tsconfig.json`      | TypeScript — `@/*` path alias maps to `./`                 |
| `tailwind.config.js` | NativeWind — V2 purple palette, custom fonts, border radii |
| `babel.config.js`    | Babel — `nativewind/babel` preset                          |
| `metro.config.js`    | Metro — NativeWind CSS interop                             |
| `.env`               | Environment — Supabase URL/key, Resend API key             |

---

## Platforms

| Platform | Bundle ID           | Notes                                 |
| -------- | ------------------- | ------------------------------------- |
| iOS      | `com.facebyyou.app` | Supports tablet, portrait orientation |
| Android  | `com.facebyyou.app` | Edge-to-edge enabled, adaptive icon   |
| Web      | —                   | Metro bundler with static output      |

---

## License

This project is private and proprietary.
