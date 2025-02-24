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
import { useCallback } from "react";
import { useNavigation } from "@react-navigation/native";


export default function HomeScreen() {
  const [loading, setLoading] = useState(true);
  // Mit einem extra State, der bei jedem Fokus geändert wird, erzwingen wir ein Re-Mount des ListElement
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  useFocusEffect(
    useCallback(() => {
      // Jedes Mal, wenn der Screen den Fokus erhält, erhöhen wir den Key
      setRefreshKey(prev => prev + 1);
    }, [])
  );

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
        <View style={{ marginVertical: 60, marginBottom: 30 }}>
          <Link push href="/CameraScreen" asChild>
            <AddButton />
          </Link>
        </View>
        {/* Durch Ändern des Keys wird ListElement neu gemountet und lädt damit aktuelle Daten */}
        <ListElement key={refreshKey} />
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


// A reasonable implementation of useFocusEffect that
// listens for the screen gaining focus.
function useFocusEffect(effect: () => (() => void) | void) {
  const navigation = useNavigation();

  // Memoize the callback so effect doesn't run unnecessarily.
  const callback = useCallback(() => {
    const cleanup = effect();
    return cleanup;
  }, [effect]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", callback);
    return () => {
      unsubscribe();
    };
  }, [navigation, callback]);
}

