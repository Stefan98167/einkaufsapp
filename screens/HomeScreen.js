import React from 'react';
import { View, StyleSheet } from 'react-native';
import AddButton from '../components/Add_Button';
import List_Element from '../components/List_Element';
import { LinearGradient } from 'expo-linear-gradient';

const HomeScreen = () => {
    return (
        <LinearGradient
            colors={['#171717', '#4B2F7B']}
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1.5 }}
        >
            <AddButton />
            <List_Element />
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },




});

export default HomeScreen;