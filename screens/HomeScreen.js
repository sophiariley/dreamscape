import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import NavigationBar from "../components/navigationBar";
import {FontAwesome} from 'react-native-vector-icons';
// import HomeBar from "../components/homeBar";

const HomeScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <View>
                <TouchableOpacity style={styles.button}
                onPress={() =>  navigation.navigate('Comment Screen')}>
                    <FontAwesome name='comment-o' size={30} color='#3A6496'/>
                </TouchableOpacity>
            </View>
            <View style={styles.footer}>
                <NavigationBar/>
            </View>
            
        </View>
        
    )
}

export default HomeScreen;

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
    }
})