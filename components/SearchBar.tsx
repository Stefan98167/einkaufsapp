import React, { useState, useEffect, forwardRef } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  ViewProps,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

interface SearchBarProps extends ViewProps {
  onSearchChange: (term: string) => void;
}

const SearchBar = forwardRef<View, SearchBarProps>((props, ref) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (text: string) => {
    setSearchTerm(text);
    props.onSearchChange(text);
  };

 

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container} ref={ref} {...props}>
        <TextInput
          style={styles.input}
          placeholder="Search..."
          placeholderTextColor="#A8A8A8"
          textAlign="left"
          value={searchTerm}
          onChangeText={handleSearchChange}
        />
      </View>
    </TouchableWithoutFeedback>
  );
});

const styles = StyleSheet.create({
  container: {
    width: "90%",
    alignSelf: "center",
    marginVertical: 10,
    backgroundColor: "#F0F0F0",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, 
  },
  input: {
    backgroundColor: "#404040",
    color: "#F0F0F0",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    fontWeight: "600",
    width: 350,
  },
});

export default SearchBar;
