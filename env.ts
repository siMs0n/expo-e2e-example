import Constants from "expo-constants";
import { Platform } from "react-native";
import easConfig from "./eas.json";

interface ExpoExtraConfig {
  appProfile: "e2e-test" | "development" | "qa" | "production";
}

const appProfile = (Constants.expoConfig!.extra as ExpoExtraConfig).appProfile;
const easEnv = easConfig.build[appProfile].env;

export const envConfig = {
  buildNumber:
    Platform.OS === "android"
      ? Constants.expoConfig?.android?.versionCode?.toString()
      : Constants.expoConfig?.ios?.buildNumber,
  appName: easEnv.EXPO_PUBLIC_APP_NAME,
  backendUrl: easEnv.EXPO_PUBLIC_BACKEND_URL,
  appProfile: appProfile,
};
