import React from "react";
import { useState, useEffect } from "react";
import {StyleSheet, Text, View, TouchableOpacity, Pressable, Image, Dimensions, ScrollView} from "react-native";
import {FontAwesome, Ionicons} from 'react-native-vector-icons';
import {useNavigation} from '@react-navigation/core'

export default function CommentLikeDislike({userID, userUsername, posterID, postID, username, url, caption, location, posterPFP}) {
    const posterUsername = username;
    const myurl = url;
    //const [myurl, setmyurl] = useState('https://firebasestorage.googleapis.com/v0/b/dreamscapeofficial-ef560.appspot.com/o/images%2F2d6961e8-dafc-48bb-aa1c-56efe6e57b93.jpeg?alt=media&token=696456ea-1c7c-49ec-8135-1c947e17fe54');
    const mycaption = caption;
    const mylocation = location;
    const navigation = useNavigation();   
    const [isLiked, setIsLiked] = useState(false);
    const handleLikePress = () => {
        setIsLiked(prevIsLiked => !prevIsLiked);
    };

    /*useEffect(() => {
        if(url!=''){
            setmyurl(url);
        }
    })*/

    return (
        <View>
                {/*Profile container*/}
                <View style={styles.accountContainer}>
                    <View style={styles.profileImage}>
                        <Image style={styles.image}
                            source={{uri: posterPFP}}
                        />
                    </View>
                    <View style={{marginLeft: 7}}>
                        <Text style={styles.profileName}>{posterUsername}</Text>
                        <Text style={styles.location}>{mylocation}</Text>
                    </View>
                </View>
                {/*image*/}
                <View style={{width: Dimensions.get('screen').width}}> 
                    <Image style={styles.post}
                    source={{uri: url}}
                    /> 
                </View>
                {/*Like button*/}
                <View style={{flexDirection: 'row', margin: 5, alignItems: 'center', flex: 2, justifyContent: 'space-between'}}>
                    <TouchableOpacity onPress={handleLikePress}>
                        <FontAwesome name={isLiked ? 'heart' : 'heart-o'} size={35} color={isLiked ? 'red' : 'black'}style={{marginRight: 15,marginBottom:-5}}/>
                    </TouchableOpacity>
                    {/*Comment button*/}
                    <TouchableOpacity onPress={() => navigation.navigate('Comments', {
                        postID: postID,
                        posterID: posterID,
                        posterUsername: posterUsername,
                        caption: caption,
                        userID: userID,
                        username: userUsername
                    })}>
                        <FontAwesome name='comment-o' size={35} style={{}}/>
                    </TouchableOpacity>
                </View>
                {/*Caption*/}
                <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
                        <Text style={[styles.profileName, {marginLeft: 5, marginTop: 5, marginRight: 5}]}>{posterUsername}</Text>
                        <Text style={styles.caption}>{mycaption}</Text>
                </View> 
                {/*View comments button*/}    
                <TouchableOpacity onPress={() => navigation.navigate('Comments', {
                        postID: postID,
                        posterID: posterID,
                        posterUsername: posterUsername,
                        caption: caption,
                        userID: userID,
                        username: userUsername
                    })}>
                    <Text style={{fontWeight: '200', marginLeft: 5, marginTop: 15, alignSelf: 'center'}}>View comments</Text>
                </TouchableOpacity>
                {/*Date posted*/}
                <Text style={{fontWeight: '200', fontSize: 12,textAlign: 'right', margin: 5}}>Posted on ...</Text>
        </View>
    )
}

const styles = StyleSheet.create({
container: {
        backgroundColor: 'white',
        flex: 1,
        padding: 1,
        justifyContent: 'flex-start',
    },
    accountContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        
        marginTop: 10,
        marginLeft: 15,
        marginRight: 10,
        marginBottom: 10
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 100,
        overflow: 'hidden'
    },
    post: {
        width: '100%',
        height: undefined,
        alignItems: 'center',
        aspectRatio: 1,
    },
    profileName: {
        color: '#3A6496', 
        fontSize: 13, 
        fontWeight: 'bold',
    },
    location: {
        color: '#3A6496', 
        fontSize: 11, 
    },
    image: {
        flex: 1,
        width: undefined,
        height: undefined,
    },
    caption:
    {
        fontSize: 13,

    },
    footer: {
        position:'absolute',
        bottom: 0,
        alignItems: 'center'
    }
})