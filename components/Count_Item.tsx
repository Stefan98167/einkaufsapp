import React, { useState } from "react";
import { StyleSheet, View, Text, Modal, TouchableOpacity, Platform } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useLocalSearchParams } from "expo-router";

export default function Count_Item() {
  const { count } = useLocalSearchParams();
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState(count || "1");

  const items = Array.from({ length: 100 }, (_, i) => `${i + 1}`);

  return (
    <View>
      {/* Count Item */}
      <TouchableOpacity
        onPress={() => setPickerVisible(true)}
        style={styles.countContainer}
      >
        <Text style={styles.countText}>{selectedValue}</Text>
      </TouchableOpacity>

      {/* Modal for Picker */}
      <Modal
        transparent={true}
        visible={isPickerVisible}
        animationType="fade"
        onRequestClose={() => setPickerVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedValue}
              onValueChange={(itemValue) => setSelectedValue(itemValue)}
              style={styles.picker}
              itemStyle={styles.pickerItem} // Globales Styling für Picker-Items
            >
              {items.map((item, index) => (
                <Picker.Item
                  key={index}
                  label={item}
                  value={item}
                />
              ))}
            </Picker>
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
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.9)", 
  },
  pickerWrapper: {
    backgroundColor: "rgba(0, 0, 0, 0.0)", 
    width: "80%",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  picker: {
    width: "100%",
    height: Platform.OS === "ios" ? 200 : 50, 
  },
  pickerItem: {
    color: "#FFFFFF",
    fontSize: 40, // Größere Schrift
    fontWeight: "bold", // Fette Schrift
    textAlign: "center",
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    borderRadius: 8,
  },
  closeButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
