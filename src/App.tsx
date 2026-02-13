import { Assets as NavigationAssets } from "@react-navigation/elements";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { Asset } from "expo-asset";
import * as SplashScreen from "expo-splash-screen";
import * as React from "react";
import { useColorScheme } from "react-native";
import { Navigation } from "./navigation";
import { useSetupMsw } from "../test/useSetupMsw";
import { envConfig } from "../env";

Asset.loadAsync([
  ...NavigationAssets,
  require("./assets/newspaper.png"),
  require("./assets/bell.png"),
]);

SplashScreen.preventAutoHideAsync();

const linkingPrefixes = ["https://simoncnielsen.com"];

// To ease testing app links in local development
if (
  envConfig.appProfile === "development" ||
  envConfig.appProfile === "e2e-test"
) {
  linkingPrefixes.push("expoe2eexample-" + envConfig.appProfile);
}

export function App() {
  const colorScheme = useColorScheme();

  const theme = colorScheme === "dark" ? DarkTheme : DefaultTheme;

  // Only used in E2E tests when app profile is set to "e2e-test"
  const mswReady = useSetupMsw();
  if (!mswReady) {
    return null;
  }

  return (
    <Navigation
      theme={theme}
      linking={{
        prefixes: linkingPrefixes,
      }}
      onReady={() => {
        SplashScreen.hideAsync();
      }}
    />
  );
}
