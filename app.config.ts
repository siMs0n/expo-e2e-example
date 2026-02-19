import "dotenv/config";
import { ExpoConfig } from "expo/config";
import easConfig from "./eas.json";

declare let process: {
  env: NodeJS.ProcessEnv & {
    // Comes from build[<buildProfile>].env in eas.json when building with EAS Build, or from environment variables when running locally
    APP_PROFILE?: "e2e-test" | "development" | "qa" | "production";
  };
};

const appProfile = process.env.APP_PROFILE || "development";
const easEnv = easConfig.build[appProfile].env;

const schemes = ["expoe2eexample"];
if (appProfile !== "production") {
  schemes.push(`expoe2eexample-${appProfile}`);
}

const config: ExpoConfig = {
  name: easEnv.EXPO_PUBLIC_APP_NAME,
  slug: "expo-e2e-example",
  version: "0.1.0",
  icon: "./assets/adaptive-icon.png",
  scheme: schemes,
  userInterfaceStyle: "light",
  ios: {
    bundleIdentifier: easEnv.EXPO_PUBLIC_IOS_APP_ID,
    buildNumber: "1771009452",
  },
  android: {
    package: easEnv.EXPO_PUBLIC_ANDROID_APP_ID,
    versionCode: 1771009452,
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  plugins: [
    "expo-asset",
    [
      "expo-splash-screen",
      {
        backgroundColor: "#ffffff",
        image: "./assets/splash-icon.png",
      },
    ],
  ],
  extra: {
    eas: {
      projectId: "1295bd32-6210-4368-ab37-e545cee91545",
    },
    appProfile,
  },
};

export default config;
