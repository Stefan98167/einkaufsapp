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
        width: 60,
        height: 60, 
        backgroundColor: 'transparent', 
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'white',
        justifyContent: 'center',
        marginLeft: 30,
    },
    countText: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
    },
});
