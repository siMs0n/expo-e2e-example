import { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { PhoneVerificationModal } from "./PhoneVerificationModal";

type PhoneVerificationPromptProps = {
  visible: boolean;
};

export function PhoneVerificationPrompt({
  visible,
}: PhoneVerificationPromptProps) {
  const [showVerificationModal, setShowVerificationModal] = useState(false);

  if (!visible) {
    return null;
  }

  return (
    <>
      <View style={styles.verificationPrompt}>
        <Text style={styles.verificationText}>
          Please verify your phone number
        </Text>
        <Button
          title="Verify Phone Number"
          onPress={() => setShowVerificationModal(true)}
        />
      </View>

      <PhoneVerificationModal
        visible={showVerificationModal}
        onClose={() => setShowVerificationModal(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
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
