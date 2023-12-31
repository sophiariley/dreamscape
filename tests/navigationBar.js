// The navigation bar

import React, {useState} from "react";
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
// import {FontAwesome5, Entypo, Foundation} from 'react-native-vector-icons';
import {useNavigation} from '@react-navigation/core'

export default function NavigationBar({toNavBarUsername, toNavBarUserID, navigation}) {
    const username = toNavBarUsername;
    const userID = toNavBarUserID;
    const printData = () => {
        console.log("NavBar username: ", username, " Nav Bar userID: ", userID);
    }
    printData();
    // const navigation = useNavigation();

    

    return (
        <View style={styles.container}>
            <View/>
                {/* The home button, which navigates to HomeScreen */}
                <TouchableOpacity style={styles.button}
                onPress={() =>  navigation.navigate('Home', {
                    username: username,
                    userID: userID,
                    show: false,
                })}>
                    {/* <Entypo name='home' size={40} color='#3A6496'/> */}
                </TouchableOpacity>

                {/* The explore button, which navigates to ExploreScreen */}
                <TouchableOpacity style={styles.button}
                     onPress={() =>  navigation.navigate('Explore', {
                        username: username,
                        userID: userID,
                    })}>
                    {/* <Foundation name='magnifying-glass' size={40} color='#3A6496'/> */}
                </TouchableOpacity>

                
                {/* The new post button, which navigates to CreatePost2 */}
                <TouchableOpacity style={styles.button}
                    onPress={() => navigation.navigate('Create Post', {
                        username: username,
                        userID: userID,
                    })}>
                    {/* <FontAwesome5 name='plus' size={40} color='#3A6496'/> */}
                </TouchableOpacity>

                {/* The trips button, which navigates to Trips */}
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Trips', {
                        username: username,
                        userID: userID,
                    })}>
                    {/* <FontAwesome5 name='calendar-alt' size={40} color='#3A6496'/> */}
                </TouchableOpacity>

                {/* The profile button, which navigates to ProfileScreen */}
                <TouchableOpacity style={styles.button}
                onPress={() =>  navigation.navigate('Profile', {
                    username: username,
                    userID: userID,
                })}>
                    {/* <FontAwesome5 name='user-alt' size={40} color='#3A6496'/> */}
                </TouchableOpacity>
                <Text>{}</Text>
            <View/>
        </View>
    )
}

const styles = StyleSheet.create({
    // The styling for the container (i.e. the gray bar)
    container: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignContent: 'center',
        backgroundColor: '#D9D9D9',
        width: '100%'
    },
    // The styling for the icons used in the nav bar
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