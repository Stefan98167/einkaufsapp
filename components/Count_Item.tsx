import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function Count_Item() {
    return (
        <View style={styles.countContainer}>
            <Text style={styles.countText}>7</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    countContainer: { 
        width: 50, 
        height: 50, 
        backgroundColor: 'transparent', 
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#FFFFFF', 
        justifyContent: 'center',
        alignItems: 'center', 
    },
    countText: {
        color: '#FFFFFF',
        fontSize: 22, 
        fontWeight: 'bold',
    },
});
