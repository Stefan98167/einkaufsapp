import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import Count_Item from "./Count_Item";
import { useLocalSearchParams } from "expo-router";
import NutritionalTable from "../components/NutritionalTable";

interface ProductData {
  product: {
    product_name: string;
    ingredients_text: string;
    quantity: string;
    image_url: string;
    nutriments: {
      "energy_value": number;
      carbohydrates_value: number;
      fat_value: number;
      fiber_value: number;
      proteins_value: number;
      salt_value: number;
      "saturated-fat_value": number;
      sodium_value: number;
      sugars_value: number;
    };
  };
}

export default function Product_Information({ productData }: { productData: ProductData }) {
  const productName = productData.product.product_name;
  const ingredients = productData.product.ingredients_text;
  const productSize = productData.product.quantity;
  const imageUrl = productData.product.image_url;


  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.productName}>{productName}</Text>
        <Count_Item />
      </View>
      <Text style={styles.productSize}>{productSize}</Text>
      <Text style={styles.ingredients}>{ingredients}</Text>

      <View style={styles.nutriScoreContainer}>
        <NutritionalTable productData={productData}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "#000",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: "flex-start",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  productName: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "Montserrat-Bold",
    marginLeft: 10,
  },
  productSize: {
    color: "#FFFFFF",
    fontSize: 18,
    marginTop: 0,
    fontFamily: "Montserrat-Bold",
    marginLeft: 30,
    
  },
  ingredients: {
    color: "#FFFFFF",
    fontSize: 18,
    marginTop: 10,
    fontFamily: "Montserrat-Bold",
    marginLeft: 30,
  },
  nutriScoreContainer: {
    marginTop: 15,
    alignItems: "center",
    width: "100%",
  },

});
