import { Button, Text } from "react-native";
import { StyleSheet, View } from "react-native";
import { HomeTabScreenProps } from "..";
import { useUser } from "../../api/useUser";
import { NotFoundError } from "../../api/user-api";
import { useEffect, useState } from "react";
import { PhoneVerificationModal } from "../../components/PhoneVerificationModal";

export function Home({ navigation }: HomeTabScreenProps<"Home">) {
  const { data, error, isLoading } = useUser();
  const [showVerificationModal, setShowVerificationModal] = useState(false);

  useEffect(() => {
    const isNotFound = error instanceof NotFoundError;

    if (isNotFound) {
      navigation.navigate("Registration");
    } else if (error) {
      console.error("Error fetching user account: ", error);
    }
  }, [error, navigation]);

  const needsVerification = data && !data.phoneNumberVerified;

  return (
    <View style={styles.container}>
      {isLoading && <Text>Loading...</Text>}
      {data && <Text>Hello {data.name}!</Text>}

      {needsVerification && (
        <View style={styles.verificationPrompt}>
          <Text style={styles.verificationText}>
            Please verify your phone number
          </Text>
          <Button
            title="Verify Phone Number"
            onPress={() => setShowVerificationModal(true)}
            testID="verify-phone-button"
          />
        </View>
      )}

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

      <PhoneVerificationModal
        visible={showVerificationModal}
        onClose={() => setShowVerificationModal(false)}
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
  verificationPrompt: {
    backgroundColor: "#fff3cd",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    gap: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ffc107",
  },
  verificationText: {
    fontSize: 16,
    color: "#856404",
    fontWeight: "500",
  },
});
