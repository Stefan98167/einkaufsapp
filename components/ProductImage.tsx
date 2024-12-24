import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { BlurView } from "expo-blur";

interface ProductData {
  product: {
    image_url: string;
  };
}

export default function ProductImage({ productData }: { productData: ProductData }) {
  const imageUrl = productData.product.image_url;

  return (
    <View style={styles.container}>
      {/* Blurred Background */}
      <BlurView experimentalBlurMethod="dimezisBlurView" intensity={100} style={styles.blurContainer}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.fullBackgroundImage}
          resizeMode="cover"
        />
        {/* Dark Overlay */}
        <View style={styles.overlay} />
      </BlurView>

      {/* Foreground Image */}
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "black",
    marginTop: "20%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: "hidden", // Ensures blur and overlay respect container boundaries
  },
  blurContainer: {
    ...StyleSheet.absoluteFillObject, // Covers the entire container
  },
  fullBackgroundImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // Darkens the entire background
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Semi-transparent black
  },
  image: {
    height: 250,
    width: 250,
    zIndex: 1, // Ensures foreground image is above the blur and overlay
  },
});
