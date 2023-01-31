import React, { useState, useEffect} from "react";
import { ImageBackground, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import {useNavigation} from '@react-navigation/core'
import LoginScreen from "./LoginScreen";

const ResetPasswordScreen = ({navigation}) => {
    const [email, setEmail] = useState('');

    return (
        <View style={styles.container}>
            <Text style={styles.resetPassword}> Reset Password </Text>

            <View style={styles.inputContainer}>
                <Text style={styles.miscText}>Enter the email associated with your</Text>
                <Text style={styles.miscText}>account:</Text>
                <TextInput 
                    style={styles.inputText} 
                    placeholder="Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
            </View>

            <View style={styles.resetPasswordButtonContainer}>
                <TouchableOpacity
                    onPress={() => {{navigation.navigate('Login')}}}
                    style={styles.resetPasswordButton}
                > 
                <Text style={styles.resetPasswordButtonText}>Reset Password</Text>
                </TouchableOpacity>
            </View>

            <View>
                <TouchableOpacity
                    onPress={() => {{navigation.navigate('Login')}}}
                >
                    <Text style={styles.returnToLogin}>Return to login</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default ResetPasswordScreen;

const styles = StyleSheet.create ({
    container: {
        backgroundColor: 'white',
        height: '100%',
        width: '100%',
        alignContent: 'center',
        justifyContent: 'center'
    },  
    inputContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        top: 200
    },
    resetPassword: {
        color: '#F8C98A',
        fontSize: 40,
        alignSelf: 'center',
        top: 225
    },
    resetPasswordButtonContainer: {
        width: '70%',
        height: '20%',
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    resetPasswordButton: {
        backgroundColor: '#D28A8E', // pink color
        width: '100%',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    resetPasswordButtonText: {
        fontSize: 20,
        color: '#F6F6F6'
    },
    miscText: {
        color: '#3A6496',
        alignSelf: 'flex-start',
        left: 40,
        fontSize: 20
    },
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
    returnToLogin: {
        alignSelf: 'center',
        color: '#3A6496',
        bottom: 100,
        fontSize: 20
    }
})