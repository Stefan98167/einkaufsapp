import React from "react";
import { StyleSheet, View, Image } from "react-native";

export default function ProductImage() {
    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/images/Laendle-Vollmilch.png')} 
                style={styles.image}
                resizeMode="contain" // Ensures the image is fully visible
            />
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
        height: 150,
        marginTop: "20%",
        marginBottom: "10%",
    },
});
