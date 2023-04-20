import React, { useState} from "react";
import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView, TouchableOpacity, Dimensions, ScrollView, Alert } from "react-native";
import {AntDesign} from 'react-native-vector-icons';
import { db } from "../firebase-config";
import { collection, addDoc } from "firebase/firestore";

const CreateAccount1 = ({navigation}) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [email2, setEmail2] = useState('');

    function createUser(firstName, lastName, email) {
         const runit = async () => await addDoc(collection(db, "users"), {
        FirstName: firstName,
        LastName: lastName,
        Email: email
      });
      runit();
    }
    
    const windowHeight = Dimensions.get('window').height;
    const windowWidth = Dimensions.get('window').width;

    // Alert for empty fields
    const emptyAlert = () =>
    Alert.alert(
        'Empty Field',
        'Please make sure all fields are filled out!',
        [
        {text: 'Ok', style: 'cancel'}
        ]
    );

    const wrongAlert = () =>
    Alert.alert(
        'Error',
        'Your email and confirm email don\'t match.',
        [
        {text: 'Ok', style: 'cancel'}
        ]
    );


    return (
        <View style={styles.container}>
            <ScrollView style={{flex:1}}>
                <View style={{width:windowWidth, height:windowHeight }}>
                    <Text style={styles.createNewAccount}>Create New Account</Text>
                    <View style={styles.inputContainer}>
                        <Text style={styles.text}>Enter First Name</Text>
                            <TextInput 
                                style={styles.inputText} 
                                placeholder=""
                                value={firstName}
                                onChangeText={text => setFirstName(text)}
                            />
                        <Text style={styles.text}>Enter Last Name</Text>
                            <TextInput 
                                style={styles.inputText} 
                                placeholder=""
                                value={lastName}
                                onChangeText={text => setLastName(text)}
                            />
                        <Text style={styles.text}>Enter Email</Text>
                            <TextInput 
                                style={styles.inputText} 
                                placeholder=""
                                value={email}
                                onChangeText={text => setEmail(text)}
                            />
                        <Text style={styles.text}>Confirm Email</Text>
                            <TextInput 
                                style={styles.inputText} 
                                placeholder=""
                                value={email2}
                                onChangeText={text => setEmail2(text)}
                            />
                    </View>
                    <View style={styles.nextButtonContainer}>
                        <TouchableOpacity
                            //onPress={() => createUser(firstName, lastName, email)} //navigation.navigate('Create Account 2')}
                            onPress={() => firstName=='' || lastName=='' || email=='' || email2=='' ? emptyAlert() : (email!=email2 ? wrongAlert() : navigation.navigate('Create Account 2', {firstName: firstName, lastName: lastName, email: email}))}
                            style={styles.nextButton}
                        > 
                            <Text style={styles.next}>Next</Text>
                            <AntDesign name='arrowright' size={20} color='#F6F6F6'/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.accountExistsContainer}>
                        <Text style={styles.accountExistsText}>────────   Already have an account?   ────────</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.signInText}>Sign in here!</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default CreateAccount1;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        top: 190,
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
        bottom: 90,
        position: 'absolute',
        alignSelf: 'center'
    },
    accountExistsContainer: {
        flexDirection: 'column',
        bottom: 20,
        position: 'absolute',
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
        height: '15%',
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
    accountExistsText: {
        color: '#3A6496',
        fontSize: 15
    },
    signInText: {
        alignSelf: 'center',
        color: '#F8C98A',
        fontSize: 20,
        padding: 15
    }
})