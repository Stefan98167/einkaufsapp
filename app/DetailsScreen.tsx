import { useRouter, useGlobalSearchParams } from 'expo-router';
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { StyleSheet, View, TouchableOpacity, Text, ScrollView, TextInput } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import ProductImage from "../components/ProductImage";
import Product_Information from "../components/Product_Information";
import { databases, account } from './appwrite.config';
import { ID, Query } from 'react-native-appwrite';

export default function DetailsScreen() {
  const router = useRouter();
  const { barcode } = useGlobalSearchParams();
  const [productData, setProductData] = useState<{
    product: {
      product_name: string;
      ingredients_text: string;
      quantity: string;
      image_url: string;
      nutriments: {
        energy_value: number;
        carbohydrates_value: number;
        fat_value: number;
        fiber_value: number;
        proteins_value: number;
        salt_value: number;
        sugars_value: number;
        "saturated-fat_value": number;
        sodium_value: number;
      }
    }
  } | null>(null);

  // Zustände für Existenz-Check, Dokument-ID und Menge
  const [exists, setExists] = useState(false);
  const [documentId, setDocumentId] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    axios
      .get(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`)
      .then(response => {
        setProductData({
          product: {
            product_name: response.data.product.product_name,
            ingredients_text: response.data.product.ingredients_text || '',
            quantity: response.data.product.quantity || '',
            image_url: response.data.product.image_url,
            nutriments: {
              energy_value: response.data.product.nutriments.energy_value || 0,
              carbohydrates_value: response.data.product.nutriments.carbohydrates_value || 0,
              fat_value: response.data.product.nutriments.fat_value || 0,
              fiber_value: response.data.product.nutriments.fiber_value || 0,
              proteins_value: response.data.product.nutriments.proteins_value || 0,
              salt_value: response.data.product.nutriments.salt_value || 0,
              sugars_value: response.data.product.nutriments.sugars_value || 0,
              "saturated-fat_value": response.data.product.nutriments["saturated-fat_value"] || 0,
              sodium_value: response.data.product.nutriments.sodium_value || 0,
            }
          }
        });
      })
      .catch(error => {
        console.error(`Error: ${error.message}`);
      });
  }, [barcode]);

  // Prüfen, ob das Produkt bereits in der Datenbank existiert
  useEffect(() => {
    const checkIfItemExists = async () => {
      if (!barcode) return;
      try {
        const user = await account.get();
        const userId = user.$id;
        const response = await databases.listDocuments(
          "einkaufsapp",
          "items",
          [
            Query.equal("barcode", barcode),
            Query.equal("userId", userId)
          ]
        );
        if (response.documents.length > 0) {
          setExists(true);
          setDocumentId(response.documents[0].$id);
          // Vorhandene Menge aus der Datenbank übernehmen
          setQuantity(response.documents[0].quantity);
        } else {
          setExists(false);
          setDocumentId(null);
        }
      } catch (error) {
        console.error("Error checking item existence:", error);
      }
    };

    checkIfItemExists();
  }, [barcode]);

  const handleAddItem = async () => {
    if (!productData) return;

    try {
      const user = await account.get();
      const userId = user.$id;

      const response = await databases.createDocument(
        "einkaufsapp", // Datenbank-ID
        "items",       // Collection-ID
        ID.unique(),   // Einzigartige Dokument-ID
        {
          name: productData.product.product_name,
          quantity: quantity,
          barcode: barcode,
          userId: userId,
        }
      );

      // Setze Status nach dem Hinzufügen
      setExists(true);
      setDocumentId(response.$id);
      // Navigiere zur Index-Seite (die dann die aktualisierte Menge lädt)
      router.replace('/');
    } catch (error) {
      console.error("Error adding item to database:", error);
    }
  };

  const handleDeleteItem = async () => {
    if (!documentId) return;

    try {
      await databases.deleteDocument("einkaufsapp", "items", documentId);
      setExists(false);
      setDocumentId(null);
      router.replace('/');
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleUpdateQuantity = async () => {
    if (!documentId) return;

    try {
      await databases.updateDocument("einkaufsapp", "items", documentId, {
        quantity: quantity,
      });
      // Nach dem Update navigieren wir zurück zur Index-Seite
      router.replace('/');
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  return (
    <LinearGradient
      colors={["#171717", "#4B2F7B"]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1.5 }}
    >
      <ScrollView>
        {productData && (
          <>
            <View style={styles.topBar}>
              <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <Text style={styles.backButtonText}>{'‹'}</Text>
              </TouchableOpacity>
              {exists ? (
                <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteItem}>
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
                  <Text style={styles.addButtonText}>Add</Text>
                </TouchableOpacity>
              )}
            </View>
            <ProductImage productData={productData} />
            <Product_Information productData={productData} />
            {exists && (
              <View style={styles.quantityContainer}>
                <Text style={styles.quantityLabel}>Quantity:</Text>
                <TextInput
                  style={styles.quantityInput}
                  value={String(quantity)}
                  keyboardType="numeric"
                  onChangeText={(text) => setQuantity(parseInt(text) || 0)}
                />
                <TouchableOpacity style={styles.updateButton} onPress={handleUpdateQuantity}>
                  <Text style={styles.updateButtonText}>Update</Text>
                </TouchableOpacity>
              </View>
            )}
          </>
        )}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 32,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  backButton: {
    backgroundColor: "transparent",
    padding: 10,
    borderRadius: 25,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  backButtonText: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  addButtonText: {
    color: "#4B2F7B",
    fontSize: 16,
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "#FF4C4C",
    paddingHorizontal: 20,
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  deleteButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginVertical: 20,
  },
  quantityLabel: {
    color: "#FFFFFF",
    fontSize: 16,
    marginRight: 10,
  },
  quantityInput: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: 60,
    textAlign: "center",
    marginRight: 10,
  },
  updateButton: {
    backgroundColor: "#4B2F7B",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  updateButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
