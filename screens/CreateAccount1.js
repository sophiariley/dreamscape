import { addDoc } from "firebase/firestore";
import React, { useState} from "react";
import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView, TouchableOpacity } from "react-native";
import {AntDesign} from 'react-native-vector-icons';

const CreateAccount1 = ({navigation}) => {
    const [firstName, setFirstName] = useState(' ');
    const [lastName, setLastName] = useState(' ');
    const [email, setEmail] = useState(' ');
    const [password, setPassword] = useState(' ');

    const createUser = async () =>{
        await addDoc(usersCollectionref, {firstName: firstName, lastName: lastName, 
            email: email, password: password});
    };

    return (
        <View style={styles.container}>
            <Text style={styles.createNewAccount}>Create New Account</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.text}>Enter First Name</Text>
                    <TextInput 
                        style={styles.inputText} 
                        placeholder=""
                        value={firstName}
                        onChange={(event) => {
                            setFirstName(event.target.value);
                        }}
                    />
                <Text style={styles.text}>Enter Last Name</Text>
                    <TextInput 
                        style={styles.inputText} 
                        placeholder=""
                        value={lastName}
                        onChange={(event) => {
                            setLastName(event.target.value);
                        }}
                    />
                <Text style={styles.text}>Enter Email</Text>
                    <TextInput 
                        style={styles.inputText} 
                        placeholder=""
                        value={email}
                        onChange={(event) => {
                            setEmail(event.target.value);
                        }}
                    />
                <Text style={styles.text}>Confirm Email</Text>
                    <TextInput 
                        style={styles.inputText} 
                        placeholder=""
                        // value={email}
                        // onChangeText={text => setEmail(text)}
                    />
            </View>
            <View style={styles.nextButtonContainer}>
                <TouchableOpacity
                    onPress={function(event) {() => navigation.navigate('Create Account 2'); {createUser}}}
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
        top: 110
    },
    nextButtonContainer: {
        width: '70%',
        height: '20%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        top: -10
    },
    accountExistsContainer: {
        flexDirection: 'column',
        bottom: 20
    },
    createNewAccount: {
        color: '#F8C98A',
        fontSize: 35,
        top: 80
    },
    inputText: {
        fontSize: 20,
        backgroundColor: '#DADADA',
        borderRadius: 5,
        width: 350,
        height: '10%'
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