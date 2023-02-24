import React, { useState} from "react";
import { getStorage, ref, getDownloadURL, } from "firebase/storage"
import { db, storage } from "../firebase-config";
import {View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, FlatList } from "react-native";
import { collection, query, where, onSnapshot, getDocs, getDoc, getDocuments, doc, snapshotEqual } from "firebase/firestore";

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



let {width: screenWidth, height: screenHeight} = Dimensions.get('window');

export default function photoGrid({userID}) {

    async function getPicID(docRef) {
        const images = await getDocs(collection(docRef, "userPosts"));
        images.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            updatePicIDArray( arr => [...arr, doc.id]);
            setCount(10);
        });
    }
    
    async function getPicPath(userID) {
        const docRef = doc(db, "users", userID);
        const docSnap = await getDoc(docRef);

        picIDArray.forEach(async (picID) => {
            
            console.log("GetPicPath PICID: ", picID);
            const pic = doc(docRef, "images", picID);
            const picSnap = await getDoc(pic);
            const mypath = picSnap.data().image;
            //take parenthases away
            var strpath = mypath;
            var result = strpath.substring(8, strpath.length-1); //changes 1 to 8 to takeout images/
            const newmypath = result;
            console.log("getPicPath: ", newmypath);
            setGlobalPicPaths(arr => [...arr, newmypath]);
        });
    }

    //url of pic in firebase store - originally set to default profile pic
    //const [picID, setPicID] = useState(''); //2Zz3JGFco2dG0n6CMsE1
    //const [picIDArray, updatePicIDArray] = useState([]);
    const [picIDArray, updatePicIDArray] = useState([]);
    const [globalPicPaths, setGlobalPicPaths] = useState([]);
    const [globalUrls, setGlobalUrls] = useState([]);
   

    const [count, setCount] = useState(0);
    

    async function getPicUrl() {
        //console.log("is there quotes? ", picpath);
        const imagesRef = ref(storage, "images");
        globalPicPaths.forEach(async (picpath) => {
            const pathRef = ref(imagesRef,picpath);
            const downloadUrl = await getDownloadURL(pathRef)
                .catch((error) => {
                  });
            console.log('Image URL: ', downloadUrl);
            setGlobalUrls(arr => [...arr, downloadUrl]);
        });
    }

    async function doItAll() {
        const docRef = doc(db, "users", userID);
        await getPicID(docRef);
        console.log("User ID: ", userID);
        if(count>0){
            await getPicPath(userID); 
            console.log("We here! - ", globalPicPaths);
            await getPicUrl();
        } // else say "no posts yet" or "create a post with the plus button"
    }

    doItAll();

    return (
    <View>
        <FlatList 
            data={globalUrls}
            renderItem = {item => {
                return (
                    <View style={{flex: 1, marginBottom: 2}}>
                        <TouchableOpacity>
                        <Image 
                            source={item.item.url}
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