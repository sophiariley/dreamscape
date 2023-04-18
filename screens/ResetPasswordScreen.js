import React, { useState, useEffect} from "react";
import { ScrollView, Dimensions, ImageBackground, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import {useNavigation} from '@react-navigation/core'
import LoginScreen from "./LoginScreen";
import { collection, query, where, onSnapshot, getDocs, setDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";

const ResetPasswordScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [userID, setUserID] = useState('');

    async function findEmailMatch(email) {
        setEmail(email);
        const q = query(collection(db, "users"), where("email", "==", email));
        let verified = false;
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            setUserID(doc.id);
            verified = true;
        });
        if (verified) {
            console.log("email match")
            return Promise.resolve(true);
        } else {
            console.log("no email match");
            return Promise.resolve(false);
        }
    }

    async function updatePassword(newPassword) {
        console.log("userID: ", userID);
        const docRef = doc(db, "users", userID);
        await updateDoc(docRef, {
            password: newPassword,
        });
    }

    const windowHeight = Dimensions.get('window').height;
    const windowWidth = Dimensions.get('window').width;

    return (
        <View style={styles.container}>
            <ScrollView style={{flex:1}}>
                <View style={{width:windowWidth, height:windowHeight }}>
                    <Text style={styles.resetPassword}> Reset Password </Text>

                    <View style={styles.inputContainer}>
                            <Text style={styles.miscText}>Enter the email associated with your</Text>
                            <Text style={styles.miscText}>account:</Text>
                            <TextInput 
                                style={styles.inputText} 
                                placeholder="Email"
                                value={email}
                                onChangeText={text => findEmailMatch(text)}
                            />

                            <Text style={styles.miscText}>Enter new password</Text>
                            <TextInput 
                                style={styles.inputText} 
                                placeholder="New password"
                                value={newPassword}
                                onChangeText={text => setNewPassword(text)}
                            />
                    </View>

                    <View style={styles.resetPasswordButtonContainer}>
                        <TouchableOpacity
                            onPress={() => {updatePassword(newPassword); navigation.navigate('Login')}}
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
            </ScrollView>
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
    emailContainer: {
        justifyContent: 'center',
        alignItems: 'center'
        // top: 175
    },
    newPasswordContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        // top: 75
    },
    resetPassword: {
        color: '#F8C98A',
        fontSize: 40,
        alignSelf: 'center',
        top: 150
    },
    resetPasswordButtonContainer: {
        width: '70%',
        height: '20%',
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        top: -40
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
    },
    inputContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 200
    }
})