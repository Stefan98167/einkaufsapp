import React, { useEffect, useState } from "react";
import axios from 'axios';
import { StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useGlobalSearchParams } from 'expo-router';
import ProductImage from "../components/ProductImage";
import Product_Information from "../components/Product_Information";

export default function DetailsScreen() {
  const { barcode } = useGlobalSearchParams();
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    axios
      .get(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`)
      .then(response => {
        setProductData(response.data);
        console.log(response.data.product.image_url);
      })
      .catch(error => {
        console.error(`Error: ${error.message}`);
      });
  }, [barcode]);

  return (
    <LinearGradient
      colors={["#171717", "#4B2F7B"]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1.5 }}
    >
      {productData && (
        <>
          <ProductImage productData={productData} />
          
          <Product_Information productData={productData} />
        </>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
});
