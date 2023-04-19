import React, { useState} from "react";
import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import {AntDesign} from 'react-native-vector-icons';
//import { getDatabase, ref, set } from "firebase/database";
import { doc, setDoc, collection, addDoc } from "firebase/firestore"; 
import { db } from "../firebase-config";

const CreateAccount2 = ({route, navigation}) => {
    const { firstName, lastName, email } = route.params;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userID, setUserID] = useState(''); //CAN BE USED TO PASS UID THROUGH INSTEAD OF FINDING IT LATER
    //const res = db.collection('users');

    function createUser(firstName, lastName, email, username, password) {
        const runit = async () => await addDoc(collection(db, "users"), {
       firstName: firstName,
       lastName: lastName,
       email: email,
       username: username,
       password: password
     })
     .then(function(docRef) {
        console.log("Create Acct UID: ", docRef.id);
        setUserID(docRef.id);
     });
     runit();
    }

    const windowHeight = Dimensions.get('window').height;
    const windowWidth = Dimensions.get('window').width;

    // Alert for empty fields
    const emptyAlert = (navigation) =>
    Alert.alert(
        'Empty Field',
        'Please make sure all fields are filled out!',
        [
        {text: 'Ok', style: 'cancel'}
        ]
    );

    // Alert for mismatch passwords
    const wrongPasswordAlert = (navigation) =>
    Alert.alert(
        'Error',
        'Your password does\'t match.',
        [
        {text: 'Ok', style: 'cancel'}
        ]
    );

    return (
        <View style={styles.container}>
            <ScrollView style={{flex:1}}>
                <View style={{width:windowWidth, height:windowHeight }}>
                    <Text style={styles.createNewAccount}>Create New Account</Text>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>Enter Username</Text>
                            <TextInput 
                                style={styles.inputText} 
                                placeholder=""
                                value={username}
                                onChangeText={text => setUsername(text)}
                            />
                        <Text style={styles.text}>Enter Password</Text>
                            <TextInput 
                                style={styles.inputText} 
                                placeholder=""
                                secureTextEntry //hides password
                                value={password}
                                onChangeText={text => setPassword(text)}
                            />
                        <Text style={styles.text}>Re-enter Password</Text>
                            <TextInput 
                                style={styles.inputText} 
                                placeholder=""
                                secureTextEntry //hides password
                                value={password}
                                onChangeText={text => setPassword(text)}
                            />
                    </View>
                    <View style={styles.nextButtonContainer}>
                        <TouchableOpacity 
                            onPress={() => { createUser(firstName, lastName, email, username, password); navigation.navigate('Home', {
                                username: username,
                                password: password,
                            }) } }
                            // change to Login later

                            style={styles.nextButton}
                        > 
                            <Text style={styles.next}>Next</Text>
                            <AntDesign name='arrowright' size={20} color='#F6F6F6'/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.prevButtonContainer}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Create Account 1')}
                            style={styles.prevButton}
                        > 
                            <AntDesign name='arrowleft' size={20} color='#F6F6F6'/>
                            <Text style={styles.prev}>Previous</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default CreateAccount2;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textContainer: {
        top: 200,
        position: 'absolute',
        alignSelf: 'center'
    },
    nextButtonContainer: {
        width: '70%',
        height: '20%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        bottom: 80,
        position: 'absolute',
        alignSelf: 'center'
    },
    prevButtonContainer: {
        width: '70%',
        height: '20%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        position: 'absolute',
        bottom: 10,
        alignSelf: 'center'
    },
    createNewAccount: {
        color: '#F8C98A',
        fontSize: 35,
        top: 100,
        position: 'absolute',
        alignSelf: 'center'
    },
    inputText: {
        fontSize: 20,
        backgroundColor: '#DADADA',
        borderRadius: 5,
        width: 350,
        height: '20%',
        paddingLeft: 10
    },
    text: {
        color: '#3A6496',
        fontSize: 14,
        paddingTop: 10,
        paddingBottom: 5
    }, 
    nextButton: {
        backgroundColor: '#D28A8E', // pink color
        width: '100%',
        padding: 15,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    next: {
        fontSize: 20,
        color: '#F6F6F6',
        paddingRight: 10,
    },
    prevButton: {
        backgroundColor: '#3A6496', // blue color
        width: '100%',
        padding: 15,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    prev: {
        fontSize: 20,
        color: '#F6F6F6',
        paddingLeft: 10,
    },
})