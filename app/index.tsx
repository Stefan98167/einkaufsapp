import { Image, StyleSheet, Platform, View, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState, useEffect } from "react";
import { ThemedText } from "@/components/ThemedText";
import AddButton from "@/components/AddButton";

import SearchBar from "@/components/SearchBar";
import ListElement from "@/components/ListElement";
import { Link, router } from "expo-router";
import { account } from './appwrite.config';
import { ID } from "react-native-appwrite";

export default function HomeScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      await account.get();
      setLoading(false);
    } catch (error) {
      console.log('Not authenticated:', error);
      router.replace('./login');
    }
  };

  const signout = async () => {
    setLoading(true);
    account.deleteSession('current');
    router.replace('./login');
    setLoading(false);
  };

  if (loading) {
    return null;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <LinearGradient
        colors={["#171717", "#4B2F7B"]}
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1.5 }}
      >
        <View style={{ marginVertical: 60, marginBottom: 30,
         }}>
          <Link push href="/CameraScreen" asChild>
            <AddButton />
          </Link>
        </View>
        <ListElement />
        <TouchableOpacity 
          style={styles.logoutButton} 
          onPress={signout}
        >
          <ThemedText style={styles.logoutText}>Logout</ThemedText>
        </TouchableOpacity>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
  },
  logoutButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
    marginTop: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  logoutText: {
    fontSize: 16,
    textAlign: 'center',
  }
});
