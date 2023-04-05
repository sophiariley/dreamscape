import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import NavigationBar from "../components/navigationBar";
import { collection, query, where, onSnapshot, getDocs, getDoc, doc } from "firebase/firestore";
import { db, storage } from "../firebase-config";
import { ref, getDownloadURL } from "firebase/storage"
import HomeScreenPost from "../components/homeScreenPost";
// import HomeBar from "../components/homeBar";

const HomeScreen = ({route}) => {

    const username = route.params.username;
    const password = route.params.password;
    const [userID, setUserID] = useState('');
    //const userID = route.params.userID;
    const [count, setCount] = useState(0);
    const [finalArray, setFinalArray] = useState([]);

    const printToNavBars = () => {
        console.log("Home Screen username:", username);
        console.log("Home Screen password:", password);
        console.log("Home Screen userID: ", userID);
        //setData(route.params.paramKey);
        //return data;
    }

    //printToNavBars();

    //Get data from followed accounts and disaplay posts on homescreen
    useEffect(() => {
        //setFinalArray([["bV26oHiTJBDec19IiA5b", "d04bfcb9-c8c7-40a0-85f9-eac56b9625de.jpeg", "hello there", "China"], ["bV26oHiTJBDec19IiA5b", "f3bf32de-e2a3-4550-aede-ea58a4de55f3.jpeg", "", ""]]);
        async function getUserID(username, password) {
            const q = query(collection(db, "users"), where("username", "==", username), where("password", "==", password));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setUserID(doc.id);
            });
        }
        getUserID(username,password);
        const getEachFollowedAccount = async () => {
            const followingArray = [];
            if(userID!=='') {
                const userRef = doc(db, "users", userID);
                const collSnapshot = await getDocs(collection(userRef, "following"));
                collSnapshot.forEach(async (docu) => {
                    //-----TODO - get profile pic here
                    console.log("Followed accounts: ", docu.data());
                    const userRef2 = doc(db, "users", docu.data().userID);
                    const docSnap = await getDoc(userRef2);
                    //const acctUsername = docSnap.data().username;
                    const acctUsername = 'Rat';
                    const postsSnapshot = await getDocs(collection(userRef2, "userPosts"));
                    postsSnapshot.forEach((docu2) => {
                        console.log("ME DATA IS: ", docu2.data());
                        var thecaption = '';
                        var thelocation = '';
                        if(docu2.data().caption) {
                            thecaption = docu2.data().caption;
                        }
                        if(docu2.data().location) {
                            thelocation = docu2.data().location;
                        }
                        followingArray.push([acctUsername, docu2.data().image, thecaption, thelocation]);
                        console.log("ARRAY in loop: ", followingArray);
                    });
                    setFinalArray(followingArray);
                });
            }
            console.log("ARRAY: ", finalArray);
        }  
        getEachFollowedAccount();
    }, [userID]);

    return (
        <View style={styles.container}>
            <ScrollView>
                {finalArray.map((post, index) => (
                    <HomeScreenPost 
                        key={index} 
                        username={post[0]} 
                        url={post[1]} 
                        caption={post[2]} 
                        location={post[3]}
                    />
                ))}
            </ScrollView>
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