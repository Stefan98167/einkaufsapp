import React, { useState } from "react";
import { StyleSheet, View, Text, Modal, TouchableOpacity } from "react-native";
import WheelPickerExpo from "react-native-wheel-picker-expo"; 
import { useLocalSearchParams } from "expo-router";

export default function Count_Item() {
  const { count } = useLocalSearchParams();
  const [isPickerVisible, setPickerVisible] = useState(false);

  const items = Array.from({ length: 100 }, (_, i) => ({
    label: `${i + 1}`,
    value: i + 1,
  }));

  return (
    <View>
      {/* Count Item */}
      <TouchableOpacity
        onPress={() => setPickerVisible(true)}
        style={styles.countContainer}
      >
        <Text style={styles.countText}>{count}</Text>
      </TouchableOpacity>

      {/* Modal for WheelPicker */}
      <Modal
        transparent={true}
        visible={isPickerVisible}
        animationType="fade"
        onRequestClose={() => setPickerVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.pickerContainer}>
          <WheelPickerExpo
  items={items}
  onChange={(selected) => {
    console.log("Selected item:", selected);
  }}
  haptics={true}
  renderItem={({ label }) => (
    <Text style={styles.pickerItem}>{label}</Text>
  )}
/>



            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setPickerVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  countContainer: {
    width: 50,
    height: 50,
    backgroundColor: "transparent",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  countText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
  },
  picker: {
    backgroundColor: "transparent",
    width: 300,
    height: 200,
  },
  pickerItem: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
    backgroundColor: "rgba(0, 0, 0, 0.8)"

  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  pickerContainer: {
    backgroundColor: "transparent",
    borderRadius: 12,
    padding: 0,
    alignItems: "center",
    width: "80%",
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "transparent",
    padding: 10,
    borderRadius: 8,
  },
  closeButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Montserrat-Bold",
    fontWeight: "bold",
  },
});
