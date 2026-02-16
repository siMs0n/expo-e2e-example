import { Button, Text } from "react-native";
import { StyleSheet, View } from "react-native";
import { HomeTabScreenProps } from "..";
import { useQuery } from "@tanstack/react-query";
import { fetchUserAccount } from "../../api/user-api";

export function Home({ navigation }: HomeTabScreenProps<"Home">) {
  const { data, isLoading } = useQuery({
    queryKey: ["account"],
    queryFn: fetchUserAccount,
  });

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
