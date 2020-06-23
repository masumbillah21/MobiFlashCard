import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { white, purple } from '../utils/colors'

export default function SubmitButton ({ children, onPress, style = {}}) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.submit}>
            <Text> { children } </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    submit: {
        width: 100 + '%',
        backgroundColor: white,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderRadius: 5,
        borderColor: purple,
        borderWidth: 2,
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center"
    }
})