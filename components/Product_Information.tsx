import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import Count_Item from "./Count_Item";
import { useLocalSearchParams } from "expo-router";
import NutritionalTable from "../components/NutritionalTable";

export default function Product_Information() {
  const { name, size } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.productName}>{name}</Text>
        <Count_Item />
      </View>
      <Text style={styles.productSize}>{size}</Text>
      
      <View style={styles.nutriScoreContainer}>
      <NutritionalTable />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "#000",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: "flex-start",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  productName: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "Montserrat-Bold",
    marginLeft: 10,
  },
  productSize: {
    color: "#FFFFFF",
    fontSize: 18,
    marginTop: 0,
    fontFamily: "Montserrat-Bold",
    marginLeft: 30,
    
  },
  nutriScoreContainer: {
    marginTop: 15,
    alignItems: "center",
    width: "100%",
  },

});
