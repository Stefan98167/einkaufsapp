import { useRouter, useGlobalSearchParams } from 'expo-router';
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { StyleSheet, View, TouchableOpacity, Text, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import ProductImage from "../components/ProductImage";
import Product_Information from "../components/Product_Information";
import { databases, account } from './appwrite.config'; // Import databases and account
import { ID } from 'react-native-appwrite'; // Import ID

export default function DetailsScreen() {
  const router = useRouter();
  const { barcode } = useGlobalSearchParams();
  const [productData, setProductData] = useState<{ product: { product_name: string; ingredients_text: string; quantity: string; image_url: string; nutriments: { energy_value: number; carbohydrates_value: number; fat_value: number; fiber_value: number; proteins_value: number; salt_value: number; sugars_value: number; "saturated-fat_value": number; sodium_value: number; } } } | null>(null);

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
        console.log(response.data.product.image_url);
      })
      .catch(error => {
        console.error(`Error: ${error.message}`);
      });
  }, [barcode]);

  const handleAddItem = async () => {
    if (!productData) return;

    try {
      // 1. Get the current user's ID
      const user = await account.get();
      const userId = user.$id;

      // 2. Create a new document in the "items" collection
      await databases.createDocument(
        "einkaufsapp", // Database ID
        "items", // Collection ID
        ID.unique(), // Document ID (unique)
        {
          name: productData.product.product_name,
          quantity: 1, // Initial count
          barcode: barcode,
          userId: userId,
        }
      );

      // 3. Navigate back to the home screen
      router.back();
    } catch (error) {
      console.error("Error adding item to database:", error);
      // Handle the error (e.g., show an alert to the user)
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
              <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
            <ProductImage productData={productData} />
            <Product_Information productData={productData} />
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
    backgroundColor: "#4B2F7B",
    padding: 10,
    borderRadius: 25,
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
});
