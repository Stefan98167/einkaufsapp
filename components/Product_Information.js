import React from "react";
import { StyleSheet, View, Text } from "react-native";

const ProductInformation = () => (
    <View style={styles.InformationContainer}>
        <Text style={styles.text}>Ländle Milch</Text>
    </View>
);

const styles = StyleSheet.create({
    InformationContainer: {
        position: 'absolute', 
        bottom: 0, 
        width: '100%', 
        height: '65%', 
        backgroundColor: '#000000', 
        borderTopLeftRadius: 30, 
        borderTopRightRadius: 30,
    },
    text: {
        color: '#FFFFFF',
        textAlign: 'center',
        marginTop: 10,
        fontSize: '30',
        fontWeight: 'bold',
    },
});

export default ProductInformation;
