import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
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
    { id: '10', name: 'Wälder Koks', count: 4 },
  ];

  const renderItem = ({ item }) => (
    <LinearGradient
      colors={['#CDC1CE', '#D1A5FE']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.listItem}
    >
      <Text style={styles.itemText}>{item.name}</Text>
      <View style={styles.countContainer}>
        <Text style={styles.countText}>{item.count}</Text>
      </View>
    </LinearGradient>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 10,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  itemText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#FFF',
  },
  countContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: '700',
  },
});

export default List_Element;
