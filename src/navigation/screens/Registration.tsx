import {
  Button,
  Text,
  TextInput,
  View,
  StyleSheet,
  Pressable,
} from "react-native";
import { useState } from "react";
import Checkbox from "expo-checkbox";
import { useMutation } from "@tanstack/react-query";
import { createUserAccount } from "../../api/user-api";
import { useNavigation } from "@react-navigation/native";

export function Registration() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [validationError, setValidationError] = useState("");
  const navigation2 = useNavigation();

  const mutation = useMutation({
    mutationFn: createUserAccount,
  });

  const handleRegister = () => {
    if (!isValid) {
      setValidationError(
        "Please fill in all required fields and accept the terms",
      );
      return;
    }

    setValidationError("");
    mutation.mutate(
      { phoneNumber, termsAccepted },
      {
        onSuccess: () => {
          navigation2.navigate("HomeTabs", { screen: "Home" });
        },
      },
    );
  };

  const isValid = phoneNumber.trim() !== "" && termsAccepted;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registration</Text>

      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        style={styles.input}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        placeholder="Enter your phone number"
        keyboardType="phone-pad"
        autoComplete="tel"
      />

      <Pressable
        style={styles.checkboxContainer}
        onPress={() => setTermsAccepted(!termsAccepted)}
      >
        <Checkbox
          value={termsAccepted}
          onValueChange={setTermsAccepted}
          color={termsAccepted ? "#4630EB" : undefined}
        />
        <Text style={styles.checkboxLabel}>
          I accept the terms and conditions
        </Text>
      </Pressable>

      {validationError && <Text style={styles.error}>{validationError}</Text>}
      {mutation.error && (
        <Text style={styles.error}>Registration failed. Please try again.</Text>
      )}

      <Button title="Register" onPress={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 14,
  },
  error: {
    color: "red",
    fontSize: 14,
    marginBottom: 15,
    textAlign: "center",
  },
});
