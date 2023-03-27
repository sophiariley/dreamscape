import React, { useState} from "react";
import { getStorage, ref, getDownloadURL, } from "firebase/storage"
import { db, storage } from "../firebase-config";
import {View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, FlatList } from "react-native";
import { collection, query, where, onSnapshot, getDocs, getDoc, getDocuments, doc, snapshotEqual, getCountFromServer } from "firebase/firestore";
import PostScreen from '../screens/PostScreen';
// const Images = [
//     {url: require('../assets/posts/image1.jpg')},
//     {url: require('../assets/posts/image2.jpg')},
//     {url: require('../assets/posts/image3.jpg')},
//     {url: require('../assets/posts/image4.jpg')},
//     {url: require('../assets/posts/image5.jpg')},
//     {url: require('../assets/posts/image6.jpg')},
//     {url: require('../assets/posts/image7.jpg')},
//     {url: require('../assets/posts/image8.jpg')},
//     {url: require('../assets/posts/image9.jpg')},
//     {url: require('../assets/posts/image10.jpg')}
// ]

let { width: screenWidth, height: screenHeight } = Dimensions.get('window');


export default function photoGrid({postIDData, postUrls, userID, navigation}) {

    //const [PostUrls, setPostUrls] = postIDData;

    async function getURL(PostID) {
        console.log("POST ID: ", PostID);
        const docRef = doc(db, "users", userID);
        const pic = doc(docRef, "userPosts", PostID);
        const picSnap = await getDoc(pic);
        const mypath = picSnap.data().image;

        const imagesRef = ref(storage, "images");
        const pathRef = ref(imagesRef,mypath);
        const downloadUrl = await getDownloadURL(pathRef)
            .catch((error) => {
            });
                      
        return 'https://firebasestorage.googleapis.com/v0/b/dreamscapeofficial-ef560.appspot.com/o/images%2F2d6961e8-dafc-48bb-aa1c-56efe6e57b93.jpeg?alt=media&token=696456ea-1c7c-49ec-8135-1c947e17fe54';
    }
    async function runIt() {
       console.log(postUrls[0].url, " AAAAAAAAAAAAAAAAAAA");
    }
    runIt();
    // function getPostID() {
    //     console.log("HERE!");
    //     return "";
    // }
    return (
    <View>
        <FlatList 
            data={postUrls}
            renderItem = {item => {
                return (
                    <View style={{flex: 1, marginBottom: 2}}>
                        <TouchableOpacity onPress={() => navigation.navigate('PostScreen', {
                        postID: item.item.postID,
                        userID: userID,
                    })}>
                        <Image 
                            source={{uri: item.item.url
                            }}
                            style={{
                                height: screenWidth/3,
                                width: screenWidth/3 - 2
                            }}
                        />
                        </TouchableOpacity>
                    </View>
                )}
            }
            onLayout= { e => {
                const {width,height} = e.nativeEvent.layout
                console.log(height);
            }}
            numColumns={3}
            key={'_'}
        />
    </View>
  )
}
