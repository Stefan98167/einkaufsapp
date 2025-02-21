import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Modal, TouchableOpacity, Platform } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useLocalSearchParams } from "expo-router";
import { Client, Databases, Query } from "appwrite";

export default function Count_Item() {
  const { barcode } = useLocalSearchParams();
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState("1");
  const [documentId, setDocumentId] = useState<string>("");

  const items = Array.from({ length: 100 }, (_, i) => `${i + 1}`);

  const client = new Client();
  client
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("6787a1f8002b46b56168");

  const databases = new Databases(client);

  // Fetch current quantity from database when component mounts
  useEffect(() => {
    const fetchQuantity = async () => {
      try {
        const response = await databases.listDocuments(
          "einkaufsapp",
          "items",
          [Query.equal("barcode", barcode)]
        );
        
        if (response.documents.length > 0) {
          setSelectedValue(response.documents[0].quantity.toString());
          setDocumentId(response.documents[0].$id);
        }
      } catch (error) {
        console.error("Error fetching quantity:", error);
      }
    };

    fetchQuantity();
  }, [barcode]);

  const updateQuantity = async (newValue: string) => {
    try {
      await databases.updateDocument(
        "einkaufsapp",
        "items",
        documentId,
        {
          quantity: parseInt(newValue),
        }
      );
      console.log("Quantity updated in database");
    } catch (error) {
      console.error("Error updating quantity in database:", error);
    }
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => setPickerVisible(true)}
        style={styles.countContainer}
      >
        <Text style={styles.countText}>{selectedValue}</Text>
      </TouchableOpacity>

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
              onValueChange={(itemValue) => {
                setSelectedValue(itemValue);
                updateQuantity(itemValue);
              }}
              style={styles.picker}
              itemStyle={styles.pickerItem}
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
    fontSize: 30,
    fontWeight: "bold",
  },
});
