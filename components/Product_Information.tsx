import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Count_Item from "./Count_Item";
import { useLocalSearchParams } from "expo-router";

export default function Product_Information() {
    const { name } = useLocalSearchParams();

    return (
        <View style={styles.InformationContainer}>
            <Text style={styles.text}> {name}</Text>
            <Count_Item />
        </View>
    );
}

const styles = StyleSheet.create({
    InformationContainer: {
        position: 'absolute', 
        flexDirection: 'column',
        bottom: 0, 
        width: '100%', 
        height: '65%', 
        backgroundColor: '#000000', 
        borderTopLeftRadius: 30, 
        borderTopRightRadius: 30,
    },
    text: {
        color: '#FFFFFF',
        textAlign: 'left',
        marginTop: 40,
        marginLeft: 30,
        fontSize: 30,
        fontWeight: 'bold',
    },
});
