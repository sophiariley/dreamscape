import React from "react";
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const LoginScreen = () => {
    return (
    <KeyboardAvoidingView
    style={styles.container}
    behavior="padding"> 
        <View
        style={styles.inputContainer}>
            <TextInput 
                style={styles.inputText} 
                placeholder="Enter Username"
                // value={}
                // onChangeText={text => }
                />
            <TextInput 
                style={styles.inputText} 
                placeholder="Enter Password"
                secureTextEntry //hides password
                // value={}
                // onChangeText={text => }
                />
        </View>
        <View style={styles.buttonContainer}>
            <TouchableOpacity
                onPress={() => {}}
                style={styles.button}
            > 
            <Text style={styles.loginButton}>Login!</Text>
            </TouchableOpacity>
        </View>
    </KeyboardAvoidingView>
    )
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputText: {
        fontSize: 20,
    },
    buttonContainer: {

    },
    button: {

    },
    loginButton: {
        fontSize: 14,
        color: '#F6F6F6',
        backgroundColor: '#D28A8E'
    }
})


/* A few notes... 
    - The 'KeyboardAvoidingView' component prevents the user's digital keyboad from obstructing the view of the application*/