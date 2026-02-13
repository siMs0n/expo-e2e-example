import { Button, Text } from "@react-navigation/elements";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";

export function Home() {
  useEffect(() => {
    fetch("https://e2e.simoncnielsen.com/api/v1/account")
      .then((response) => response.json())
      .then((data) => {
        console.log("Account data:", data);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Text>Open up 'src/App.tsx' to start working on your app!</Text>
      <Button screen="Profile" params={{ user: "jane" }}>
        Go to Profile
      </Button>
      <Button screen="Settings">Go to Settings</Button>
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
