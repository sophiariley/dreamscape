// The screen the user interacts with in order to log into the app or create a new account

import React, { useState, useEffect} from "react";
import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Dimensions, Alert } from "react-native";
import {useNavigation} from '@react-navigation/core'
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";
import { KeyboardAvoidingView } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import { Keyboard } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const image = { uri: "https://media4.giphy.com/media/3og0ISzBpn0nNJE3Ac/giphy.gif?cid=ecf05e47kxc23rf9ldw36iuch1geujlfdvraxnb7gm18sznm&rid=giphy.gif&ct=g" };

const LoginScreen = ({navigation}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const handleCheck = () => {
        setIsChecked(!isChecked);
    };
   // const [userID, setUserID] = useState('');


    async function auth(username, password) {
        const q = query(collection(db, "users"), where("username", "==", username), where("password", "==", password));
        let verified = [false, ''];
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            verified = [true, doc.id];
        });
        return verified;
    }

    const windowHeight = Dimensions.get('window').height;
    const windowWidth = Dimensions.get('window').width;

    // Alerts user if they input an incorrect username or password
    const wrongAlert = (navigation) =>
    Alert.alert(
        'Error',
        'Your username and password are invalid.',
        [
        {text: 'Ok', style: 'cancel'}
        ]
    );

    return (
        <View style={styles.container}>
            <ScrollView style={{flex:1}}>
                <View style={{width:windowWidth, height:windowHeight }}>

                    {/* The background of the screen, sourced from Giphy: https://giphy.com/gifs/cinemagraph-gif-artist-3og0ISzBpn0nNJE3Ac */}
                    <ImageBackground 
                    source={image}
                    style={styles.backgroundImage}>

                        <View style={styles.dreamscapeContainer}>
                            <Text style={styles.dreamscape}>Dreamscape</Text>
                        </View>
                        
                        
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>Enter Username</Text>
                                {/* Input box for user to enter their username */}
                                <TextInput 
                                    style={styles.inputText} 
                                    placeholder="Username"
                                    value={username}
                                    onChangeText={text => setUsername(text)}
                                />
                            <Text style={styles.text}>Enter Password</Text>
                                {/* Input box for user to enter their password */}
                                <TextInput 
                                    style={styles.inputText} 
                                    placeholder="Password"
                                    secureTextEntry //hides password
                                    value={password}
                                    onChangeText={text => setPassword(text)}
                                />
                        </View>
                                
                        {/* The "Forgot Password?" button, which navigates to ResetPasswordScreen */}        
                        <View style={styles.forgotPasswordContainer}>
                            <TouchableOpacity 
                                onPress={() => {navigation.navigate('Reset Password')}}>
                                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                            </TouchableOpacity>
                        </View>
                                
                        {/* A checkbox the user can interact with to save their username and password. Commented out due to bugs */}
                        {/* <View style={styles.checkboxContainer}>
                            <TouchableOpacity onPress={handleCheck}>
                                <MaterialCommunityIcons name={isChecked ? 'checkbox-marked' : 'checkbox-blank-outline'} size={35} color={isChecked ? '#F8C98A' : '#F8C98A'}/>
                            </TouchableOpacity>
                            <Text style={styles.rememberMe}>Remember me</Text>
                        </View> */}

                        <View style={styles.container}>
                            <View style={styles.loginButtonContainer}>
                                {/* The "Login" button, which navigates to HomeScreen */}
                                <TouchableOpacity
                                    onPress={() => {
                                        auth(username, password).then(
                                            function(value) {
                                                if (value[0]) {
                                                    navigation.navigate('Home', {
                                                        userID: value[1],
                                                        username: username,
                                                        show: true,
                                                    })
                                                }
                                                else {
                                                    wrongAlert();
                                                } 
                                            }
                                        );
                                    }}
                                    style={styles.loginButton}
                                > 
                                    <Text style={styles.login}> Login! </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                                
                        <View style={styles.noAccountContainer}>
                            <Text style={styles.noAccountText}>────────   Don't have an account?   ────────</Text>
                                {/* The "Create one here!" button, which navigates to CreateAccount1Screen */}
                                <TouchableOpacity 
                                    onPress={() => {navigation.navigate('Create Account 1')}}>
                                <Text style={styles.createText}>Create one here!</Text>
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                    <View style={styles.footer} />
                </View>
            </ScrollView>
        </View>
    )
}

export default LoginScreen;

// The styles used for this screen
const styles = StyleSheet.create({
    // A general container for components
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    // A container for the username and password input boxes and the text above them
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        top: 20
    },

    // A container for the dreamscape text
    dreamscapeContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        top: 0
    },

    // The styling for the area where text is inputted ("Username","Password")
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

    // The container for the "Forgot Password" button
    forgotPasswordContainer: {
        right: 40,
        top: 8
    },

    // The styling for the "Forgot Password" text
    forgotPasswordText: {
        fontSize: 15,
        color: '#DADADA',
        alignSelf: 'flex-end'
    },

    // The container for the "Login" button
    loginButtonContainer: {
        width: '70%',
        height: '20%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        top: 30
    },

    // The styling for the text inside the login button
    login: {
        fontSize: 20,
        color: '#F6F6F6'
    },

    // The styling for the login button
    loginButton: {
        backgroundColor: '#D28A8E', // pink color
        width: '100%',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },

    // The styling for the background
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center'
    },

    // The styling for any misc. text
    text: {
        color: '#F6F6F6',
        fontSize: 20,
        right: 90
    },

    // The styling for the "Dreamscape" text
    dreamscape: {
        marginTop: 80,
        flex: 1,
        fontSize: 60,
        color: '#F8C98A' // yellow color
    },

    // The container for the "Don't have an account? Click here" component
    noAccountContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    // The styling for the "Don't have an account?" text
    noAccountText: {
        color: '#F6F6F6',
        fontSize: 15,
        padding: 10
    },

    // the styling for the "Click here!" text
    createText: {
        color: '#F8C98A',
        fontSize: 20,
        padding: 10
    },

    // The container for the checkbox
    checkboxContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        // bottom: 40
        top: 30
    },

    //  The styling for the "Remember me" text
    rememberMe: {
        fontSize: 15,
        color: '#DADADA',
        alignSelf: 'center',
        paddingLeft: 10
    },
})