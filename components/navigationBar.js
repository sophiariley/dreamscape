import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {FontAwesome5, Entypo, Foundation} from 'react-native-vector-icons';

export default function NavigationBar() {
    return (
        <View style={styles.container}>
            <View/>
                <TouchableOpacity style={styles.button}>
                    <Entypo name='home' size={40} color='#3A6496'/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Foundation name='magnifying-glass' size={40} color='#3A6496'/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <FontAwesome5 name='plus' size={40} color='#3A6496'/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <FontAwesome5 name='calendar-alt' size={40} color='#3A6496'/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <FontAwesome5 name='user-alt' size={40} color='#3A6496'/>
                </TouchableOpacity>
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