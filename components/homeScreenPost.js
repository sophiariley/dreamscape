import React from "react";
import { useState } from "react";
import {StyleSheet, Text, View, TouchableOpacity, Pressable, Image, Dimensions, ScrollView} from "react-native";
import {FontAwesome, Ionicons} from 'react-native-vector-icons';
import {useNavigation} from '@react-navigation/core'

export default function CommentLikeDislike({username, url, caption, location}) {
    const myusername = username;
    const myurl = url;
    const mycaption = caption;
    const mylocation = location;
    const navigation = useNavigation();   
    const [isLiked, setIsLiked] = useState(false);
    const handleLikePress = () => {
        setIsLiked(prevIsLiked => !prevIsLiked);
    };

    return (
        <View>
                {/*Profile container*/}
                <View style={styles.accountContainer}>
                    <View style={styles.profileImage}>
                        <Image style={styles.image}
                            source={require('../assets/profile_photo.jpg')}
                        />
                    </View>
                    <View style={{marginLeft: 7}}>
                        <Text style={styles.profileName}>{myusername}</Text>
                        <Text style={styles.location}>{mylocation}</Text>
                    </View>
                </View>
                {/*image*/}
                <View style={{width: Dimensions.get('screen').width}}> 
                    <Image style={styles.post}
                    source={require('../assets/posts/image10.jpg')}
                    /> 
                </View>
                {/*Like button*/}
                <View style={{flexDirection: 'row', margin: 5, alignItems: 'center', flex: 2, justifyContent: 'space-between'}}>
                    <TouchableOpacity onPress={handleLikePress}>
                        <FontAwesome name={isLiked ? 'heart' : 'heart-o'} size={35} color={isLiked ? 'red' : 'black'}style={{marginRight: 15,marginBottom:-5}}/>
                    </TouchableOpacity>
                    {/*Comment button*/}
                    <TouchableOpacity onPress={() => navigation.navigate('Comments')}>
                        <FontAwesome name='comment-o' size={35} style={{}}/>
                    </TouchableOpacity>
                </View>
                {/*Caption*/}
                <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
                        <Text style={[styles.profileName, {marginLeft: 5, marginTop: 5, marginRight: 5}]}>{myusername}</Text>
                        <Text style={styles.caption}>{mycaption}</Text>
                </View> 
                {/*View comments button*/}    
                <TouchableOpacity onPress={() => navigation.navigate('Comments')}>
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