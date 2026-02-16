import { Assets as NavigationAssets } from "@react-navigation/elements";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { Asset } from "expo-asset";
import * as SplashScreen from "expo-splash-screen";
import * as React from "react";
import { useColorScheme } from "react-native";
import { Navigation } from "./navigation";
import { useSetupMsw } from "../test/useSetupMsw";
import { envConfig } from "../env";
import { AuthProvider } from "./auth/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const queryClient = new QueryClient();

Asset.loadAsync([
  ...NavigationAssets,
  require("./assets/mood-check.png"),
  require("./assets/home.png"),
  require("./assets/building.png"),
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
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Navigation
          theme={theme}
          linking={{
            prefixes: linkingPrefixes,
          }}
          onReady={() => {
            SplashScreen.hideAsync();
          }}
        />
      </QueryClientProvider>
    </AuthProvider>
  );
}
