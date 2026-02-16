import { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import {
  useRequestPhoneVerification,
  useVerifyPhoneCode,
} from "../api/usePhoneVerification";

type PhoneVerificationModalProps = {
  visible: boolean;
  onClose: () => void;
};

export function PhoneVerificationModal({
  visible,
  onClose,
}: PhoneVerificationModalProps) {
  const [step, setStep] = useState<"initial" | "otp" | "success">("initial");
  const [otpCode, setOtpCode] = useState("");

  const requestMutation = useRequestPhoneVerification();
  const verifyMutation = useVerifyPhoneCode();

  const handleSendOTP = async () => {
    try {
      await requestMutation.mutateAsync();
      setStep("otp");
    } catch (error) {
      Alert.alert("Error", "Failed to send verification code");
    }
  };

  const handleVerifyOTP = async () => {
    if (otpCode.length !== 6) {
      Alert.alert("Error", "Please enter a 6-digit code");
      return;
    }

    try {
      await verifyMutation.mutateAsync(otpCode);
      setStep("success");
      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch (error) {
      Alert.alert("Error", "Invalid verification code");
    }
  };

  const handleClose = () => {
    setStep("initial");
    setOtpCode("");
    requestMutation.reset();
    verifyMutation.reset();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {step === "initial" && (
            <>
              <Text style={styles.title}>Verify Phone Number</Text>
              <Text style={styles.message}>
                We'll send you an SMS with a verification code to confirm your
                phone number.
              </Text>
              {requestMutation.isPending ? (
                <ActivityIndicator size="large" />
              ) : (
                <View style={styles.buttonContainer}>
                  <Button title="Send Code" onPress={handleSendOTP} />
                  <Button title="Cancel" onPress={handleClose} color="gray" />
                </View>
              )}
            </>
          )}

          {step === "otp" && (
            <>
              <Text style={styles.title}>Enter Verification Code</Text>
              <Text style={styles.message}>
                Enter the 6-digit code sent to your phone
              </Text>
              <TextInput
                style={styles.input}
                value={otpCode}
                onChangeText={setOtpCode}
                keyboardType="number-pad"
                maxLength={6}
                placeholder="000000"
                testID="otp-input"
              />
              {verifyMutation.isPending ? (
                <ActivityIndicator size="large" />
              ) : (
                <View style={styles.buttonContainer}>
                  <Button title="Verify" onPress={handleVerifyOTP} />
                  <Button title="Cancel" onPress={handleClose} color="gray" />
                </View>
              )}
            </>
          )}

          {step === "success" && (
            <>
              <Text style={styles.title}>✓ Success!</Text>
              <Text style={styles.message}>
                Your phone number has been verified successfully.
              </Text>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    maxWidth: 400,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
    color: "#666",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 12,
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
    letterSpacing: 8,
  },
  buttonContainer: {
    gap: 10,
  },
});
