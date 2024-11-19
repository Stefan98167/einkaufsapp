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
    { id: '10', name: 'Wälder Keks', count: 4 },
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
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '-10%',
    marginHorizontal: '5%',
  },

  listItem: {
    flex: '1%',
    height: '75%',
    width: '80%',
    margin: '1%',
    borderRadius: '4%',
    justifyContent: 'center', 
  },
  countItem: {
    height: '75%',
    width: '15%',
    borderRadius: '20%',
    alignItems: 'center',
    justifyContent: 'center',
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
});

export default List_Element;
