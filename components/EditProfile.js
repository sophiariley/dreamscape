import { FontAwesome, Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { db, storage } from "../firebase-config";
import { collection, addDoc, setDoc, updateDoc, getDocs, doc, getDoc } from "firebase/firestore";

export default function EditProfile({onSave, onCancel, myuserID}) {
  const userID = myuserID;
  const [profilePicture, setProfilePicture] = useState(null);
  const [picName, setPicName] = useState('');
  const [profilePicExists, setProfilePicExists] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newLocation, setNewLocation] = useState('');

  const metadata = {
    contentType: 'image/jpeg'
};

  const handleProfilePicturePress = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.canceled === true) {
      return;
    }
    console.log(pickerResult.assets[0].uri);
    setProfilePicture(pickerResult.assets[0].uri);

    const uri = pickerResult.assets[0].uri;
    console.log("---------uri ", uri);
    const picname = uri.substring(uri.lastIndexOf('/') + 1);
    setPicName(picname);
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
  
    const storageRef = ref(storage, 'images/' + picName);
    const snapshot = await uploadBytes(storageRef, blob, metadata);
  
    // We're done with the blob, close and release it
    blob.close();
  
    //const fileRef = ref(storage, 'images/' + name);
    const snapShotURL =  await getDownloadURL(storageRef)
    .catch((error) => {

    });
    addToFirestore(picName);
    //setImageURL(snapShotURL);
    //console.log("UpDown URL: ", snapShotURL);
  }

  async function addToFirestore(url) {
    var count = 0;
    const userRef = doc(db, "users", userID);
    //console.log("------------userid ", userID);
    //const q = query(collection(userRef, "images"), where(url), "!=", '');
    const q = collection(userRef, "images");
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((docu) => {
      count = count +1;
    });
    if(count == 0) {
      setProfilePicExists(true);
      const newDoc = await addDoc(collection(userRef, "images"), {url});
    }
    else {
      querySnapshot.forEach((docu) => {
        setProfilePicExists(true);
        const docRef = setDoc(doc(userRef, "images", docu.id), {url});
    });
    }
}

async function changeUsername(newUsername) {
  const userRef = doc(db, "users", userID);
  await updateDoc(userRef, {
    username: newUsername
  });
}

/*email: docSnap.data().email,
    firstName: docSnap.data().firstName,
    lastName: docSnap.data().lastName,
    password: docSnap.data().password,
    username: docSnap.data().username*/
async function changeLocation(newLocation) {
  const userRef = doc(db, "users", userID);
  const docSnap = await getDoc(userRef);
  if(docSnap.data().location){
    await updateDoc(userRef, {
      location: newLocation
    });
  }
  else {
    await setDoc(userRef, {location: newLocation}, { merge: true });
  }
}

function updateThings(profilePic, newUsername, newLocation) {
  if(profilePic) {
    uploadImageAsync(profilePic);
  }
  if(newUsername!='') {
    changeUsername(newUsername);
  }
  if(newLocation!='') {
    changeLocation(newLocation);
  }
  onSave(newUsername);
}
 const handleLocationsPress = () => {
        setShowPhotoGrid(false);
        setActiveButton('Locations');
    }
    const handlePhotosPress = () => {
        setShowPhotoGrid(true);
        setActiveButton('Photos');
    }

  //Save button worked for profile pic as onPress={ () => { profilePicture ? (uploadImageAsync(profilePicture), onSave) : onCancel}} style={styles.saveContainer}
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <TouchableOpacity onPress={onCancel} style={styles.cancelContainer}>
          <Text style={styles.buttonText}>Exit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={ () => updateThings(profilePicture, newUsername, newLocation) } style={styles.saveContainer}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        <Text style={styles.text}>Edit Profile</Text>
      </View>
      <ScrollView>
        <View style={styles.inputContainer}>
            <Text style={styles.profilePicturePlaceholderText}>Profile picture</Text>
            <TouchableOpacity style={styles.profilePictureContainer} onPress={handleProfilePicturePress}>
            {profilePicture ? (
                <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
            ) : (
                <View style={styles.inputLabel}>
                <Ionicons name="camera-outline" size={30} color="#CCCCCC" />
                </View>
            )}
            </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Username</Text>
          <TextInput 
          style={styles.input}
          placeholder=""
          value={newUsername}
          onChangeText={text => setNewUsername(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Location</Text>
          <TextInput 
          style={styles.input}
          placeholder=""
          value={newLocation}
          onChangeText={text => setNewLocation(text)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    topContainer: {
        height: 50,
        flexDirection: 'row-reverse',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        width: '100%',
        borderBottomWidth: 1,
        borderColor: '#CCCCCC'
    },
    text: { 
        alignSelf: 'center',
        fontSize: 17,
        color: 'black',
    },
    saveContainer: {
        justifyContent: 'center',
        width: 50,
        height: 50,
        position: 'absolute',
        left: 0,
        top: 0,
    },
    cancelContainer: {
        justifyContent: 'center',
        width: 50,
        height: 50,
        position: 'absolute',
        right: 10,
        top: 0,
    },
    profileName: {
        color: '#3A6496', 
        fontSize: 14, 
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems:'center',
        backgroundColor: '#f2f2f2',
        padding: 12,
        borderBottomWidth: 1, 
        borderBottomColor:'black',
        justifyContent: 'space-between',
    },
    input: {
        flex: 1,
        fontSize: 14,
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 5,
        marginRight: 10,
        marginLeft: 2,
    },
    inputLabel: {
        fontSize: 14,
        color: 'black',
        width: 80
    },
    profilePicture: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 50
    }
});
