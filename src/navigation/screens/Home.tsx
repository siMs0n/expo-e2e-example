import { Button, Text } from "react-native";
import { StyleSheet, View } from "react-native";
import { HomeTabScreenProps } from "..";
import { useUser } from "../../api/useUser";
import { NotFoundError } from "../../api/user-api";
import { useEffect } from "react";

export function Home({ navigation }: HomeTabScreenProps<"Home">) {
  const { data, error, isLoading } = useUser();

  useEffect(() => {
    const isNotFound = error instanceof NotFoundError;

    if (isNotFound) {
      navigation.navigate("Registration");
    } else if (error) {
      console.error("Error fetching user account: ", error);
    }
  }, [error, navigation]);

  return (
    <View style={styles.container}>
      {isLoading && <Text>Loading...</Text>}
      {data && <Text>Hello {data.name}!</Text>}
      <Button
        title="Open first link"
        onPress={() =>
          navigation.navigate("WebView", { urlSuffix: "first-link" })
        }
      />
      <Button
        title="Open second link"
        onPress={() =>
          navigation.navigate("WebView", { urlSuffix: "second-link" })
        }
      />
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
