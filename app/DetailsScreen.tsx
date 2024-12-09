import { StyleSheet, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import ProductImage from "../components/ProductImage";
import Product_Information from "../components/Product_Information";
import React from "react";



export default function DetailsScreen() {
  

  return (
    <LinearGradient
      colors={["#171717", "#4B2F7B"]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1.5 }}
    >
       <ProductImage />
       <Product_Information />

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});
