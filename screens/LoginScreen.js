import React from "react";
import { ImageBackground, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const image = { uri: "https://i.pinimg.com/736x/44/d5/81/44d581f662669c791b94641901b49b13.jpg" };


const LoginScreen = () => {
    return (
            <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"> 
                <ImageBackground 
                    source={image}
                    style={styles.backgroundImage}
                >
                    <View
                        style={styles.inputContainer}
                    >
                        <Text style={styles.text}>Enter Username</Text>
                            <TextInput 
                                style={styles.inputText} 
                                placeholder="Username..."
                                // value={}
                                // onChangeText={text => }
                            />
                        <Text style={styles.text}>Enter Password</Text>
                            <TextInput 
                                style={styles.inputText} 
                                placeholder="Password"
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
                </ImageBackground>
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
        backgroundColor: '#DADADA',
        opacity: .5,
        height: '15%',
        width: '60%'
    },
    buttonContainer: {

    },
    button: {

    },
    loginButton: {
        fontSize: 20,
        color: '#F6F6F6',
        backgroundColor: '#D28A8E',
        // height: '15%',
        // width: '60%'
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center'
    },
    text: {
       color: '#F6F6F6',
       fontSize: 20,
    }
})


/* A few notes... 
    - The 'KeyboardAvoidingView' component prevents the user's digital keyboad from obstructing the view of the application*/