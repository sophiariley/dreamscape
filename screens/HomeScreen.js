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
    // const password = route.params.password;
    const userID = route.params.userID;
    //const [userID, setUserID] = useState('');
    //const userID = route.params.userID;
    //const [globalURL, setGlobalURL] = useState('https://firebasestorage.googleapis.com/v0/b/dreamscapeofficial-ef560.appspot.com/o/images%2F2d6961e8-dafc-48bb-aa1c-56efe6e57b93.jpeg?alt=media&token=696456ea-1c7c-49ec-8135-1c947e17fe54');
    //const [globalURL, setGlobalURL] = useState('');
    //------MAKE ARRAY OF GLOBALURLS AND ADD ADD TO CHECK ARRAY AND END OF USEEFFECT
    const [finalArray, setFinalArray] = useState([]);
    //const [posterPFP, setPosterPFP] = useState('')

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
        // async function getUserID() {
        //     console.log("HERE ARE THE CHAMPIIONS ------------- ", username, "     ", route.params.password);
        //     const q = query(collection(db, "users"), where("username", "==", username), where("password", "==", password));
        //     const querySnapshot = await getDocs(q);
        //     querySnapshot.forEach((doc) => {
        //         setUserID(doc.id);
        //     });
        // }
        // getUserID();


        console.log(userID);
        async function getPicUrl(picpath) {
            
            const imagesRef = ref(storage, "images");
            const pathRef = ref(imagesRef,picpath);
            const downloadUrl = await getDownloadURL(pathRef)
                .catch((error) => {
                    console.log('ok dokie ', picpath);
                  });
                console.log('huh uh', downloadUrl);
            return downloadUrl;
        }

        const getEachFollowedAccount = async () => {
            const followingArray = [];
            if(userID!=='') {
                const userRef = doc(db, "users", userID);
                const collSnapshot = await getDocs(collection(userRef, "following"));
                collSnapshot.forEach(async (docu) => {

                    console.log("Followed accounts: ", docu.data());
                    const userRef2 = doc(db, "users", docu.data().userID);
                    const docSnap = await getDoc(userRef2);
                    const acctUsername = docSnap.data().username;

                    //-------- get profile pic here
                    var docID = '';
                    const images = await getDocs(collection(userRef2, "images"));
                    images.forEach((doc) => {
                        docID = doc.id;
                    });
                    const pfpID = docID;
                    const pic = doc(userRef2, "images", pfpID);
                    const picSnap = await getDoc(pic);
                    const posterPFP = await getPicUrl(picSnap.data().url);       
                    
                    console.log("MAFF FOR THE WIN", posterPFP);
                    
                    
                    // -------------------------------------------------------------
                    //  Get each post data
                    const postsSnapshot = await getDocs(collection(userRef2, "userPosts"));
                    postsSnapshot.forEach(async (docu2) => {
                        console.log("ME DATA IS: ", docu2.data());
                        var thecaption = '';
                        var thelocation = '';
                        if(docu2.data().caption) { thecaption = docu2.data().caption; }
                        if(docu2.data().location) { thelocation = docu2.data().location; }

                        //download image here and push to array
                        const globalURL = await getPicUrl(docu2.data().image);
                        /*if(globalURL!='') {
                            followingArray.push([acctUsername, globalURL, thecaption, thelocation]);
                        }*/
                        followingArray.push([acctUsername, globalURL, thecaption, thelocation, docu.data().userID, docu2.id, posterPFP]);
                        console.log("ARRAY in loop: ", followingArray);
                    });
                    setFinalArray(followingArray);
                    console.log("FinalARRAY: ", finalArray);
                    //return followingArray;
                });
            }
            console.log("ARRAY: ", finalArray);
        }  

        const asyncrun = async () => {
            await getEachFollowedAccount().then(() => {
                console.log("FinalFinalARRAY: ", finalArray);
            });
            /*const followingArray = await getEachFollowedAccount().then(() => {
                setFinalArray(followingArray);
                console.log("FinalFinalARRAY: ", finalArray);
            });*/
            
        }
        //getEachFollowedAccount();
        //setFinalArray([["Rat", "https://firebasestorage.googleapis.com/v0/b/dreamscapeofficial-ef560.appspot.com/o/images%2Ff3bf32de-e2a3-4550-aede-ea58a4de55f3.jpeg?alt=media&token=f5b47c94-f9a8-4e34-b553-6aa3f0682a8f", "", ""], ["Rat", "https://firebasestorage.googleapis.com/v0/b/dreamscapeofficial-ef560.appspot.com/o/images%2Fd04bfcb9-c8c7-40a0-85f9-eac56b9625de.jpeg?alt=media&token=b1421e50-af12-42c8-b883-19e590bed86c", "hello there", "China"]]);
        /*const followingArray = getEachFollowedAccount();
        setFinalArray(followingArray);
        console.log("ARRAY: ", finalArray);*/
        asyncrun();
    }, [userID]);

    return (
        <View style={styles.container}>
            <ScrollView>
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