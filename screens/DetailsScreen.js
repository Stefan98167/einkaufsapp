import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const DetailsScreen = () => {
    return (
        <LinearGradient
            colors={['#000000', '#4B2F7B']}
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1.5 }}
        >
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

export default DetailsScreen;