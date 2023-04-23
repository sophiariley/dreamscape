// Not used in application. Kept for reference and possible future use
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {FontAwesome5} from 'react-native-vector-icons';

export default function HomeBar() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Dreamscape</Text>
            <View style={styles.buttonContainer}/>
                <TouchableOpacity style={styles.button}>
                    <FontAwesome5 name='envelope' size={40} color='#F6F6F6'/>
                </TouchableOpacity>
            <View/>
        </View>
    )
}

const styles = StyleSheet.create({
    // the styling for the container (i.e. the pink bar)
    container: {
        height: 70,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#D28A8E',
        width: '100%'
    },
    // styling for the text
    text:{ 
        alignSelf: 'center',
        fontSize: 30,
        color:'#F6F6F6',
        right: 50
    },
    // styling for the button's container
    buttonContainer: {
        justifyContent: 'flex-end',
    },
    // styling for the button
    button: {
        width: 50,
        height: 50,
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 15,
        marginRight: 15,
        justifyContent: 'center',
        alignItems: 'center',
        right: 0
    }
})