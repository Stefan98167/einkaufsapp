import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function Count_Item() {
    const { count } = useLocalSearchParams();
    return (
        <View style={styles.countContainer}>
            <Text style={styles.countText}>{ count }</Text>
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
