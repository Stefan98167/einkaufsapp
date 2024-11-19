import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const AddButton = () => (
  <TouchableOpacity style={styles.buttonContainer}>
    <LinearGradient colors={["#8B5FAD", "#574076"]} style={styles.button}>
      <Text>
        <Text style={styles.plusSign}>+</Text>
        <Text style={styles.buttonText}> Add New Item</Text>
      </Text>
    </LinearGradient>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  buttonContainer: {
    marginHorizontal: 10,
    marginVertical: 70,
  },
  button: {
    padding: 30,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontFamily: "Montserrat-Bold",
  },
  plusSign: {
    color: "#291440",
    fontSize: 20,
    fontFamily: "Montserrat-Bold",
  },
});

export default AddButton;
