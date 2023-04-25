import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, ScrollView, SafeAreaView } from "react-native";
// import { FontAwesome } from "@expo/vector-icons";
// import { Ionicons } from "@expo/vector-icons";

const PostScreen = ({navigation, route}) => {
    const [isLiked, setIsLiked] = useState(false);

    const handleLikePress = () => {
        setIsLiked(!isLiked);
        // addLike();
        // if (isLiked) {
        //     addLike();
        // } else {
        //     removeLike();
        // }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={{marginTop:20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',  borderBottomWidth: 1,
                borderColor: '#f0f0f0'}}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.buttonContainer}>
                        {/* <Ionicons name='chevron-back' size={30} /> */}
                </TouchableOpacity>
                <Text style={styles.header}>Post</Text>
                <View style={{ width: 30 }} />
            </View>
            <ScrollView>
                {/*Profile container*/}
                <View style={styles.accountContainer}>
                    <View style={styles.profileImage}>
                        <Image style={styles.image} source={{uri: ""}} />
                    </View>
                    <View style={{marginLeft: 7}}>
                        <Text style={styles.profileName}>Username</Text>
                        <Text style={styles.location}>The milkyway</Text>
                    </View>
                </View>
                {/*image*/}
                <View style={{width: Dimensions.get('screen').width}}> 
                    <Image style={styles.post} source={{uri: ""}} /> 
                </View>
                {/*Like button*/}
                <View style={{flexDirection: 'row', margin: 5, alignItems: 'center', flex: 2, justifyContent: 'space-between'}}>
                    <TouchableOpacity onPress={handleLikePress}>
                        {/* <FontAwesome name={isLiked ? 'heart' : 'heart-o'} size={35} color={isLiked ? 'red' : 'black'}style={{marginRight: 15,marginBottom:-5}}/> */}
                    </TouchableOpacity>
                    {/*Comment button*/}
                    <TouchableOpacity onPress={() => navigation.navigate('Comments', {
                    postID: "",
                    posterID: "",
                    posterUsername: "",
                    caption: "",
                    userID: "",
                    username: ""
                })}>
                        {/* <FontAwesome name='comment-o' size={35} style={{}}/> */}
                    </TouchableOpacity>
                </View>
                {/*Caption*/}
                <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
                        <Text style={[styles.profileName, {marginLeft: 5, marginTop: 5, marginRight: 5}]}>Username</Text>
                        <Text style={styles.caption}>no caption</Text>
                </View> 
                {/*View comments button*/}    
                <TouchableOpacity onPress={() => navigation.navigate('Comments', {
                    postID: "",
                    posterID: "",
                    posterUsername: "",
                    caption: "",
                    userID: "",
                    username: ""
                })}>
                    <Text style={{fontWeight: '200', marginLeft: 5, marginTop: 15, alignSelf: 'center'}}>View comments</Text>
                </TouchableOpacity>
                {/*Date posted*/}
                <Text style={{fontWeight: '200', fontSize: 12,textAlign: 'right', margin: 5}}>Posted on ...</Text>
            </ScrollView>
        </SafeAreaView>
    )
}

export default PostScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        padding: 1,
        justifyContent: 'flex-start',
    },
    header: {
        fontSize: 20,
        marginBottom: 10,
        marginTop: 10,
        textAlign: 'center',
        flex: 1,
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