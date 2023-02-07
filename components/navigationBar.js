import React, { useState, useEffect} from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import {FontAwesome5, Entypo, Foundation} from 'react-native-vector-icons';
import {useNavigation} from '@react-navigation/core'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function NavigationBar({toNavBar}) {
    const username = toNavBar;
    const printData = () => {
        console.log("NavBar: ", username);
    }
    printData();
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View/>
                {/* home button */}
                <TouchableOpacity style={styles.button}
                onPress={() =>  navigation.navigate('Home', {
                    paramKey: username,
                })}>
                    <Entypo name='home' size={40} color='#3A6496'/>
                </TouchableOpacity>

                {/* explore button */}
                <TouchableOpacity style={styles.button}
                     onPress={() =>  navigation.navigate('Explore', {
                        paramKey: username,
                    })}>
                    <Foundation name='magnifying-glass' size={40} color='#3A6496'/>
                </TouchableOpacity>

                
                {/* new post button */}
                <TouchableOpacity style={styles.button}
                    onPress={() =>  navigation.navigate('Create Post')}>
                    <FontAwesome5 name='plus' size={40} color='#3A6496'/>
                </TouchableOpacity>

                {/* trips button */}
                <TouchableOpacity style={styles.button}>
                    <FontAwesome5 name='calendar-alt' size={40} color='#3A6496'/>
                </TouchableOpacity>

                {/* profile button */}
                <TouchableOpacity style={styles.button}
                onPress={() =>  navigation.navigate('Profile', {
                    paramKey: username,
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

/*Icon can be found at https://oblador.github.io/react-native-vector-icons/ */