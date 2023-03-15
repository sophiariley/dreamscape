import React from "react";
import { useState } from "react";
import {StyleSheet, Text, View, TouchableOpacity, Pressable} from "react-native";
import {FontAwesome, Ionicons} from 'react-native-vector-icons';
import {useNavigation} from '@react-navigation/core'

export default function CommentLikeDislike({}) {
    const navigation = useNavigation();
    const [thumbsUp, setThumbsUp] = useState(false);
    const [thumbsDown, setThumbsDown] = useState(false);
    const [mustDo, setMustDo] = useState(false);
    
    return (
        <View style={styles.container}>
                {/* <Comments/> */}
                <View style={styles.buttons}>
                    <TouchableOpacity
                    onPress={() =>  navigation.navigate('Comment Screen')}>
                        <FontAwesome name='comment-o' size={30} color='#3A6496'/>
                    </TouchableOpacity>
                </View>

                <View style={styles.buttons}>
                    <Pressable onPress={() => setMustDo((isMustDo) => !isMustDo)}>
                        <Text 
                            style={[{color: mustDo ? "white" : "#3A6496"},
                            {backgroundColor: mustDo ? "#3A6496" : "white"},
                            {borderColor: mustDo ? "white" : "#3A6496"},
                            {borderRadius: 5},
                            {borderWidth: 2},
                            styles.text]}> Must do!</Text>
                    </Pressable>
                </View>

                <View style={styles.buttons}>
                    <Pressable onPress={() => setThumbsUp((isThumbsUp) => !isThumbsUp)}>
                        <Ionicons
                            name={thumbsUp ? "thumbs-up" : "thumbs-up-outline"}
                            size={30}
                            color={thumbsUp ? "#3A6496" : "#3A6496"}
                        />
                    </Pressable>
                </View>

                <View style={styles.buttons}>
                    <Pressable onPress={() => setThumbsDown((isThumbsDown) => !isThumbsDown)}>
                        <Ionicons
                            name={thumbsDown ? "thumbs-down" : "thumbs-down-outline"}
                            size={30}
                            color={thumbsDown ? "#3A6496" : "#3A6496"}
                        />
                    </Pressable>
                </View>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '100%'
    },
    text: {
        alignSelf: 'center',
        fontSize: 15,
        padding: 5,
        paddingTop: 7
    },
    buttons: {
        padding: 5
    }
})

