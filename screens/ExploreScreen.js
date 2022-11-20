import React, { useState} from "react";
import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView } from "react-native";
import NavigationBar from "../components/navigationBar";
import {Foundation} from 'react-native-vector-icons';

const ExploreScreen = ({}) => {
    // const [search, setSearch] = useState(' ');
    
    return (
        <View style={styles.container}>
            <KeyboardAvoidingView style={styles.searchBar}
            behavior="padding">
                <Foundation name='magnifying-glass' size={25} color='#3A6496' style={styles.icon}/>
                <TextInput
                    style={styles.searchBarText}
                    placeholder="Search"
                    // value={search}
                    // onChangeText={text => setSearch(text)}
                />
            </KeyboardAvoidingView>
            <KeyboardAvoidingView style={styles.footer}>
                <NavigationBar/>
            </KeyboardAvoidingView>
        </View>
        
    )
}

export default ExploreScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    // the styling of the header, used for the home bar
    header: {
        position: 'absolute',
        bottom: 0,
        alignItems:'center'
    },
    // the styling of the footer, used for the navigation bar
    footer: {
        position: 'absolute',
        bottom: 0,
        alignItems:'center'
    },
    searchBar: {
        backgroundColor: '#DADADA',
        opacity: .75,
        width: '95%',
        borderRadius: 5,
        top: -280,
        flexDirection: 'row'
    },
    searchBarText: {
        fontSize: 18,
        color: '#3A6496',
        marginLeft: 10,
        marginTop: 5,
        marginBottom: 5
    },
    icon: {
        marginLeft: 10,
        marginTop: 5,
        marginBottom: 5
    }

})