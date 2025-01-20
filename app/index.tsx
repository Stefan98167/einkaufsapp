import { Image, StyleSheet, Platform, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import  AddButton  from "@/components/AddButton";
import ListElement from "@/components/ListElement";
import { Link } from "expo-router";
import { Client, Account, ID } from 'react-native-appwrite';

const client = new Client()
    .setProject('6787a1f8002b46b56168')
    .setPlatform('com.project.einkaufsapp');


export default function HomeScreen() {
  return (
    <LinearGradient
      colors={["#171717", "#4B2F7B"]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1.5 }}
    >
      <View style={{ marginVertical: 60 }}>
        <Link push href="/CameraScreen" asChild>
          <AddButton />
        </Link>
      </View>
      <ListElement />
    </LinearGradient>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
  },
});
