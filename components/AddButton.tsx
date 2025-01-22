import React, { forwardRef } from "react";
import { TouchableOpacity, Text, StyleSheet, View, TouchableOpacityProps } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const AddButton = forwardRef<View, TouchableOpacityProps>((props, ref) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} ref={ref} {...props}>
      <LinearGradient colors={["#8B5FAD", "#574076"]} style={styles.button}>
        <Text>
          <Text style={styles.plusSign}>+</Text>
          <Text style={styles.buttonText}> Add New Item</Text>
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
});

export default AddButton;

const styles = StyleSheet.create({
  buttonContainer: {
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
    fontWeight: "bold",
  },
  plusSign: {
    color: "#291440",
    fontSize: 20,
    fontFamily: "Montserrat-Bold",
    fontWeight: "bold",
  },
});
