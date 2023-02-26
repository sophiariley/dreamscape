import React from "react";
import { StyleSheet, View, TextInput } from "react-native";
import CommentBar from "../components/commentBar";

const CommentScreen = () => {
    return (
        <View style={styles.container}>
            <View>
                <TextInput></TextInput>
            </View>
            <View style={styles.footer}>
                <CommentBar/>
            </View>
        </View>
        
    )
}

export default CommentScreen;

const styles = StyleSheet.create ({
    container: {
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        alignItems:'center'
    }
})