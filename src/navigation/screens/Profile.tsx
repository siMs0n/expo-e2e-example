import { Text } from "@react-navigation/elements";
import { StyleSheet, View, TextInput, Button, Alert } from "react-native";
import { useState } from "react";
import { useUser } from "../../api/useUser";
import { PhoneVerificationPrompt } from "../../components/PhoneVerificationPrompt";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserAccount } from "../../api/user-api";

export function Profile() {
  const { data, isLoading } = useUser();
  const [phoneNumber, setPhoneNumber] = useState(data?.phoneNumber || "");
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: (phoneNumber: string) => updateUserAccount({ phoneNumber }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["account"] });
      Alert.alert("Success", "Phone number updated successfully");
    },
    onError: () => {
      Alert.alert("Error", "Failed to update phone number");
    },
  });

  // Update local state when data loads
  useState(() => {
    if (data?.phoneNumber) {
      setPhoneNumber(data.phoneNumber);
    }
  });

  const handleSave = () => {
    if (!phoneNumber.trim()) {
      Alert.alert("Error", "Please enter a phone number");
      return;
    }
    updateMutation.mutate(phoneNumber);
  };

  return (
    <View style={styles.container}>
      {isLoading && <Text>Loading...</Text>}

      {data && (
        <>
          <View style={styles.field}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholder="Enter phone number"
              keyboardType="phone-pad"
              testID="phone-input"
            />
          </View>

          <PhoneVerificationPrompt visible={!data.phoneNumberVerified} />

          <Button
            title={updateMutation.isPending ? "Saving..." : "Save"}
            onPress={handleSave}
            disabled={updateMutation.isPending}
            testID="save-button"
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 10,
  },
  field: {
    gap: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 12,
    fontSize: 16,
  },
});
