import React, {useState} from "react";
import {StyleSheet, Text, TextInput, View, KeyboardAvoidingView, TouchableOpacity, Dimensions, ScrollView, Pressable, Image} from "react-native";
import {Ionicons} from 'react-native-vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { db, storage } from "../firebase-config";
import { collection, addDoc, query, where, onSnapshot, getDocs, getDoc, getDocuments, doc, snapshotEqual, getCountFromServer } from "firebase/firestore";


const CreatePost2 = ({navigation, route}) => {

    const username = route.params.username;
    const userID = route.params.userID;

    const [caption, setCaption] = useState('');
    const [location, setLocation] = useState('');

    const [image, setImage] = useState(null);
    const [name, setName] = useState('');
    const [imageURL, setImageURL] = useState('');

    const metadata = {
        contentType: 'image/jpeg'
    };

    const handleImage = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
        if (permissionResult.granted === false) {
          alert('Permission to access camera roll is required!');
          return;
        }
    
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })
        if (pickerResult.canceled === true) {
          return;
        }
        console.log(pickerResult.assets[0].uri);
        setImage(pickerResult.assets[0].uri);
    
        const uri = pickerResult.assets[0].uri;
        console.log("---------uri ", uri);
        const picname = uri.substring(uri.lastIndexOf('/') + 1);
        setName(picname);
      };

    async function uploadImageAsync(uri) {
        const blob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = function() {
            resolve(xhr.response);
          };
          xhr.onerror = function(e) {
            console.log(e);
            reject(new TypeError('Network request failed'));
          };
          xhr.responseType = 'blob';
          xhr.open('GET', uri, true);
          xhr.send(null);
        });
      
        const storageRef = ref(storage, 'images/' + name);
        const snapshot = await uploadBytes(storageRef, blob, metadata);
      
        // We're done with the blob, close and release it
        blob.close();
      
        //const fileRef = ref(storage, 'images/' + name);
        const snapShotURL =  await getDownloadURL(storageRef)
        .catch((error) => {

        });
        addToFirestore(name, caption, location);
        setImageURL(snapShotURL);
        console.log("UpDown URL: ", snapShotURL);
      }

    async function addToFirestore(image, caption, location) {
        const userRef = doc(db, "users", userID);
        const docRef = await addDoc(collection(userRef, "userPosts"), {image, caption, location});
    }

    const windowHeight = Dimensions.get('window').height;
    const windowWidth = Dimensions.get('window').width;

    return (
        <View style={styles.container}>
            <ScrollView style={{flex:1}}>
                <View style={{width:windowWidth, height:windowHeight }}>
            
                    <View style={styles.photoContainer}>
                        {image && <Image source={{ uri: image }} style={{ width: "100%", height: "100%" }} resizeMode="cover" />}
                        {/* {/* {video && <Video source={{ uri: video }} style={{ width: "100%", height: "100%" }} resizeMode="cover" />} */}
                    </View> 
                    
                    <View style={styles.chooseImageButtonContainer}>
                        <Pressable onPress={handleImage}>
                            <Text style={styles.chooseImageText}>Choose image</Text>
                        </Pressable>
                    </View>
                    
                    <KeyboardAvoidingView style={styles.captionContainer}>
                        <TextInput
                            style={styles.captionText} 
                            placeholder="Write caption..."
                            value={caption}
                            onChangeText={text => setCaption(text)}
                        />
                    </KeyboardAvoidingView>

                    <View style={styles.footer}>
                        <View style={styles.location}>
                            <Ionicons style={styles.globe} name='globe-outline' size={30} color='#3A6496'/>
                            <TextInput 
                                style={styles.locationText}
                                placeholder= 'Add Location'
                                value={location}
                                placeholderTextColor="#3A6496"
                                onChangeText={text => setLocation(text)}
                            />
                        </View>
                            
                        <View style={styles.postButtonContainer}>
                            <TouchableOpacity 
                                style={styles.postButton}
                                onPress={() => {uploadImageAsync(image); navigation.navigate('Home', {
                                    username: username,
                                    userID: userID,
                                })}}>
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

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center', 
        flexDirection: 'column',
    },
    captionContainer: {
        backgroundColor: '#F6F6F6',
        opacity: .8,
        alignSelf: 'center',
        width: '90%',
        height: '20%',
        borderRadius: 5,
        bottom: -20
    },
    photoContainer: {
        backgroundColor: '#F6F6F6',
        backgroundOpacity: .8,
        alignSelf: 'center',
        width: '90%',
        height: '50%',
        borderRadius: 5,
        top: 10
    },
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
    postButtonContainer: {
        backgroundColor: '#D28A8E',
        width: '30%',
        height: '27%',
        alignSelf: 'flex-end',
        right: 20,
        borderRadius: 5,
        bottom: -30
    },
    postText: {
        fontSize: 20,
        color: '#F6F6F6',
        alignSelf: 'center',
        padding: 12
        // color: 'black'
    },
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
    globe: {
        padding: 10,
    },
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
    chooseImageButtonContainer: {
        backgroundColor: '#3A6496',
        width: '40%',
        height: '5%',
        alignSelf: 'center',
        borderRadius: 5,
        bottom: -15
    },
    // the styling of the footer, used for the navigation bar
    footer: {
        // position: 'absolute',
        bottom: 0,
        alignItems:'center'
    }
})