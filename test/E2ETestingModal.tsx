import { Modal, View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { envConfig } from "../env";

export const E2ETestingModal = ({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) => {
  if (envConfig.appProfile !== "e2e-test") {
    return null;
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>E2E Testing Controls</Text>
            <TouchableOpacity
              onPress={onClose}
              style={styles.closeButton}
              testID="close-e2e-modal"
            >
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            <TouchableOpacity
              onPress={resetBackend}
              testID="reset-backend"
              style={styles.button}
            >
              <Text style={styles.buttonText}>Reset Backend</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={setNewUser}
              testID="set-new-user"
              style={styles.button}
            >
              <Text style={styles.buttonText}>Set New User</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={setPhoneUnverified}
              testID="set-phone-unverified"
              style={styles.button}
            >
              <Text style={styles.buttonText}>Set Phone Unverified</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const resetBackend = () => {
  fetch("http://localhost:4000/e2e-testing/reset");
};

const setNewUser = () => {
  fetch("http://localhost:4000/e2e-testing/new-user");
};

const setPhoneUnverified = () => {
  fetch("http://localhost:4000/e2e-testing/set-phone-unverified");
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 12,
    width: "100%",
    maxWidth: 400,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  closeButton: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    backgroundColor: "#f0f0f0",
  },
  closeButtonText: {
    fontSize: 28,
    color: "#666",
    lineHeight: 28,
  },
  content: {
    padding: 20,
  },
  button: {
    backgroundColor: "#154d88",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
