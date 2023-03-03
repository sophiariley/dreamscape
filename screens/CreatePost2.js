import React, {useState} from "react";
import {StyleSheet, Text, TextInput, View, KeyboardAvoidingView, TouchableOpacity, Pressable, Image} from "react-native";
import {Ionicons} from 'react-native-vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, uploadBytesResumable } from "firebase/storage"
import { db, storage } from "../firebase-config";
import { collection, query, where, onSnapshot, getDocs, getDoc, getDocuments, doc, snapshotEqual, getCountFromServer } from "firebase/firestore";


const CreatePost2 = ({navigation, route}) => {

    const username = route.params.username;
    const userID = route.params.userID;

    const [caption, setCaption] = useState(' ');
    const [location, setLocation] = useState(' ');

    const [image, setImage] = useState(null);

    const metadata = {
        contentType: 'image/jpeg'
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) { // cancelled
            setImage(result.assets[0].uri);
            //call method to add pic to storage and firestore here
            const uri = result.assets[0].uri;
            console.log("upload uri: ", uri);
            const picname = uri.substring(uri.lastIndexOf('/') + 1);
            const file = uri.substring(7);
            console.log('File: ', file);
            //const blob = await result.blob();
            uploadPic(file, picname);
        }
    };

    function uploadPic(image, name) {
        const storageRef = ref(storage, 'images/' + name);
        uploadBytes(storageRef, image, metadata);
    }

    return (
        <View style={styles.container}>
            
            <View style={styles.photoContainer}>
                {image && <Image source={{ uri: image }} style={{ width: 370, height: 320 }} />}
            </View>
            
            <View style={styles.chooseImageButtonContainer}>
                <Pressable onPress={pickImage}>
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
                    onPress={() => navigation.navigate('Home', {
                        username: username,
                        userID: userID,
                    })}>
                    <Text style={styles.postText}>Post</Text>
                </TouchableOpacity>
            
            </View>
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
        bottom: 15
    },
    photoContainer: {
        backgroundColor: '#F6F6F6',
        backgroundOpacity: .8,
        alignSelf: 'center',
        width: '90%',
        height: '50%',
        borderRadius: 5,
        top: -50
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
        width: '30%',
        height: '5%',
        flex: 1,
        alignSelf: 'flex-end',
        position: 'absolute',
        bottom: 40,
        right: 20
    },
    postButton: {
        backgroundColor: '#D28A8E', // pink color
        width: '100%',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        position: 'absolute'
    },
    postText: {
        fontSize: 20,
        color: '#F6F6F6'
    },
    location: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 30,
        paddingTop: 20,
        position: 'absolute',
        bottom: -10,
        alignSelf: "flex-start",
        left: 10
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
        bottom: 30
    }
})