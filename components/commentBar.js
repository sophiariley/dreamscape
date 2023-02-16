import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import React, { useState} from "react";

export default function CommentBar({}) {
    const [comment, setComment] = useState('');
    return(
        <View>
            <View style = {styles.container}>
                <TextInput
                    style={styles.inputText} 
                    placeholder="Comment something here..."
                    value={comment}
                    onChangeText={text => setUsername(text)}
                />
                <TouchableOpacity style = {styles.postContainer}>
                    <Text style={styles.postText}>Post!</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create ({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignContent: 'center',
        bottom: 20
    },
    inputText: {
        fontSize: 20,
        backgroundColor: '#DADADA',
        width: '120%',
        opacity: .5,
        borderRadius: 5,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        
    },
    postText: {
        color: 'white',
        fontSize: 20,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
    },
    postContainer: {
        backgroundColor: '#3A6496',
        borderRadius: 5,
        
    }
})