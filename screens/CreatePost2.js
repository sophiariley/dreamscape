import React, { useState} from "react";
import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView, TouchableOpacity } from "react-native";
import {Ionicons} from 'react-native-vector-icons';


const CreatePost2 = ({navigation}) => {
    const [caption, setCaption] = useState(' ');
    return (
        <View style={styles.contianer}>
            <View style={styles.photoContainer}/>
            <KeyboardAvoidingView style={styles.captionContainer}>
                <TextInput
                    color='#3A6496' 
                    style={styles.captionText} 
                    placeholder="Write caption..."
                    placeholderTextColor={'#3A6496'}
                    value={caption}
                    onChangeText={text => setCaption(text)}
                />
            </KeyboardAvoidingView>
            <View style={styles.location}>
                <Ionicons style={styles.globe} name='globe-outline' size={30} color='#3A6496'/>
                <Text style={styles.locationText}>Add Location</Text>
            </View>
            <View style={styles.postButtonContainer}>
                <TouchableOpacity 
                    style={styles.postButton}
                    onPress={() => navigation.navigate('Home')}>
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
        width: '95%',
        height: '25%',
        borderRadius: 5,
        top: 35
    },
    photoContainer: {
        backgroundColor: 'pink',
        opacity: .8,
        alignSelf: 'center',
        width: '95%',
        height: '60%',
        borderRadius: 5,
        top: 20
    },
    captionText: {
        fontSize: 18,
        color: '#3A6496',
        padding: 10,
        opacity: .8
    },
    postButtonContainer: {
        width: '50%',
        height: '20%',
        flex: 1,
        alignSelf: 'center',
        position: 'absolute',
        top: 550
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
        top: 475
    },
    globe: {
        padding: 10,
    },
    locationText: {
        color: '#3A6496',
        fontSize: 20,
        padding: 5,
    }
})