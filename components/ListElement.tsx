import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import CountItemHome from "./CountItemHome";
import { Client, Databases, Query, Account } from "appwrite";

interface ListItem {
  $id: string;    // Appwrite Dokument-ID
  name: string;
  quantity: number;
  barcode: string;
  userId: string;
}

const ListElement = () => {
  const [data, setData] = useState<ListItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<string | null>(null); // State für die User-ID

  useEffect(() => {
    // Appwrite Client initialisieren
    const client = new Client();
    client
      .setEndpoint("https://cloud.appwrite.io/v1") // Appwrite Endpoint
      .setProject("6787a1f8002b46b56168"); // Projekt-ID

    const account = new Account(client);
    const databases = new Databases(client);

    // Funktion zum Abrufen der User-ID
    const getUserId = async () => {
      try {
        const user = await account.get();
        setUserId(user.$id); // User-ID setzen
        console.log("User-ID:", user.$id);
        return user.$id;
      } catch (error) {
        console.error("Fehler beim Abrufen der User-ID:", error);
        setLoading(false);
        return null; // oder eine andere Fehlerbehandlung
      }
    };

    // Rufe die User-ID ab und lade die Liste
    const loadList = async () => {
      const currentUserId = await getUserId();
      if (currentUserId) {
        databases
          .listDocuments("einkaufsapp", "items", [
            Query.equal("userId", currentUserId),
          ])
          .then((response) => {
            console.log("Liste geladen:", response.documents);
            const listItems = response.documents.map((doc: any) => ({
              $id: doc.$id,
              name: doc.name,
              quantity: doc.quantity,
              barcode: doc.barcode,
              userId: doc.userId,
            }));
            setData(listItems);
            setLoading(false);
          })
          .catch((error) => {
            console.error("Fehler beim Laden der Liste:", error);
            setLoading(false);
          });
      }
    };

    loadList();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Lädt...</Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: ListItem }) => (
    <View style={styles.listContainer}>
      <Link
        href={{
          pathname: "/DetailsScreen",
          params: { name: item.name, quantity: item.quantity, barcode: item.barcode },
        }}
        asChild
      >
        <Pressable style={styles.listItemContainer}>
          <LinearGradient
            colors={["#CDC1CE", "#D1A5FE"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.listItem}
          >
            <Text style={styles.itemText}>{item.name}</Text>
          </LinearGradient>
        </Pressable>
      </Link>

      <LinearGradient
        colors={["#D1A5FE", "#BC8BCE"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.countItem}
      >
        <CountItemHome quantity={item.quantity} documentId={item.$id} />
      </LinearGradient>
    </View>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.$id}
      contentContainerStyle={styles.flatListContent}
    />
  );
};

const styles = StyleSheet.create({
  flatListContent: {
    paddingVertical: 0,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "95%",          // feste Breite für alle Elemente
    alignSelf: "center",
    marginBottom: 15,
    justifyContent: "space-between",
  },
  listItemContainer: {
    flex: 1,
    marginRight: 10,       // Abstand zwischen Listelement und Count-Item
  },
  listItem: {
    height: 60,
    borderRadius: 10,
    justifyContent: "center",
    paddingHorizontal: 20, // etwas horizontaler Padding für den Text
  },
  countItem: {
    width: 60,             // Count-Item quadratisch
    height: 60,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  itemText: {
    fontSize: 18,
    fontWeight: "800",
    color: "#000",
  },
});

export default ListElement;
