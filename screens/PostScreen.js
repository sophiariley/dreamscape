import React, {useState} from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, ScrollView, SafeAreaView } from "react-native";
import NavigationBar from "../components/navigationBar";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { db, storage } from "../firebase-config";

import { getStorage, ref, getDownloadURL, } from "firebase/storage"
import { collection, query, where, onSnapshot, getDocs, getDoc, getDocuments, doc, snapshotEqual, getCountFromServer } from "firebase/firestore";

const PostScreen = ({navigation, route}) => {
    const [isLiked, setIsLiked] = useState(false);

    const handleLikePress = () => {
        setIsLiked(prevIsLiked => !prevIsLiked);
    };

    // Getting post information from database / / / / / / / / / / / / / / / / / / /
    
    //const [picID, setPicID] = useState(''); //2Zz3JGFco2dG0n6CMsE1
    const [globalUrl, setGlobalUrl] = useState('https://firebasestorage.googleapis.com/v0/b/dreamscapeofficial-ef560.appspot.com/o/images%2Fdefault.jpg?alt=media&token=b1a61225-6f54-40e1-9cda-0493dc02c6c5');
    const [globalPicPath, setGlobalPicPath] = useState('default.jpg');
    const [count, setCount] = useState(0);

    // PostID and UserID of poster
    const postID = route.params.postID;
    const userID = route.params.userID;
    
    async function doItAll() {
        const docRef = doc(db, "users", userID);
        try {
            await getPostInfo(docRef);
        } catch (error) {
            console.log(error);
        }
    }

    async function getPostInfo(docRef) {
        const dref = doc(docRef, "userPosts", postID);
        const docSnap = await getDoc(dref);
        if(docSnap.exists()) {
            const mypath = docSnap.data().image;
            
            const imagesRef = ref(storage, "images");
            const pathRef = ref(imagesRef,mypath);
                const downloadUrl = await getDownloadURL(pathRef)
                    .catch((error) => {
                      });
            console.log(downloadUrl);
            setGlobalUrl(downloadUrl);
        } else {
            console.log("Document does not exist")
        }
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


    doItAll();

    // Return / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / /
    return (
        <SafeAreaView style={styles.container}>
            <View style={{marginTop:20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',  borderBottomWidth: 1,
                borderColor: '#f0f0f0'}}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.buttonContainer}>
                        <Ionicons name='chevron-back' size={30} />
                </TouchableOpacity>
                <Text style={styles.header}>Post</Text>
                <View style={{ width: 30 }} />
            </View>
            <ScrollView>
                {/*Profile container*/}
                <View style={styles.accountContainer}>
                    <View style={styles.profileImage}>
                        <Image style={styles.image}
                            source={require('../assets/profile_photo.jpg')}
                        />
                    </View>
                    <View style={{marginLeft: 7}}>
                        <Text style={styles.profileName}>john_travels</Text>
                        <Text style={styles.location}>Location</Text>
                    </View>
                </View>
                {/*image*/}
                <View style={{width: Dimensions.get('screen').width}}> 
                    <Image style={styles.post}
                    source={{uri: globalUrl}}
                    /> 
                </View>
                {/*Like button*/}
                <View style={{flexDirection: 'row', margin: 5, alignItems: 'center', flex: 2, justifyContent: 'space-between'}}>
                    <TouchableOpacity onPress={handleLikePress}>
                        <FontAwesome name={isLiked ? 'heart' : 'heart-o'} size={35} color={isLiked ? 'red' : 'black'}style={{marginRight: 15,marginBottom:-5}}/>
                    </TouchableOpacity>
                    {/*Comment button*/}
                    <TouchableOpacity onPress={() => navigation.navigate('Comments')}>
                        <FontAwesome name='comment-o' size={35} style={{}}/>
                    </TouchableOpacity>
                </View>
                {/*Caption*/}
                <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
                        <Text style={[styles.profileName, {marginLeft: 5, marginTop: 5, marginRight: 5}]}>john_travels</Text>
                        <Text style={styles.caption}>Caption</Text>
                </View> 
                {/*View comments button*/}    
                <TouchableOpacity onPress={() => navigation.navigate('Comments')}>
                    <Text style={{fontWeight: '200', marginLeft: 5, marginTop: 15, alignSelf: 'center'}}>View comments</Text>
                </TouchableOpacity>
                {/*Date posted*/}
                <Text style={{fontWeight: '200', fontSize: 12,textAlign: 'right', margin: 5}}>Posted on ...</Text>
            </ScrollView>
        </SafeAreaView>
    )
}

export default PostScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        padding: 1,
        justifyContent: 'flex-start',
    },
    header: {
        fontSize: 20,
        marginBottom: 10,
        marginTop: 10,
        textAlign: 'center',
        flex: 1,
    },
    accountContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        
        marginTop: 10,
        marginLeft: 15,
        marginRight: 10,
        marginBottom: 10
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 100,
        overflow: 'hidden'
    },
    post: {
        width: '100%',
        height: undefined,
        alignItems: 'center',
        aspectRatio: 1,
    },
    profileName: {
        color: '#3A6496', 
        fontSize: 13, 
        fontWeight: 'bold',
    },
    location: {
        color: '#3A6496', 
        fontSize: 11, 
    },
    image: {
        flex: 1,
        width: undefined,
        height: undefined,
    },
    caption:
    {
        fontSize: 13,

    },
    footer: {
        position:'absolute',
        bottom: 0,
        alignItems: 'center'
    }
})