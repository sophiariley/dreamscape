import React, { useState} from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal} from "react-native";
import NavigationBar from "../components/navigationBar";
import { Feather } from 'react-native-vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";
import PhotoGrid from "../components/photoGrid";
import { getStorage, ref, getDownloadURL, } from "firebase/storage"
import { db, storage } from "../firebase-config";
import { collection, query, where, onSnapshot, getDocs, getDoc, addDoc, doc, deleteDoc, getCountFromServer } from "firebase/firestore";
import Locations from '../components/Locations';

const OtherProfileScreen = ({route, navigation}) => {

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
        querySnapshot.forEach(async (docu) => {
            //This deleted the account from users collection -----------------------------
            //await deleteDoc(userRef, 'following', doc.id);
            const docRef = doc(userRef, 'following', docu.id);
            await deleteDoc(docRef);
        });
        const otherUserRef = doc(db, "users", userID);
        const q2 = query(collection(otherUserRef, "followers"), where("userID", "==", realUserID));
        const querySnapshot2 = await getDocs(q2);
        querySnapshot2.forEach(async (docu) => {
            //await deleteDoc(otherUserRef, 'followers', doc.id);
            const docRef = doc(otherUserRef, 'followers', docu.id);
            await deleteDoc(docRef);
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
        setGlobalPicPath(mypath);
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
        getLocation(docRef);
        getTripCount(docRef);
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
            console.log("myPaTH", mypath);
            //console.log("------------ THIS IS WHAT I WANT TO LOOK AT: ", mypath);
            //var strpath = mypath;
            //var result = strpath.substring(8, strpath.length-1);
            //const newmypath = result;
            //picPathArray.push(newmypath);
            picPathArray.push(mypath)
        }
        return picPathArray;
    }

    async function getPicUrlPosts(GlobalPicPathsPosts, picIDArray) {
        const imagesRef = ref(storage, "images");
        const globURLs = [];

        for (let i = 0; i <GlobalPicPathsPosts.length; i++) {
            const pathRef = ref(imagesRef,GlobalPicPathsPosts[i]);
            const downloadUrl = await getDownloadURL(pathRef)
                .catch((error) => {
                  });
            globURLs.push({url: downloadUrl, postID: picIDArray[i]});
        }

        return globURLs;
    }

    async function doItAllPosts() {
        const docRef = doc(db, "users", userID);
        const picIDArray = await getPicIDPosts(docRef);
        if(picIDArray.length>0){

            const GlobalPicPathsPosts = await getPicPathPosts(picIDArray);
            for (let i = 0; i <picIDArray.length; i++) {
                console.log(picIDArray[i]);
            }
            const picURLs = await getPicUrlPosts(GlobalPicPathsPosts, picIDArray);
            for(let j = 0; j < picURLs.length; j++) {

                console.log(picURLs[j].url, " HERO TO ZERO ", picURLs[j].postID);
            }
            if (!(JSON.stringify(picURLs) == JSON.stringify(globalPostUrls))) {
                setGlobalPostUrls(picURLs);
                //console.log(!(picURLs.every(item => globalPostUrls.indexOf(item.url)>-1)));
            }

        } // else say "no posts yet" or "create a post with the plus button"
    }

    // Get Follower/Following/Name Information to display / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / /
    const [followingCount, setFollowingCount] = useState(0);
    const [followerCount, setFollowerCount] = useState(0);
    const [tripCount, setTripCount] = useState(0);
    const [firstName, setFirstName] = useState(username);
    const [location, setLocation] = useState('Set Your Location');

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

    async function getTripCount(docRef) {
        var count = 0;
        const trips = await getDocs(collection(docRef, "trips"));
        trips.forEach((doc) => {
            count++;
        })
        setTripCount(count);
    }

    async function getFirstName(docRef) {
        const docSnap = await getDoc(docRef);
        setFirstName(docSnap.data().firstName);
    }

    async function getLocation(docRef) {
        const docSnap = await getDoc(docRef);
        if(docSnap.data().location) {
            setLocation(docSnap.data().location);
        }
    }

    // Printing to console / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / /
    const printData = () => {
        console.log("Profile Screen username: ", username, "profile screen userID: ", userID, "profile screen picID: ", picID);
    }
    //printData();

    // State variables
    const [showPhotoGrid, setShowPhotoGrid] = useState(true);
    const [activeButton, setActiveButton] = useState('Photos');

    // Event handlers for switching between Photos and Locations views
    const handleLocationsPress = () => {
        setShowPhotoGrid(false);
        setActiveButton('Locations');
    }
        const handlePhotosPress = () => {
        setShowPhotoGrid(true);
        setActiveButton('Photos');
    }
    return (
        <SafeAreaView style={styles.container}>
            {/* Display username */}
            <Text style={styles.profileName}>{username}</Text>

            {/* Display user profile information */}
            <View style={styles.profileContainer}>
                <View style={styles.profileImage}>
                    <Image source={{uri: globalUrl}} style={styles.image}/>
                </View>
                <View style={{flexDirection: 'row', marg: 'center'}}>
                    <View style={{alignItems: 'center'}}>
                        <Text style={styles.number}>
                            {tripCount}
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

            {/* Display user profile name and location */}
            <View style={styles.profileInfo}>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.textName}>{firstName}</Text>
                </View>
                <Text style={{fontSize: 13, color: '#3A6496', opacity: .7}}>{location}</Text>  
            </View>

            {/* Display "Follow" or "Unfollow" button */}
            <TouchableOpacity style={styles.editProfile}
            onPress={() => followText=='Follow' ? followAccount() : unFollowAccount()}>
                <Text style={{color: 'white'}}>{followText}</Text>
            </TouchableOpacity>
            <View>
                <View style={{flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10}}>
                    <TouchableOpacity style={{opacity: activeButton === 'Locations' ? 1 : 0.5, alignItems: 'center'}} onPress={handleLocationsPress}>
                        <Feather name='map-pin' size={30} color='#3A6496'></Feather>
                        <Text style={{color: '#3A6496', fontSize: 12}}>Locations</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{opacity: activeButton === 'Photos' ? 1 : 0.5,alignItems: 'center'}} onPress={handlePhotosPress}>
                        <Feather name='image' size={30} color='#3A6496'></Feather>
                        <Text style={{color: '#3A6496', fontSize: 12}}>Photos</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* Photo Grid View */}
            {showPhotoGrid ? (
                <View style={{ flex: 1, marginBottom: 60 }}>
                    <PhotoGrid postUrls={globalPostUrls} 
                               posterID={userID} 
                               userID={realUserID} 
                               posterPic={globalUrl}
                               username={realUsername}
                               navigation={navigation} 
                    />
                </View>
            ) : (
                <Locations />
            )}
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