// The second page the user interacts with when creating a new account

import React, { useState} from "react";
import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView, TouchableOpacity, ScrollView, Dimensions, Alert } from "react-native";
import {AntDesign} from 'react-native-vector-icons';
//import { getDatabase, ref, set } from "firebase/database";
import { doc, setDoc, collection, addDoc } from "firebase/firestore"; 
import { db } from "../firebase-config";

const CreateAccount2 = ({route, navigation}) => {
    const { firstName, lastName, email } = route.params;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
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

     // Alert user if they left empty fields
    const emptyAlert = () =>
    Alert.alert(
        'Empty Field',
        'Please make sure all fields are filled out!',
        [
        {text: 'Ok', style: 'cancel'}
        ]
    );

    // Alerts user if input in confirmed password box doesn't match that in password box
    const wrongPasswordAlert = () => 
    Alert.alert(
        'Error',
        'Your password does\'t match.',
        [
        {text: 'Ok', style: 'cancel'}
        ]
    );

    const doBoth = () => {
        createUser(firstName, lastName, email, username, password); 
        navigation.navigate('Home', {
            username: username,
            password: password,
        });
    }
    
    async function auth(username, password, password2) {
        let verified = [false, ''];
        if (username=='' || password=='' || password2=='') { emptyAlert(); return verified; } 
        if (password!=password2) { wrongPasswordAlert(); return verified; }

        createUser(firstName, lastName, email, username, password); 
        const q = query(collection(db, "users"), where("username", "==", username), where("password", "==", password));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            verified = [true, doc.id];
        });
        return verified;
    }

    return (
        <View style={styles.container}>
            <ScrollView style={{flex:1}}>
                <View style={{width:windowWidth, height:windowHeight }}>
                    <Text style={styles.createNewAccount}>Create New Account</Text>

                    <View style={styles.textContainer}>
                        <Text style={styles.text}>Enter Username</Text>
                            {/* Input box for user to enter their desired username */}
                            <TextInput 
                                style={styles.inputText} 
                                placeholder=""
                                value={username}
                                onChangeText={text => setUsername(text)}
                            />

                        <Text style={styles.text}>Enter Password</Text>
                            {/* Input box for user to enter their desired password */}
                            <TextInput 
                                style={styles.inputText} 
                                placeholder=""
                                secureTextEntry //hides password
                                value={password}
                                onChangeText={text => setPassword(text)}
                            />

                        <Text style={styles.text}>Re-enter Password</Text>
                            {/* Input box for user to confirm their password */}
                            <TextInput 
                                style={styles.inputText} 
                                placeholder=""
                                secureTextEntry //hides password
                                value={password2}
                                onChangeText={text => setPassword2(text)}
                            />
                    </View>

                    {/* Next button, which saves the user's input and navigates to HomeScreen */}
                    <View style={styles.nextButtonContainer}>
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
                                            // wrongAlert();
                                        } 
                                    }
                                );
                            }}
                            //;username=='' || password=='' || password2=='' ? emptyAlert() : password!=password2 ? wrongPasswordAlert() : doBoth() } }
                            // change to Login later

                            style={styles.nextButton}
                        > 
                            <Text style={styles.next}>Next</Text>
                            <AntDesign name='arrowright' size={20} color='#F6F6F6'/>
                        </TouchableOpacity>
                    </View>

                    {/* Previous button, which navigates to CreateAccount1Screen */}
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

// Styles used for this screen:s
const styles = StyleSheet.create({
    // A general container for components
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    // A container for the input boxes and their respection text
    textContainer: {
        top: 200,
        position: 'absolute',
        alignSelf: 'center'
    },

    // A container for the "Next" button
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

    // A container for the "Previous" button
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

    // The styling for the "Create New Account" text
    createNewAccount: {
        color: '#F8C98A',
        fontSize: 35,
        top: 100,
        position: 'absolute',
        alignSelf: 'center'
    },

    // Styling for the input text
    inputText: {
        fontSize: 20,
        backgroundColor: '#DADADA',
        borderRadius: 5,
        width: 350,
        height: '20%',
        paddingLeft: 10
    },

    // Styling for the text about the input boxes
    text: {
        color: '#3A6496',
        fontSize: 14,
        paddingTop: 10,
        paddingBottom: 5
    }, 

    // Styling for the "Next" button
    nextButton: {
        backgroundColor: '#D28A8E', // pink color
        width: '100%',
        padding: 15,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },

    // Styling for the "Next" text
    next: {
        fontSize: 20,
        color: '#F6F6F6',
        paddingRight: 10,
    },

    // Styling for the "Previous" button
    prevButton: {
        backgroundColor: '#3A6496', // blue color
        width: '100%',
        padding: 15,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },

    // Styling for the "Previous" text
    prev: {
        fontSize: 20,
        color: '#F6F6F6',
        paddingLeft: 10,
    },
})