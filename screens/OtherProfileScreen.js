import React, { useState} from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Dimensions} from "react-native";
import NavigationBar from "../components/navigationBar";
import { Feather } from 'react-native-vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";
import PhotoGrid from "../components/photoGrid";
import { getStorage, ref, getDownloadURL, } from "firebase/storage"
import { db, storage } from "../firebase-config";
import { collection, query, where, onSnapshot, getDocs, getDoc, addDoc, doc, deleteDoc, getCountFromServer } from "firebase/firestore";

const OtherProfileScreen = ({route}) => {

    //realUsername & realUserID are logged in account, username and userID are other account
    const username = route.params.otherUsername;
    const userID = route.params.otherUserID;
    const realUsername = route.params.username;
    const realUserID = route.params.userID;

    //url of pic in firebase store - originally set to default profile pic
    const [picID, setPicID] = useState(''); //2Zz3JGFco2dG0n6CMsE1
    const [globalUrl, setGlobalUrl] = useState('https://firebasestorage.googleapis.com/v0/b/dreamscapeofficial-ef560.appspot.com/o/images%2Fdefault.jpg?alt=media&token=b1a61225-6f54-40e1-9cda-0493dc02c6c5');
    const [globalPicPath, setGlobalPicPath] = useState('default.jpg');
    const [count, setCount] = useState(0);
    const [followText, setFollowText] = useState('Follow');

    const followAccount = async () => {
        setFollowText('Following');
        const userRef = doc(db, "users", realUserID);
        await addDoc(collection(userRef, 'following'), {
            userID: userID
        });
        const otherUserRef = doc(db, "users", userID);
        await addDoc(collection(otherUserRef, 'followers'), {
            userID: realUserID
        });
    }

    const unFollowAccount = async () => {
        setFollowText('Follow');
        const userRef = doc(db, "users", realUserID);
        const q = query(collection(userRef, "following"), where("userID", "==", userID));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            //This deleted the account from users collection -----------------------------
            //deleteDoc(userRef, 'following', doc.id);
        });
        const otherUserRef = doc(db, "users", userID);
        const q2 = query(collection(otherUserRef, "following"), where("userID", "==", realUserID));
        const querySnapshot2 = await getDocs(q2);
        querySnapshot2.forEach((doc) => {
            //deleteDoc(userRef, 'followers', doc.id);
        });
    }

    const loadFollowData = async () => {
        const userRef = doc(db, "users", realUserID);
        const followingUsers = await getDocs(collection(userRef, 'following'));
        followingUsers.forEach((doc) => {
            const followID = doc.data().userID;
            console.log("followID", followID);
            console.log("userID: ", userID);
            if(userID === followID) {
                setFollowText('Following');
            }
        });
    }

    async function getPicID(docRef) {
        const images = await getDocs(collection(docRef, "images"));
        images.forEach((doc) => {
            //console.log(doc.id, " => ", doc.data());
            setPicID(doc.id);
            setCount(10);
        });
    }

    async function getPicPath(userID) {
        const docRef = doc(db, "users", userID);
        const docSnap = await getDoc(docRef);
        //const pic = doc(docRef, "images", "DPKrc0Z8ZOBvEOwMXHTd"); //change from hard code
        //const pic = doc(docRef, "images", "2Zz3JGFco2dG0n6CMsE1");
        //console.log("GetPicPath PICID: ", picID);
        const pic = doc(docRef, "images", picID);
        const picSnap = await getDoc(pic);
        const mypath = picSnap.data().url;
        //take parenthases away
        var strpath = mypath;
        var result = strpath.substring(8, strpath.length-1); //changes 1 to 8 to takeout images/
        const newmypath = result;
        //console.log("getPicPath: ", newmypath);
        setGlobalPicPath(newmypath);
    }

    async function getPicUrl(picpath) {
        //console.log("is there quotes? ", picpath);
        const imagesRef = ref(storage, "images");
        const pathRef = ref(imagesRef,picpath);
        const downloadUrl = await getDownloadURL(pathRef)
            .catch((error) => {
              });
            //console.log('Image URL: ', downloadUrl);
            setGlobalUrl(downloadUrl);

    }

    async function doItAll() {
        const docRef = doc(db, "users", userID);
        await getPicID(docRef);
        //console.log("User ID: ", userID);
        if(count>0){
            await getPicPath(userID); 
            //console.log("We here, ", globalPicPath);
            await getPicUrl(globalPicPath);
        }

        doItAllPosts();
        getFollowingCount(docRef);
        getFollowerCount(docRef);
        getFirstName(docRef);
        loadFollowData();
    }

    doItAll();

    const [globalPostUrls, setGlobalPostUrls] = useState(['https://firebasestorage.googleapis.com/v0/b/dreamscapeofficial-ef560.appspot.com/o/images%2Fdefault.jpg?alt=media&token=b1a61225-6f54-40e1-9cda-0493dc02c6c5']);

    async function getPicIDPosts(docRef) {
        const picIDArray = [];
        const images = await getDocs(collection(docRef, "userPosts"));
        const snapshot = await getCountFromServer(collection(docRef, "userPosts"));
        //console.log('count: ', snapshot.data().count);
        images.forEach(async (doc) => {
            //console.log(doc.id, " => ", doc.data());
            picIDArray.push(doc.id);
        });
        return picIDArray;
    }


    async function getPicPathPosts(picIDArray) {
        const picPathArray = [];
        const docRef = doc(db, "users", userID);
        for (let i = 0; i < picIDArray.length; i++) {
            const pic = doc(docRef, "userPosts", picIDArray[i]);
            const picSnap = await getDoc(pic);
            const mypath = picSnap.data().image;
            var strpath = mypath;
            var result = strpath.substring(8, strpath.length-1);
            const newmypath = result;
            picPathArray.push(newmypath);
        }
        return picPathArray;
    }

    async function getPicUrlPosts(GlobalPicPathsPosts) {
        const imagesRef = ref(storage, "images");
        const globURLs = [];

        for (let i = 0; i <GlobalPicPathsPosts.length; i++) {
            const pathRef = ref(imagesRef,GlobalPicPathsPosts[i]);
            const downloadUrl = await getDownloadURL(pathRef)
                .catch((error) => {
                  });
            //console.log('Image URL: ', downloadUrl);
            globURLs.push(downloadUrl);
        }
        return globURLs;
    }

    async function doItAllPosts() {
        const docRef = doc(db, "users", userID);
        const picIDArray = await getPicIDPosts(docRef);
        //console.log("ARRAY length",picIDArray.length);
        if(picIDArray.length>0){
            
            const GlobalPicPathsPosts = await getPicPathPosts(picIDArray);
            //console.log("We here! - ", GlobalPicPathsPosts.length);
            const picURLs = await getPicUrlPosts(GlobalPicPathsPosts);
            if (!(picURLs.every(item => globalPostUrls.indexOf(item)>-1))) {
                setGlobalPostUrls(picURLs);
            }
            
        } // else say "no posts yet" or "create a post with the plus button"
    }

    // Get Follower/Following/Name Information to display / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / /
    const [followingCount, setFollowingCount] = useState(0);
    const [followerCount, setFollowerCount] = useState(0);
    const [firstName, setFirstName] = useState(username);

    async function getFollowingCount(docRef) {
        var count = 0;
        const images = await getDocs(collection(docRef, "following"));
        images.forEach((doc) => {
            //console.log(doc.id, " => ", doc.data());
            count++;
        });
        setFollowingCount(count);
    }

    async function getFollowerCount(docRef) {
        var count = 0;
        const images = await getDocs(collection(docRef, "followers"));
        images.forEach((doc) => {
            count++;
        });
        setFollowerCount(count);
    }

    async function getFirstName(docRef) {
        const docSnap = await getDoc(docRef);
        setFirstName(docSnap.data().firstName);
    }

    // Printing to console / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / /
    const printData = () => {
        console.log("Profile Screen username: ", username, "profile screen userID: ", userID, "profile screen picID: ", picID);
    }
    //printData();

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.profileName}>{username}</Text>

            <View style={styles.profileContainer}>
                <View style={styles.profileImage}>
                    <Image source={{uri: globalUrl}} style={styles.image}/>
                </View>
                <View style={{flexDirection: 'row', marg: 'center'}}>
                    <View style={{alignItems: 'center'}}>
                        <Text style={styles.number}>
                            11
                        </Text>
                        <Text style={styles.numberDescription}>
                            Trips
                        </Text>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <Text style={styles.number}>
                            {globalPostUrls.length}
                        </Text>
                        <Text style={styles.numberDescription}>
                            Posts
                        </Text>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <Text style={styles.number}>
                            {followerCount}
                        </Text>
                        <Text style={styles.numberDescription}>
                            Followers
                        </Text>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <Text style={styles.number}>
                            {followingCount}
                        </Text>
                        <Text style={styles.numberDescription}>
                            Following
                        </Text>
                    </View>
                </View>
            </View>

            <View style={styles.profileInfo}>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.textName}>{firstName}</Text>
                    <Text style={{color: '#3A6496', fontSize: 18, textAlignVertical: 'bottom'}}>31</Text>
                </View>
                <Text style={{fontSize: 13, color: '#3A6496', opacity: .7}}>Maryland</Text>  
            </View>
            <TouchableOpacity style={styles.editProfile}
            onPress={() => followText=='Follow' ? followAccount() : unFollowAccount()}>
                <Text style={{color: 'white'}}>{followText}</Text>
            </TouchableOpacity>

            <View style={styles.travelBuddies}>
                <Text style={{fontSize: 13, color: '#3A6496'}}>Travel Buddies</Text>
                <View style={{flexDirection: 'row', alignItems: 'center', paddingVertical: 10, justifyContent: 'space-evenly'}}>
                    <View style={{alignItems: 'center'}}>
                        <Image source={require("../assets/travel_buddy1.jpg")} style={styles.travelBuddyImage}/>
                        <Text style={{color: '#3A6496', fontSize: 12, fontWeight: 'bold'}}>john_travels</Text>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <Image source={require("../assets/travel_buddy2.jpg")} style={styles.travelBuddyImage}/>
                        <Text style={{color: '#3A6496', fontSize: 12, fontWeight: 'bold'}}>em_adventures</Text>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <Image source={require("../assets/travel_buddy3.jpg")} style={styles.travelBuddyImage}/>
                        <Text style={{color: '#3A6496', fontSize: 12, fontWeight: 'bold'}}>denise_012</Text>
                    </View>
                </View>
            </View>

            <View>
                <View style={{flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10}}>
                    <TouchableOpacity style={{opacity: .5}}>
                        <Feather name='map-pin' size={30} color='#3A6496'></Feather>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Feather name='image' size={30} color='#3A6496'></Feather>
                    </TouchableOpacity>
                </View>
            </View>
            {/* Photo Grid View */}
            <View style={{flex: 1, marginBottom: 60}}>
                <PhotoGrid PostUrls={globalPostUrls}/>
            </View>
            <SafeAreaView style={styles.footer}>
                <NavigationBar toNavBarUsername={realUsername} toNavBarUserID={realUserID}/>
            </SafeAreaView>
        </SafeAreaView>
    )
}

export default OtherProfileScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        padding: 1,
        //justifyContent: 'center',
        //alignItems: 'center',
    },
    footer: {
        position:'absolute',
        bottom: 0,
        alignItems: 'center'
    },
    image: {
        flex: 1,
        width: undefined,
        height: undefined,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 100,
        overflow: 'hidden'
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30,
        marginLeft: 20,
        marginRight: 10,
        justifyContent: 'space-between'
    },
    number: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#3A6496',
    },
    numberDescription: {
        fontSize: 12,
        color: '#3A6496',
        paddingHorizontal: 12
    },
    profileName: {
        fontSize: 20,
        color: '#F8C98A',
        textAlign: 'center',
        paddingBottom: 1
    },
    textName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#3A6496',
        marginRight: 5
    },
    profileInfo: {
        marginTop: 15,
        marginLeft: 25,
        marginRight: 25
    },
    editProfile: {
        marginVertical: 10,
        alignItems: 'center',
        padding: 6,
        marginHorizontal: 10,
        backgroundColor: '#D28A8E',
        borderRadius: 5
    },
    travelBuddies: {
        marginHorizontal: 10,
        padding: 1
    },
    travelBuddyImage: {
        width: 50,
        height: 50,
        borderRadius: 50,
        overflow: 'hidden'
    }
})