import React from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const List_Element = () => {
  const data = [
    { id: '1', name: 'Ländle Milch', count: 7 },
    { id: '2', name: 'Coca-Cola', count: 2 },
    { id: '3', name: 'Barilla Spaghetti', count: 1 },
    { id: '4', name: 'Wiener Schnitzel', count: 2 },
    { id: '5', name: 'Ländle Kartoffel', count: 3 },
    { id: '6', name: 'Vöslauer Limo', count: 8 },
    { id: '7', name: 'Schiwasser VO ÜS', count: 3 },
    { id: '8', name: 'Mohren Spezial', count: 24 },
    { id: '9', name: 'Egger Wälderle', count: 6 },
    { id: '10', name: 'Wälder Keks', count: 4 },
    { id: '11', name: 'Mohren Spezial', count: 24 },
    { id: '12', name: 'Egger Wälderle', count: 6 },
    { id: '13', name: 'Wälder Keks', count: 4 },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.listContainer}>
      <LinearGradient
        colors={['#CDC1CE', '#D1A5FE']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.listItem}
      >
        <Text style={styles.itemText}>{item.name}</Text>
      </LinearGradient>
      <LinearGradient
        colors={['#D1A5FE', '#BC8BCE']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.countItem}
      >
        <Text style={styles.countText}>{item.count}</Text>
      </LinearGradient>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatListContent}
        scrollEnabled={false} // Disable FlatList scrolling to use ScrollView's scrolling
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  listContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '5%',
    marginVertical: '2%',
    width: '90%',

  },
  listItem: {
    flex: 5,
    height: 60,
    width: '100%',
    borderRadius: '4%',
    justifyContent: 'center',
  },
  countItem: {
    flex: 1,
    width: 100,
    height: 60,
    borderRadius: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '5%',
  },
  itemText: {
    fontSize: 18,
    fontFamily: 'Montserat-Bold',
    fontWeight: '800',
    color: '#000',
    padding: '5%',
  },
  countText: {
    fontSize: 18,
    fontFamily: 'Montserat-Bold',
    fontWeight: '800',
    color: '#000',
    padding: '5%',
  },
  flatListContent: {
    paddingBottom: 30,
  },

});

export default List_Element;
