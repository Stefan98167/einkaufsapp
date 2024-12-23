import React from "react";
import { StyleSheet, View, Text } from "react-native";

interface ProductData {
  product: {
    nutriments: {
      "energy_value": number;
      carbohydrates_value: number;
      fat_value: number;
      fiber_value: number;
      proteins_value: number;
      salt_value: number;
      "saturated-fat_value": number;
      sodium_value: number;
      sugars_value: number;
    };
  };
}

export default function NutritionalTable({ productData }: { productData: ProductData }) {

  const Energy = productData.product.nutriments["energy_value"];
  const Carbonhydrates = productData.product.nutriments.carbohydrates_value;
  const Fat = productData.product.nutriments.fat_value;
  const Fiber = productData.product.nutriments.fiber_value;
  const Proteins = productData.product.nutriments.proteins_value;
  const Salt = productData.product.nutriments.salt_value;
  const Saturated_Fat = productData.product.nutriments["saturated-fat_value"];
  const Sodium = productData.product.nutriments.sodium_value;
  const Sugars = productData.product.nutriments.sugars_value;

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
          <Text style={styles.rightText}>{Energy}</Text>
          <Text style={styles.rightText}>{Fat} </Text>
          <Text style={styles.rightText}>{Saturated_Fat}</Text>
          <Text style={styles.rightText}>{Carbonhydrates}</Text>
          <Text style={styles.rightText}>{Sugars}</Text>
          <Text style={styles.rightText}>{Proteins}</Text>
          <Text style={styles.rightText}>{Salt}</Text>
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
