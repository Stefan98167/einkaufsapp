import React from "react";
import { StyleSheet, View, Image } from "react-native";

interface ProductData {
  product: {
    image_url: string;
  };
}

export default function ProductImage({ productData }: { productData: ProductData }) {
  const imageUrl = productData.product.image_url;

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: imageUrl }} 
        style={styles.image}
        resizeMode="contain"
      />
      {/* <Image source={{ uri: imageUrl }} style={{ width: 200, height: 200 }} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  image: {
    height: 200,
    width: 200,
    marginTop: "20%",
    marginBottom: "5%",
  },
});
