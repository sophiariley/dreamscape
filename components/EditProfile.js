import { FontAwesome, Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';

export default function EditProfile({onClose}) {
  const [profilePicture, setProfilePicture] = useState(null);

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
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <TouchableOpacity onPress={onClose} style={styles.buttonContainer}>
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
          <Text style={styles.inputLabel}>Name</Text>
          <TextInput style={styles.input} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Username</Text>
          <TextInput style={styles.input} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Birthday</Text>
          <TextInput style={styles.input} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Location</Text>
          <TextInput style={styles.input} />
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
    buttonContainer: {
        justifyContent: 'center',
        width: 50,
        height: 50,
        position: 'absolute',
        left: 0,
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
