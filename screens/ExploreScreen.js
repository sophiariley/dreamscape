// The screen the user interacts with in order to search Dreamscape.

import React, { useState} from "react";
import { StyleSheet, TextInput, View, KeyboardAvoidingView, Text } from "react-native";
import NavigationBar from "../components/navigationBar";
import ProfileSearchReturn from "../components/profileSearchReturn";
import {Foundation} from 'react-native-vector-icons';
import { collection, query, where, onSnapshot, getDocs, setDoc, doc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL, } from "firebase/storage"
import { db, storage } from "../firebase-config";

const ExploreScreen = ({route}) => {
    const [search, setSearch] = useState('');
    const [match, setMatch] = useState('');
    const [matchFound, setMatchFound] = useState(false);
    const [matchID, setMatchID] = useState('');
    const [matchPhoto, setMatchPhoto] = useState("https://firebasestorage.googleapis.com/v0/b/dreamscapeofficial-ef560.appspot.com/o/images%2Fdefault.jpg?alt=media&token=b1a61225-6f54-40e1-9cda-0493dc02c6c5");

    async function findUsernameMatch(username) {
        setMatch('');
        setMatchFound(false);
        if (username != "") {
            const q = query(collection(db, "users"), where("username", ">=", username), where("username", "<=", username + '\uf8ff'));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                console.log(doc.data().username); //TODO - Alter this to help with UI display
                setMatchFound(true);
                setMatchID(doc.id);
                getProfilePhoto();
                setMatch(doc.data().username);
                return;
            });
        }
        
    }

    async function getProfilePhoto() {
        const images = await getDocs(collection(doc(db, "users", matchID), "images"));
        images.forEach(async (doc) => {
            const picPath = doc.data().url;
            const imagesRef = ref(storage, "images");
            const pathRef = ref(imagesRef, picPath);
            const downloadUrl = await getDownloadURL(pathRef)
                .catch((error) => {
                  });
            setMatchPhoto(downloadUrl);
            return;
        });
        {setMatchPhoto("https://firebasestorage.googleapis.com/v0/b/dreamscapeofficial-ef560.appspot.com/o/images%2Fdefault.jpg?alt=media&token=b1a61225-6f54-40e1-9cda-0493dc02c6c5"); }
    }

    function doBoth(text) {
        setSearch(text);
        findUsernameMatch(text);
    }

    //User Info
    const username = route.params.username;
    const userID = route.params.userID;


    const searchReturn = matchFound && match!=[''] && matchID!=''? <ProfileSearchReturn toSearchReturnUsername={match} toSearchReturnUserID={matchID} toNavBarUsername={username} toNavBarUserID={userID} toSearchReturnPhoto={matchPhoto}/> : null;
    
    return (
        <View style={styles.container}>
            <View style={styles.header}>

            {/* The searchbar, which the user can interact with in order to search the app */}
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

            {/* The navigation bar, which the user can use to navigate the app */}
            <KeyboardAvoidingView style={styles.footer}>
                <NavigationBar toNavBarUsername={username} toNavBarUserID={userID}/>
            </KeyboardAvoidingView>

            {/* <ScrollView>
                {finalArray ? 
                finalArray.map((post, index) => (
                    <HomeScreenPost 
                        userID={userID}
                        userUsername={username}
                        key={index} 
                        username={post[0]} 
                        url={post[1]} 
                        caption={post[2]} 
                        location={post[3]}
                        posterID={post[4]}
                        postID={post[5]}
                        posterPFP={post[6]}

                    />
                )) : <HomeScreenPost/>}
            </ScrollView> */}
            
            {searchReturn}
        </View>
    )
}

export default ExploreScreen;

// The styles used for this screen
const styles = StyleSheet.create({
    // A general container for components
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

    // A container for the search bar
    searchBar: {
        backgroundColor: '#DADADA',
        opacity: .75,
        width: '95%',
        borderRadius: 5,
        top: -280,
        flexDirection: 'row'
    },

    // The styling for the text in the search bar
    searchBarText: {
        fontSize: 18,
        color: '#3A6496',
        marginLeft: 10,
        marginTop: 5,
        marginBottom: 5
    },

    // The styling for the icon in the search bar
    icon: {
        marginLeft: 10,
        marginTop: 5,
        marginBottom: 5
    }

})