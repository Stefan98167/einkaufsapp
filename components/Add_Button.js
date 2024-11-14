import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const AddButton = () => {
    return (
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#2196F3',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        marginVertical: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default AddButton;