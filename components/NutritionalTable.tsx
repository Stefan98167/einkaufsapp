import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function NutritionalTable() {
    return (
        <View style={styles.tableContainer}>
            <View style={styles.row}>
                <Text style={styles.leftText}>Brennwert</Text>
                <Text style={styles.rightText}>64 kcal</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.leftText}>Fett</Text>
                <Text style={styles.rightText}>3.5 g</Text>
            </View>
            <View style={styles.subRow}>
                <Text style={styles.leftSubText}>davon gesättigte Fettsäuren</Text>
                <Text style={styles.rightText}>2.7 g</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.leftText}>Kohlenhydrate</Text>
                <Text style={styles.rightText}>4.7 g</Text>
            </View>
            <View style={styles.subRow}>
                <Text style={styles.leftSubText}>davon Zucker</Text>
                <Text style={styles.rightText}>4.7 g</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.leftText}>Eiweiß</Text>
                <Text style={styles.rightText}>3.3 g</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.leftText}>Salz</Text>
                <Text style={styles.rightText}>0,17 g</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    tableContainer: {
        backgroundColor: "transparent",
        borderRadius: 15,
        padding: 15,
        marginVertical: 20,
        width: "90%",
        alignSelf: "center",
        borderWidth: 1,
        borderColor: '#FFFFFF', 
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    subRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 5,
        marginLeft: 15, 
    },
    leftText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
    },
    leftSubText: {
        color: "#FFFFFF",
        fontSize: 14,
    },
    rightText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
        borderLeftWidth: 1,
    },
});
