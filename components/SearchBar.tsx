import React, { forwardRef } from "react";
import { 
  View, 
  TextInput, 
  StyleSheet, 
  ViewProps, 
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";

const SearchBar = forwardRef<View, ViewProps>((props, ref) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container} ref={ref} {...props}>
        <TextInput
          style={styles.input}
          placeholder="Search..."
          placeholderTextColor="#A8A8A8"
          textAlign="left"
        />
      </View>
    </TouchableWithoutFeedback>
  );
});

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    width: 300,
    alignSelf: 'center',
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 10,
    padding: 15,
    color: "white",
    fontSize: 16,
    fontFamily: "Montserrat-Bold",
    marginBottom: 30,
  },
});