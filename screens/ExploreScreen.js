import React, { useState} from "react";
import { StyleSheet, TextInput, View, KeyboardAvoidingView } from "react-native";
import NavigationBar from "../components/navigationBar";
import {Foundation} from 'react-native-vector-icons';
import { collection, query, where, onSnapshot, getDocs, setDoc, doc } from "firebase/firestore";
import { db } from "../firebase-config";

const ExploreScreen = ({route}) => {
    const [search, setSearch] = useState('');

    async function findUsernameMatch(username) {
        const q = query(collection(db, "users"), where("username", "==", username));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.data().username); //TODO - Alter this to help with UI display
        });
    }

    function doBoth(text) {
        setSearch(text);
        findUsernameMatch(text);
    }

    //User Info
    const username = route.params.username;
    const userID = route.params.userID;
    
    return (
        <View style={styles.container}>
            <View style={styles.header}>
            <KeyboardAvoidingView style={styles.searchBar}
            behavior="padding">
                <Foundation name='magnifying-glass' size={25} color='#3A6496' style={styles.icon}/>
                <TextInput
                    style={styles.searchBarText}
                    placeholder="Search"
                    value={search}
                    onChangeText={text => doBoth(text)}
                />
            </KeyboardAvoidingView>
            </View>
            <KeyboardAvoidingView style={styles.footer}>
                <NavigationBar toNavBarUsername={username} toNavBarUserID={userID}/>
            </KeyboardAvoidingView>
            {/* <ProfileSearchReturn/> */}
        </View>
    )
}

export default ExploreScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    // the styling of the header, used for the search bar
    header: {
        position: 'absolute',
        top: 300,
        alignItems:'center',
        width: '100%'
    },
    // the styling of the footer, used for the navigation bar
    footer: {
        position: 'absolute',
        bottom: 0,
        alignItems:'center'
    },
    searchBar: {
        backgroundColor: '#DADADA',
        opacity: .75,
        width: '95%',
        borderRadius: 5,
        top: -280,
        flexDirection: 'row'
    },
    searchBarText: {
        fontSize: 18,
        color: '#3A6496',
        marginLeft: 10,
        marginTop: 5,
        marginBottom: 5
    },
    icon: {
        marginLeft: 10,
        marginTop: 5,
        marginBottom: 5
    }

})