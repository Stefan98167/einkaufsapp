import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const List_Element = () => {
const TitleButton = () => {
    return (
        <View style={styles.button}>
            <Text style={styles.buttonText}>ProductName</Text>
        </View>
    );
}
const CrowdButton = () => {
    return (
        <View style={styles.button}>
            <Text style={styles.buttonText}>Crowd</Text>
        </View>
    );
}

return (
    <>
        <TitleButton />
        <CrowdButton />
    </>
);
};
const styles = StyleSheet.create({
    button: {
        padding: 10,
        backgroundColor: '#DDDDDD',
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        color: '#000',
    },
});

export default List_Element;