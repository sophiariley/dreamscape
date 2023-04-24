// The screen the user interacts with in order to create a post.
// Named CreatePost2 because there was originally another Create Post screen (CreatePost1) which no longer exists

import React, {useState} from "react";
import {StyleSheet, Text, TextInput, View, KeyboardAvoidingView, TouchableOpacity, Dimensions, ScrollView, Pressable, Image} from "react-native";
// import {Ionicons} from 'react-native-vector-icons';
// import * as ImagePicker from 'expo-image-picker';
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
// import { db, storage } from "../firebase-config";
// import { collection, addDoc, query, where, onSnapshot, getDocs, getDoc, getDocuments, doc, snapshotEqual, getCountFromServer } from "firebase/firestore";


const CreatePost2 = ({navigation, route}) => {

    // const username = route.params.username;
    // const userID = route.params.userID;

    const [caption, setCaption] = useState('');
    const [location, setLocation] = useState('');

    const [image, setImage] = useState(null);
    const [name, setName] = useState('');
    const [imageURL, setImageURL] = useState('');

    const metadata = {
        contentType: 'image/jpeg'
    };

    // const handleImage = async () => {
    //     let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    //     if (permissionResult.granted === false) {
    //       alert('Permission to access camera roll is required!');
    //       return;
    //     }
    
    //     let pickerResult = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.All,
    //         allowsEditing: true,
    //         aspect: [4, 3],
    //         quality: 1,
    //     })
    //     if (pickerResult.canceled === true) {
    //       return;
    //     }
    //     console.log(pickerResult.assets[0].uri);
    //     setImage(pickerResult.assets[0].uri);
    
    //     const uri = pickerResult.assets[0].uri;
    //     console.log("---------uri ", uri);
    //     const picname = uri.substring(uri.lastIndexOf('/') + 1);
    //     setName(picname);
    //   };

    // async function uploadImageAsync(uri) {
    //     const blob = await new Promise((resolve, reject) => {
    //       const xhr = new XMLHttpRequest();
    //       xhr.onload = function() {
    //         resolve(xhr.response);
    //       };
    //       xhr.onerror = function(e) {
    //         console.log(e);
    //         reject(new TypeError('Network request failed'));
    //       };
    //       xhr.responseType = 'blob';
    //       xhr.open('GET', uri, true);
    //       xhr.send(null);
    //     });
      
    //     const storageRef = ref(storage, 'images/' + name);
    //     const snapshot = await uploadBytes(storageRef, blob, metadata);
      
    //     // We're done with the blob, close and release it
    //     blob.close();
      
    //     //const fileRef = ref(storage, 'images/' + name);
    //     const snapShotURL =  await getDownloadURL(storageRef)
    //     .catch((error) => {

    //     });
    //     addToFirestore(name, caption, location);
    //     setImageURL(snapShotURL);
    //     console.log("UpDown URL: ", snapShotURL);
    //   }

    // async function addToFirestore(image, caption, location) {
    //     const userRef = doc(db, "users", userID);
    //     const docRef = await addDoc(collection(userRef, "userPosts"), {image, caption, location});
    // }

    const windowHeight = Dimensions.get('window').height;
    const windowWidth = Dimensions.get('window').width;

    return (
        <View style={styles.container}>
            <ScrollView style={{flex:1}}>
                <View style={{width:windowWidth, height:windowHeight }}>

                    {/* A container to hold the user's image */}
                    <View style={styles.photoContainer}>
                        {image && <Image source={{ uri: image }} style={{ width: "100%", height: "100%" }} resizeMode="cover" />}
                        {/* {/* {video && <Video source={{ uri: video }} style={{ width: "100%", height: "100%" }} resizeMode="cover" />} */}
                    </View> 
                    
                    {/* The "Choose image" button, which access the user's camera roll */}
                    <View style={styles.chooseImageButtonContainer}>
                        <Pressable
                        testID="chooseImageButton">
                        {/* <Pressable onPress={handleImage}> */}
                            <Text style={styles.chooseImageText}>Choose image</Text>
                        </Pressable>
                    </View>
                    
                    {/* The caption container, where the user can write a caption for their post */}
                    <KeyboardAvoidingView style={styles.captionContainer}>
                        <TextInput
                            testID="captionBox"
                            style={styles.captionText} 
                            placeholder="Write caption..."
                            value={caption}
                            onChangeText={text => setCaption(text)}
                        />
                    </KeyboardAvoidingView>

                    {/* The footer of the screen, which includes the area where the user can insert a location and the post button */}
                    <View style={styles.footer}>
                        <View style={styles.location}>
                            {/* <Ionicons style={styles.globe} name='globe-outline' size={30} color='#3A6496'/> */}
                            <TextInput 
                                testID="locationBox"
                                style={styles.locationText}
                                placeholder= 'Add Location'
                                value={location}
                                placeholderTextColor="#3A6496"
                                onChangeText={text => setLocation(text)}
                            />
                        </View>
                            
                        {/* The post button, which saves the user's post and navigates to HomeScreen */}
                        <View style={styles.postButtonContainer}>
                            <TouchableOpacity 
                                testID="postButton"
                                style={styles.postButton}
                                onPress={() => {navigation.navigate('Home', 
                                // {
                                //     username: username,
                                //     userID: userID,
                                // }
                                )}}>
                                    {/* onPress={() => {uploadImageAsync(image); navigation.navigate('Home', {
                                    username: username,
                                    userID: userID,
                                })}}> */}
                                <Text style={styles.postText}>Post</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default CreatePost2;

// The styles used for this screen
const styles = StyleSheet.create({
    // A general container for components
    container: {
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center', 
        flexDirection: 'column',
    },

    // A container for the caption
    captionContainer: {
        backgroundColor: '#F6F6F6',
        opacity: .8,
        alignSelf: 'center',
        width: '90%',
        height: '20%',
        borderRadius: 5,
        bottom: -20
    },

    // A container for the image
    photoContainer: {
        backgroundColor: '#F6F6F6',
        backgroundOpacity: .8,
        alignSelf: 'center',
        width: '90%',
        height: '50%',
        borderRadius: 5,
        top: 10
    },

    // The styling for the caption text
    captionText: {
        fontSize: 20,
        color: '#3A6496',
        opacity: .5,
        height: '20%',
        width: '80%',
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 10,
        paddingLeft: 10
    },

    // A container for the "Post" button
    postButtonContainer: {
        backgroundColor: '#D28A8E',
        width: '30%',
        height: '27%',
        alignSelf: 'flex-end',
        right: 20,
        borderRadius: 5,
        bottom: -30
    },

    // The styling for the "Post" text
    postText: {
        fontSize: 20,
        color: '#F6F6F6',
        alignSelf: 'center',
        padding: 12
    },

    // A container for the "Location" component
    location: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 30,
        paddingTop: 20,
        position: 'absolute',
        alignSelf: "flex-start",
        left: 10,
        top: 10
    },

    // The styling for the globe icon
    // globe: {
    //     padding: 10,
    // },

    // The syling for the "Location" text
    locationText: {
        color: '#3A6496',
        fontSize: 20,
        padding: 5,
    },
    chooseImageText: {
        color:'#F6F6F6',
        alignSelf: 'center',
        fontSize: 20,
        paddingTop: 2
    },

    // A container for the "Choose image" button
    chooseImageButtonContainer: {
        backgroundColor: '#3A6496',
        width: '40%',
        height: '5%',
        alignSelf: 'center',
        borderRadius: 5,
        bottom: -15
    },

    // The styling of the footer, which contains the "Location" component and "Post" button
    footer: {
        bottom: 0,
        alignItems:'center'
    }
})