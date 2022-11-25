import React, { useState} from "react";
import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView } from "react-native";
import {Foundation} from 'react-native-vector-icons';

const CreatePost = ({}) => {
    return (
        <View style={styles.container}>
            <View style={styles.cameraRollContainer}>
                <Text style={styles.text}>Camera Roll</Text>
            </View>
        </View>
    )
}

export default CreatePost;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cameraRollContainer: {
        backgroundColor: '#F8C98A',
        width: '100%',
        height: '8%',
        justifyContent: 'center',
        alignContent: 'center',
        top: 10
    },
    text: {
        color: '#F6F6F6',
        padding: 5,
        alignSelf: 'center',
        fontSize: 25
    }
})