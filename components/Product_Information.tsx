import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Count_Item from "./Count_Item";
import { useLocalSearchParams } from "expo-router";
import  NutritionalTable  from "../components/NutritionalTable";


export default function Product_Information() {
    const { name, size } = useLocalSearchParams();

    return (
        <View>
            <View style={styles.InformationContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>{name}</Text>
                </View>
                <Count_Item />
            </View>
            <View style={styles.information}>
                <Text style={styles.subText}>{size}</Text>
                <NutritionalTable />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    InformationContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: "5%", 
        bottom: 0, 
        width: '100%', 
        height: '20%', 
        backgroundColor: '#000000', 
        borderTopLeftRadius: 30, 
        borderTopRightRadius: 30,
    },

    textContainer: {
        flexDirection: "column",
        justifyContent: "center",
    },
    text: {
        color: '#FFFFFF',
        textAlign: 'left',
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'Montseratt-Bold',
        marginTop: 20,
    },
    information: {
        backgroundColor: '#000000',
    },
    
    subText: {
        color: '#FFFFFF', 
        fontSize: 16,
        fontFamily: 'Montseratt-Bold',

    },
});
