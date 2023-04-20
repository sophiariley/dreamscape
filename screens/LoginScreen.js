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
            //setUserID(doc.id);
            verified = [true, doc.id];
        });
        return verified;
    }

    const windowHeight = Dimensions.get('window').height;
    const windowWidth = Dimensions.get('window').width;

    // Alert for incorrect fields
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
                                
                        <View style={styles.forgotPasswordContainer}>
                            <TouchableOpacity 
                                onPress={() => {navigation.navigate('Reset Password')}}>
                                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                            </TouchableOpacity>
                        </View>
                                
                        <View style={styles.checkboxContainer}>
                            <TouchableOpacity onPress={handleCheck}>
                                <MaterialCommunityIcons name={isChecked ? 'checkbox-marked' : 'checkbox-blank-outline'} size={35} color={isChecked ? '#F8C98A' : '#F8C98A'}/>
                            </TouchableOpacity>
                            <Text style={styles.rememberMe}>Remember me</Text>
                        </View>

                        <View style={styles.container}>
                            <View style={styles.loginButtonContainer}>
                                <TouchableOpacity
                                    onPress={() => {
                                        auth(username, password).then(
                                            function(value) {
                                                if (value[0]) {
                                                    //console.log("KACHOWS",value[0]);
                                                    navigation.navigate('Home', {
                                                        userID: value[1],
                                                        username: username
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
        top: 0
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
    forgotPasswordContainer: {
        right: 40,
        top: 8
    },
    forgotPasswordText: {
        fontSize: 15,
        color: '#DADADA',
        alignSelf: 'flex-end'
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
        marginTop: 80,
        flex: 1,
        fontSize: 60,
        color: '#F8C98A' // yellow color
    },
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
    },
    checkboxContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        // bottom: 40
        top: 30
    },
    rememberMe: {
        fontSize: 15,
        color: '#DADADA',
        alignSelf: 'center',
        paddingLeft: 10
    },
})