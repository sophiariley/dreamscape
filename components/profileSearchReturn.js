import React, {useState} from "react";
import {View, StyleSheet, TouchableOpacity, Text, Image} from 'react-native';
import {Feather} from 'react-native-vector-icons';
import {useNavigation} from '@react-navigation/core'

const ProfileSearchReturn = ({}) => {
    return (
        <View style={styles.container}>
            <View style={styles.pfp}>
                <Image source={require("../assets/profile_photo.jpg")} style={styles.image}/>
            </View>
            <Text style={styles.usernameText}>Insert username here</Text>
            <Feather name='arrow-right' style={styles.arrow} size={20}/>
        </View>
    )
}

export default ProfileSearchReturn;

const styles = StyleSheet.create ({
    container: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-around',
        backgroundColor: 'rgba(217,217,217, 0.05)',
        width: '100%',
        height: '15%',
        borderColor: 'rgba(217,217,217, 0.7)',
        borderWidth: 1
    },
    pfp: {
        width: 70,
        height: 70,
        borderRadius: 70,
        overflow: 'hidden',
        alignSelf: 'center',
        // right: 20
    },
    usernameText: {
        fontSize: 20,
        alignSelf: 'center',
        color: '#3A6496',
        opacity: .8
    },
    arrow: {
        alignSelf: 'center',
        color: '#3A6496',
        opacity: .8
    }

})