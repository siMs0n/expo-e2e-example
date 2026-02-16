import { Text } from "@react-navigation/elements";
import { Button, StyleSheet, View, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import logo from "../../assets/mood-check.png";
import { envConfig } from "../../../env";
import { E2ETestingModal } from "../../../test/E2ETestingModal";
import { useState } from "react";

export function Login() {
  const navigation = useNavigation();
  const [showE2ETestingModal, setShowE2ETestingModal] = useState(false);

  const openE2EModal = () => {
    setShowE2ETestingModal(true);
  };

  return (
    <>
      <View style={styles.container}>
        {envConfig.appProfile === "e2e-test" ? (
          <Pressable testID="logo" onPress={openE2EModal}>
            <Image source={logo} style={{ width: 100, height: 100 }} />
          </Pressable>
        ) : (
          <Image source={logo} style={{ width: 100, height: 100 }} />
        )}
        <Text>Login Screen</Text>
        <Button
          onPress={() => navigation.navigate("BankIDAuth")}
          title="Login with BankID"
        ></Button>
      </View>
      <E2ETestingModal
        visible={showE2ETestingModal}
        onClose={() => setShowE2ETestingModal(false)}
      />
    </>
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
