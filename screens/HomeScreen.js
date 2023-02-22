import React from "react";
import { StyleSheet, View } from "react-native";
import NavigationBar from "../components/navigationBar";
import CommentLikeDislike from "../components/homeScreenPost";
// import HomeBar from "../components/homeBar";

const HomeScreen = ({}) => {
    return (
        <View style={styles.container}>
            <View>
                <CommentLikeDislike/>
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