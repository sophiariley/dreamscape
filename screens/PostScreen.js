import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavigationBar from "../components/navigationBar";
import {FontAwesome5, Entypo, Foundation} from 'react-native-vector-icons';
import { AntDesign, EvilIcons, Feather, FontAwesome } from "@expo/vector-icons";
const PostScreen = () => {

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.accountContainer}>
                    <View style={styles.profileImage}>
                        <Image style={styles.image}
                            source={require('../assets/profile_photo.jpg')}
                        />
                    </View>
                    <View style={{marginLeft: 7}}>
                        <Text style={styles.profileName}>john_travels</Text>
                        <Text style={styles.location}>Location</Text>
                    </View>
                </View>
                <View style={{width: Dimensions.get('screen').width}}> 
                    <Image style={styles.post}
                    source={require('../assets/posts/image10.jpg')}
                    /> 
                </View>
                <View style={{flexDirection: 'row', margin: 5, alignItems: 'center', flex: 2, justifyContent: 'space-between',}}>
                    <FontAwesome name='heart-o' size={35} style={{marginRight: 15,marginBottom:-5}}/>
                    <FontAwesome name='comment-o' size={35} style={{}}/>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
                        <Text style={[styles.profileName, {marginLeft: 5, marginTop: 5, marginRight: 5}]}>john_travels</Text>
                        <Text style={styles.caption}>Caption</Text>
                </View>                       
                <Text style={{fontWeight: '200', marginLeft: 5, marginTop: 15, alignSelf: 'center'}}>View comments</Text>
                <Text style={{fontWeight: '200', fontSize: 12,textAlign: 'right', margin: 5}}>Posted on ...</Text>
            </ScrollView>

            <SafeAreaView style={styles.footer}>
                <NavigationBar/>
            </SafeAreaView>
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
        //alignItems: 'center',
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