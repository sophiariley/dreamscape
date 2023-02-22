import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import NavigationBar from "../components/navigationBar";
import { collection, query, where, onSnapshot, getDocs, setDoc, doc } from "firebase/firestore";
import { db } from "../firebase-config";
import CommentLikeDislike from "../components/homeScreenPost";
// import HomeBar from "../components/homeBar";

const HomeScreen = ({route}) => {

    const username = route.params.username;
    const password = route.params.password;
    const [userID, setUserID] = useState('');
    const [count, setCount] = useState(0);

    async function getUserID(username, password) {
        const q = query(collection(db, "users"), where("username", "==", username), where("password", "==", password));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            setUserID(doc.id);
        });
    }

    const printToNavBars = () => {
        console.log("Home Screen username:", username);
        console.log("Home Screen password:", password);
        console.log("Home Screen userID: ", userID);
        //setData(route.params.paramKey);
        //return data;
    }

    //printData();
    if (count < 1) {
        getUserID(username, password);
        setCount(10);
    }
    printToNavBars();

    return (
        <View style={styles.container}>
            <View>
                <CommentLikeDislike/>
            </View>
            <View style={styles.footer}>
                <NavigationBar toNavBarUsername={username} toNavBarUserID={userID}/>
            </View>
            
        </View>
        
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    // the styling of the header, used for the home bar
    header: {
        position: 'absolute',
        bottom: 0,
        alignItems:'center'
    },
    // the styling of the footer, used for the navigation bar
    footer: {
        position: 'absolute',
        bottom: 0,
        alignItems:'center'
    }
})