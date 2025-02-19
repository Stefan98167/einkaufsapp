import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import CountItemHome from "./CountItemHome";
import { Client, Databases, Query, Account } from "appwrite";
import SearchBar from "./SearchBar";

interface ListItem {
  $id: string;
  name: string;
  quantity: number;
  barcode: string;
  userId: string;
}

const ListElement = () => {
  const [allData, setAllData] = useState<ListItem[]>([]);
  const [data, setData] = useState<ListItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    if (term === "") {
      setData(allData);
    } else {
      setData(
        allData.filter((item) =>
          item.name.toLowerCase().includes(term.toLowerCase())
        )
      );
    }
  };

  useEffect(() => {
    const client = new Client();
    client
      .setEndpoint("https://cloud.appwrite.io/v1")
      .setProject("6787a1f8002b46b56168");

    const account = new Account(client);
    const databases = new Databases(client);

    const getUserId = async () => {
      try {
        const user = await account.get();
        setUserId(user.$id);
        return user.$id;
      } catch (error) {
        console.error("Fehler beim Abrufen der User-ID:", error);
        setLoading(false);
        return null;
      }
    };

    const loadList = async () => {
      const currentUserId = await getUserId();
      if (!currentUserId) return;
      
      databases
        .listDocuments("einkaufsapp", "items", [
          Query.equal("userId", currentUserId),
        ])
        .then((response) => {
          const listItems = response.documents.map((doc: any) => ({
            $id: doc.$id,
            name: doc.name,
            quantity: doc.quantity,
            barcode: doc.barcode,
            userId: doc.userId,
          }));
          setAllData(listItems);
          setData(listItems);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Fehler beim Laden der Liste:", error);
          setLoading(false);
        });
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

  return (
    <View style={styles.container}>
      <SearchBar onSearchChange={handleSearchChange} />

      <FlatList
        data={data}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {allData.length === 0 ? "Shopping List empty" : "Nothing found"}
            </Text>
          </View>
        )}
        renderItem={({ item }) => (
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
        )}
        keyExtractor={(item) => item.$id}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "none",
  },
  flatListContent: {
    paddingVertical: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "95%",
    alignSelf: "center",
    marginBottom: 15,
    justifyContent: "space-between",
  },
  listItemContainer: {
    flex: 1,
    marginRight: 10,
  },
  listItem: {
    height: 60,
    borderRadius: 10,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  countItem: {
    width: 60,
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
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#d6d6d6",
  },
});

export default ListElement;
