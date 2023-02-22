import React, {useState} from "react";
import {View, StyleSheet, TouchableOpacity, Image, Text} from 'react-native';
import {FontAwesome5, Entypo, Foundation} from 'react-native-vector-icons';
import {useNavigation} from '@react-navigation/core'
import * as ImagePicker from 'expo-image-picker';

export default function NavigationBar({toNavBarUsername, toNavBarUserID}) {
    const username = toNavBarUsername;
    const userID = toNavBarUserID;
    const printData = () => {
        console.log("NavBar username: ", username, " Nav Bar userID: ", userID);
    }
    printData();
    const navigation = useNavigation();

    const [image, setImage] = useState(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
        setImage(result.assets[0].uri);
        }
    };

    return (
        <View style={styles.container}>
            <View/>
                {/* home button */}
                <TouchableOpacity style={styles.button}
                onPress={() =>  navigation.navigate('Home', {
                    username: username,
                    userID: userID,
                })}>
                    <Entypo name='home' size={40} color='#3A6496'/>
                </TouchableOpacity>

                {/* explore button */}
                <TouchableOpacity style={styles.button}
                     onPress={() =>  navigation.navigate('Explore', {
                        username: username,
                        userID: userID,
                    })}>
                    <Foundation name='magnifying-glass' size={40} color='#3A6496'/>
                </TouchableOpacity>

                
                {/* new post button */}
                <TouchableOpacity style={styles.button}
                    onPress={() => navigation.navigate('Create Post')}>
                    <FontAwesome5 name='plus' size={40} color='#3A6496'/>
                </TouchableOpacity>

                {/* trips button */}
                <TouchableOpacity style={styles.button}>
                    <FontAwesome5 name='calendar-alt' size={40} color='#3A6496'/>
                </TouchableOpacity>

                {/* profile button */}
                <TouchableOpacity style={styles.button}
                onPress={() =>  navigation.navigate('Profile', {
                    username: username,
                    userID: userID,
                })}>
                    <FontAwesome5 name='user-alt' size={40} color='#3A6496'/>
                </TouchableOpacity>
                <Text>{}</Text>
            <View/>
        </View>
    )
}

const styles = StyleSheet.create({
    // the styling for the container (i.e. the gray bar)
    container: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignContent: 'center',
        backgroundColor: '#D9D9D9',
        width: '100%'
    },
    // the styling for the icon buttons
    button: {
        width: 50,
        height: 50,
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 15,
        marginRight: 15,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

/*Icons can be found at https://oblador.github.io/react-native-vector-icons/ */