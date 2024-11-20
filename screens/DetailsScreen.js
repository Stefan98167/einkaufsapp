import React from 'react';
import ProductInformation from '../components/Product_Information';
import ProductImage from '../components/Product_Image';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const DetailsScreen = () => {
    return (
        <LinearGradient
            colors={['#171717', '#4B2F7B']}
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1.5 }}
        >
            <ProductImage />
            <ProductInformation />
        </LinearGradient>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start', 
        alignItems: 'center',
        width: '100%',
    },
});

export default DetailsScreen;
