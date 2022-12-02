import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Header } from 'react-native';
import {AntDesign} from 'react-native-vector-icons';
import {useNavigation} from '@react-navigation/core'

export default function CreatePostHeader({}) {
    const navigation = useNavigation();
    return (
        <View style={styles.headerContainer}>
            <View style={styles.header}>
                <TouchableOpacity
                onPress={() =>  navigation.goBack()}>
                    <AntDesign name='arrowleft' size={25} color='#F6F6F6' style={styles.arrowButton}/>
                </TouchableOpacity>
                <Text style={styles.text}>Create Post</Text>
                <TouchableOpacity
                onPress={() =>  navigation.navigate('Add Caption')}
                style={styles.nextButton}>
                    <Text style={styles.next}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        height: 60,
        flexDirection: 'row',
        width: '100%',
    },
    header: {
        width: '100%',
        height: '150%',
        backgroundColor: '#F8C98A',
        top: -300,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    text: {
        fontSize: 25,
        color: '#F6F6F6',
        padding: 10,
        alignSelf: 'center',
        top: 15,
        fontWeight: 'bold',
        paddingHorizontal: 80
    },
    arrowButton: {
        // paddingRight: 100
        // right: 80,
        top: 15
    },
    nextButton: {
        backgroundColor: '#3A6496',
        borderRadius: 5,
        // left: 80,
        top: 15,
        width: 60
    },
    next: {
        fontSize: 15,
        color: '#F6F6F6',
        padding: 5,
        alignSelf: 'center',
    }
})