import { StyleSheet, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { useLocalSearchParams } from "expo-router";

export default function DetailsScreen() {
  const { name } = useLocalSearchParams();

  return (
    <LinearGradient
      colors={["#171717", "#4B2F7B"]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1.5 }}
    >
      <Text style={styles.text}>Details Screen</Text>
      <Text style={styles.text}>Name: {name}</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});
