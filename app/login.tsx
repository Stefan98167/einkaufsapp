import { StyleSheet, View, TextInput, TouchableOpacity, Text, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { ThemedText } from "@/components/ThemedText";
import { account } from "./appwrite.config";
import { router } from "expo-router";
import { ID } from "react-native-appwrite";
import { makeRedirectUri } from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { OAuthProvider } from "appwrite";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // E-Mail/Passwort-Login
  const handleLogin = async () => {
    try {
      setLoading(true);
      await account.createEmailPasswordSession(email, password);
      router.replace("/");
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  // Registrierung
  const handleRegister = async () => {
    try {
      setLoading(true);
      const userId = ID.unique();
      await account.create(userId, email, password, "User");
      console.log("User registriert:", userId);
      await handleLogin();
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setLoading(false);
    }
  };

  // Google OAuth2 Login
  const handleGoogleLogin = async () => {
    try {
      // Erzeuge einen dynamischen Redirect URI, der in allen Expo-Umgebungen funktioniert.
      const deepLink = new URL(makeRedirectUri({ preferLocalhost: true }) || "");
      if (!deepLink.hostname) {
        deepLink.hostname = "localhost";
      }
      const scheme = `${deepLink.protocol}//`; // z.B. "exp://" oder "yourapp://"

      // Erstelle die OAuth2 URL über AppWrite (Provider "google")
      const loginUrl = await account.createOAuth2Token(
        OAuthProvider.Google, // Provider
        deepLink.toString(),  // Erfolgreicher Redirect URI
        deepLink.toString()   // Fehler-Redirect URI (kann gleich sein)
      );

      // Starte den OAuth Flow im Browser und lausche auf den Redirect
      const result = await WebBrowser.openAuthSessionAsync(String(loginUrl), scheme);

      if (result.type === "success" && result.url) {
        const url = new URL(result.url);
        const secret = url.searchParams.get("secret");
        const userId = url.searchParams.get("userId");

        if (userId && secret) {
          // Erstelle die Session mit den erhaltenen OAuth-Daten
          await account.createSession(userId, secret);
          router.replace("/");
          console.log("Google Login erfolgreich");
        } else {
          throw new Error("Fehlende OAuth-Credentials in der Redirect URL");
        }
      } else {
        throw new Error("Authentifizierung abgebrochen oder fehlgeschlagen");
      }
    } catch (error) {
      console.error("Fehler beim Google OAuth Login:", error);
    }
  };

  return (
    <LinearGradient
      colors={["#171717", "#4B2F7B"]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1.5 }}
    >
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {/* Login-Button */}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <ThemedText>Login</ThemedText>
        </TouchableOpacity>

        {/* Google-Button als Bild */}
        <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
          <Image
            source={require("../assets/images/image-Photoroom.png")} // Pfad anpassen!
            style={styles.googleButtonImage}
          />
        </TouchableOpacity>

        <Text style={{ textAlign: "center", color: "white", marginTop: 10 }}>
          Don’t have an account?{" "}
          <Text style={{ color: "violet" }} onPress={() => router.push("/register")}>
            Register
          </Text>
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
  },
  formContainer: {
    width: "80%",
    marginTop: 100,
  },
  input: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    width: "100%",
  },
  button: {
    backgroundColor: "#4B2F7B",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: "center",
  },
  googleButton: {
    // Du kannst hier gerne noch Layout- oder Positionierungs-Styles angeben.
    alignItems: "center",
    marginBottom: 10,
  },
  googleButtonImage: {
    width: 800,         // Passe Breite an
    height: 90,         // Passe Höhe an
    resizeMode: "contain",
  },
});
