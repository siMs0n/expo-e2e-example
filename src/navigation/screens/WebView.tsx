import { Text } from "@react-navigation/elements";
import { StyleSheet, View } from "react-native";
import { HomeTabScreenProps } from "..";
import { envConfig } from "../../../env";

export function WebView({ route }: HomeTabScreenProps<"WebView">) {
  const urlSuffix = route.params?.urlSuffix ?? "default-link";
  const url = `https://${envConfig.partnerUrl}/${urlSuffix}`;

  if (envConfig.appProfile === "e2e-test") {
    // In E2E tests we want to show the URL in the UI to be able to assert on it
    // In a real app you would of course load the URL in a WebView component instead
    return (
      <View style={styles.container}>
        <Text>{url}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>WebView Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
});
