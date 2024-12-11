import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";

interface ListItem {
  id: string;
  name: string;
  count: number;
  size: string;
  
}

const ListElement = () => {
  const data: ListItem[] = [
    { id: "1", name: "Ländle Milch", count: 7, size: "1000ml" },
    { id: "2", name: "Coca-Cola", count: 2, size: "500ml" },
    { id: "3", name: "Barilla Spaghetti", count: 1, size: "500g" },
    { id: "4", name: "Wiener Schnitzel", count: 2, size: "1000g" },
    { id: "5", name: "Ländle Kartoffel", count: 3, size: "1000g" },
    { id: "6", name: "Vöslauer Limo", count: 8, size: "500ml" },
    { id: "7", name: "Schiwasser VO ÜS", count: 3, size: "1000ml" },
    { id: "8", name: "Mohren Spezial", count: 24, size: "500ml" },
    { id: "9", name: "Egger Wälderle", count: 6, size: "330ml" },
    { id: "10", name: "Wälder Koks", count: 4, size: "500ml" },
  ];

  const renderItem = ({ item }: { item: ListItem }) => (
    
    <Link
      href={{
        pathname: "/DetailsScreen",
        params: { name: item.name, count: item.count, size: item.size },
        
      }}
    >
      <View style={styles.listContainer}>
        <LinearGradient
          colors={["#CDC1CE", "#D1A5FE"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.listItem}
        >
          <Text style={styles.itemText}>{item.name}</Text>
        </LinearGradient>
        <LinearGradient
          colors={["#D1A5FE", "#BC8BCE"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.countItem}
        >
          <Text style={styles.countText}>{item.count}</Text>
        </LinearGradient>
      </View>
    </Link>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.flatListContent}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center", 
    marginHorizontal: "5%",
    marginBottom: 15, 
    width: "100%",
  },
  listItem: {
    marginTop: 15,
    flex: 5,
    height: 60,
    borderRadius: 10,
    justifyContent: "center",
    marginLeft: 30,
  },
  countItem: {
    marginTop: 15,
    flex: 1,
    height: 60,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "5%",
    marginRight: 30,
  },
  itemText: {
    fontSize: 18,
    fontWeight: "800",
    color: "#000",
    paddingHorizontal: "5%",
  },
  countText: {
    fontSize: 18,
    fontWeight: "800",
    color: "#000",
  },
  flatListContent: {
    paddingVertical: 20, 
  },
});


export default ListElement;
