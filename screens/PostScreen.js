import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavigationBar from "../components/navigationBar";

const PostScreen = () => {

    return (
        <SafeAreaView style={styles.container}>
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
            <View style={{width: Dimensions.get('screen').width, aspectRatio: 1,}}> 
                <Image style={styles.post}
                source={require('../assets/posts/image10.jpg')}
                />
                <Text style={[styles.profileName, {marginLeft: 10}]}>john_travels</Text>
            </View>
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
        aspectRatio: 1,
        alignSelf:'center',
        overflow: 'hidden'
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
    footer: {
        position:'absolute',
        bottom: 0,
        alignItems: 'center'
    }
})