import React from 'react';
import { View, StyleSheet } from 'react-native';
import AddButton from '../components/Add_Button';


const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <AddButton />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
});

export default HomeScreen;

