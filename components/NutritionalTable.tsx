import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function NutritionalTable() {
  return (
    <View style={styles.tableContainer}>
      <View style={styles.contentContainer}>
        <View style={styles.leftColumn}>
          <Text style={styles.leftText}>Brennwert</Text>
          <Text style={styles.leftText}>Fett</Text>
          <Text style={styles.leftSubText}>davon gesättigte Fettsäuren</Text>
          <Text style={styles.leftText}>Kohlenhydrate</Text>
          <Text style={styles.leftSubText}>davon Zucker</Text>
          <Text style={styles.leftText}>Eiweiß</Text>
          <Text style={styles.leftText}>Salz</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.rightColumn}>
          <Text style={styles.rightText}>64 kcal</Text>
          <Text style={styles.rightText}>3.5 g</Text>
          <Text style={styles.rightText}>2.7 g</Text>
          <Text style={styles.rightText}>4.7 g</Text>
          <Text style={styles.rightText}>4.7 g</Text>
          <Text style={styles.rightText}>3.3 g</Text>
          <Text style={styles.rightText}>0,17 g</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tableContainer: {
    backgroundColor: "transparent",
    borderRadius: 15,
    padding: 10,
    paddingHorizontal: 20,
    marginVertical: 20,
    width: "90%",
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#FFFFFF",
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "stretch",
  },
  leftColumn: {
    flex: 3,
    justifyContent: "space-around",
    marginRight: "30%",
  },
  rightColumn: {
    flex: 2,
    justifyContent: "space-around",
    alignItems: "flex-end",
  },
  separator: {
    width: 1,
    backgroundColor: "#FFFFFF",
  },
  leftText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  leftSubText: {
    color: "#FFFFFF",
    fontSize: 14,
    marginBottom: 5,
  },
  rightText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
