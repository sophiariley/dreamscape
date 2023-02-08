import React, { useState} from "react";
import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView, Button, TouchableOpacity} from "react-native";
import {Foundation} from 'react-native-vector-icons';
import CreatePostHeader from "../components/createPostHeader";
// import CameraRollPicker from 'react-native-camera-roll-picker';




const CreatePost = ({}) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <CreatePostHeader/>
            </View>
            <View style={styles.cameraRollContainer}>
                <Text style={styles.text}>Camera Roll</Text>
                {/* <CameraRollPicker callback={this.getSelectedImages}/> */}
            </View>
        </View>
    )
}

export default CreatePost;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cameraRollContainer: {
        backgroundColor: '#F8C98A',
        width: '100%',
        height: '8%',
        justifyContent: 'center',
        alignContent: 'center',
        top: 10
    },
    text: {
        color: '#F6F6F6',
        padding: 5,
        alignSelf: 'center',
        fontSize: 25
    },
    header: {
        position: 'absolute',
        top: 300,
        alignItems:'center',
        width: '100%'
    }
})