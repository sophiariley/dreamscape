import React, { useState} from "react";
import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView, TouchableOpacity } from "react-native";
import {AntDesign} from 'react-native-vector-icons';

const CreateAccount2 = ({navigation}) => {
    const [username, setUsername] = useState(' ');
    const [password, setPassword] = useState(' ');
    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
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
                <Text style={styles.text}>Enter Password</Text>
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
                    onPress={() => navigation.navigate('Home')} // change to Login later
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
        </KeyboardAvoidingView>
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
        position: 'absolute'
    },
    nextButtonContainer: {
        width: '70%',
        height: '20%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        bottom: 80,
        position: 'absolute'
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