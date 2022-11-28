import React, { useState, useEffect} from "react";
import { ImageBackground, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import {useNavigation} from '@react-navigation/core'

const image = { uri: "https://media4.giphy.com/media/3og0ISzBpn0nNJE3Ac/giphy.gif?cid=ecf05e47kxc23rf9ldw36iuch1geujlfdvraxnb7gm18sznm&rid=giphy.gif&ct=g" };


const LoginScreen = ({navigation}) => {
    const [username, setUsername] = useState(' ');
    const [password, setPassword] = useState(' ');

    // const navigation = useNavigation() // to use when connected to firebase :)

    // TO DO: firebase auth and such...

    return (
        <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"> 
            <ImageBackground 
            source={image}
            style={styles.backgroundImage}>
                <View style={styles.dreamscapeContainer}>
                    <Text style={styles.dreamscape}>Dreamscape</Text>
                </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>Enter Username</Text>
                            <TextInput 
                                style={styles.inputText} 
                                placeholder="Username"
                                value={username}
                                onChangeText={text => setUsername(text)}
                            />
                        <Text style={styles.text}>Enter Password</Text>
                            <TextInput 
                                style={styles.inputText} 
                                placeholder="Password"
                                secureTextEntry //hides password
                                value={password}
                                onChangeText={text => setPassword(text)}
                            />
                    </View>
                
                <View style={styles.container}>
                    <View style={styles.loginButtonContainer}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Home')}
                            style={styles.loginButton}
                        > 
                        <Text style={styles.login}>Login!</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                
                <View style={styles.noAccountContainer}>
                    <Text style={styles.noAccountText}>────────   Don't have an account?   ────────</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Create Account 1')}>
                        <Text style={styles.createText}>Create one here!</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </KeyboardAvoidingView>
    )
}

export default LoginScreen;

const styles = StyleSheet.create({
    // a general container for components
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        top: 20
    },
    // a container for the dreamscape text
    dreamscapeContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        top: -20
    },
    // the styling for the area where text is inputted ("Username","Password")
    inputText: {
        fontSize: 20,
        backgroundColor: '#DADADA',
        opacity: .5,
        height: '20%',
        width: '80%',
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 10,
        paddingLeft: 10
    },
    loginButtonContainer: {
        width: '70%',
        height: '20%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        top: 30
    },
    // the styling for the text inside the login button
    login: {
        fontSize: 20,
        color: '#F6F6F6'
    },
    // the styling for the login button
    loginButton: {
        backgroundColor: '#D28A8E', // pink color
        width: '100%',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    // the styling for the background
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center'
    },
    // the styling for any "unimportant" text
    text: {
        color: '#F6F6F6',
        fontSize: 20,
        right: 90
    },
    // the styling for the "Dreamscape" text
    dreamscape: {
        marginTop: 100,
        flex: 1,
        fontSize: 60,
        color: '#F8C98A' // yellow color
    },
    // the container for the "forgot password?" text
    noAccountContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    // the styling for the "don't have an account?" text
    noAccountText: {
        color: '#F6F6F6',
        fontSize: 15,
        padding: 10
    },
    // the styling for the "click here" text
    createText: {
        color: '#F8C98A',
        fontSize: 20,
        padding: 10
    }
})