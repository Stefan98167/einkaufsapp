import React from "react";
import { StyleSheet, View, Image } from "react-native";

const ProductImage = () => (
    <View style={styles.container}>
        <Image
            source={require('../assets/Laendle-Vollmilch.png')} 
            style={styles.image}
            resizeMode="contain" // Ensures the image is fully visible
        />
    </View>
);

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    image: {
        height: '45%',
    },
});

export default ProductImage;
