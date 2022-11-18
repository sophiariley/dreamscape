import React from "react";
import { StyleSheet, Text, View } from "react-native";
import NavigationBar from "../components/navigationBar";

const ExploreScreen = ({}) => {
    return (
        <View style={styles.container}>
            <View style={styles.footer}>
                <NavigationBar/>
            </View>
            
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
    }
})