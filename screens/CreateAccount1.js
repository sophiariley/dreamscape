import React, { useState} from "react";
import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView, TouchableOpacity } from "react-native";
import {AntDesign} from 'react-native-vector-icons';

const CreateAccount1 = ({navigation}) => {
    const [firstName, setFirstName] = useState(' ');
    const [lastName, setLastName] = useState(' ');
    const [email, setEmail] = useState(' ');
    

    return (
        <View style={styles.container}>
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
                    />
            </View>
            <View style={styles.nextButtonContainer}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Create Account 2')}
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
        top: 190,
        position: 'absolute'
    },
    nextButtonContainer: {
        width: '70%',
        height: '20%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        bottom: 90,
        position: 'absolute'
    },
    accountExistsContainer: {
        flexDirection: 'column',
        bottom: 20,
        position: 'absolute'
    },
    createNewAccount: {
        color: '#F8C98A',
        fontSize: 35,
        top: 100,
        position: 'absolute'
    },
    inputText: {
        fontSize: 20,
        backgroundColor: '#DADADA',
        borderRadius: 5,
        width: 350,
        height: '15%'
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