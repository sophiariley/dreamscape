import React from "react";
import { getStorage, ref, getDownloadURL, } from "firebase/storage"
import { db, storage } from "../firebase-config";
import {View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, FlatList } from "react-native";

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

const [picIDArray, updatePicIDArray] = useState([]);

let {width: screenWidth, height: screenHeight} = Dimensions.get('window');

export default function photoGrid({userID}) {

    async function getPicID(docRef) {
        const images = await getDocs(collection(docRef, "userPosts"));
        images.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            //setPicID(doc.id);
            updatePicIDArray( arr => [...arr, doc.id]);
            setCount(10);
        });
    }
    
    async function getPicPath(userID) {
        const docRef = doc(db, "users", userID);
        const docSnap = await getDoc(docRef);
        //console.log("GetPicPath PICID: ", picID);

        picIDArray.forEach(async (picID) => {
            const pic = doc(docRef, "images", picID);
            const picSnap = await getDoc(pic);
            const mypath = picSnap.data().image;
            //take parenthases away
            var strpath = mypath;
            var result = strpath.substring(8, strpath.length-1); //changes 1 to 8 to takeout images/
            const newmypath = result;
            console.log("getPicPath: ", newmypath);
            setGlobalPicPath(newmypath);
        });
    }

    //url of pic in firebase store - originally set to default profile pic
    const [picID, setPicID] = useState(''); //2Zz3JGFco2dG0n6CMsE1
    const [globalUrl, setGlobalUrl] = useState('https://firebasestorage.googleapis.com/v0/b/dreamscapeofficial-ef560.appspot.com/o/images%2Fdefault.jpg?alt=media&token=b1a61225-6f54-40e1-9cda-0493dc02c6c5');
    const [globalPicPath, setGlobalPicPath] = useState('default.jpg');
    const [count, setCount] = useState(0);
    

    async function getPicUrl(picpath) {
        //console.log("is there quotes? ", picpath);
        const imagesRef = ref(storage, "images");
        const pathRef = ref(imagesRef,picpath);
        const downloadUrl = await getDownloadURL(pathRef)
            .catch((error) => {
              });
        console.log('Image URL: ', downloadUrl);
        setGlobalUrl(downloadUrl);
    }

    async function doItAll() {
        const docRef = doc(db, "users", userID);
        await getPicID(docRef);
        console.log("User ID: ", userID);
        if(count>0){
            await getPicPath(userID); 
            console.log("We here! - ", globalPicPath);
            await getPicUrl(globalPicPath);
        } // else say no posts yet
    }

    doItAll();

    return (
    <View>
        <FlatList 
            data={urlArray}
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