import { Text } from "@react-navigation/elements";
import { Button, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

export function Login() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text>Login Screen</Text>
      <Button
        onPress={() => navigation.navigate("BankIDAuth")}
        title="Login with BankID"
      ></Button>
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
  row: {
    flexDirection: "row",
    gap: 10,
  },
});
