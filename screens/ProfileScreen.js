import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, } from "react-native";
import NavigationBar from "../components/navigationBar";
import { Feather } from 'react-native-vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";
import Photos from "../assets/Photos";
const ProfileScreen = () => {
    const photos = [
         {
        image: require("../assets/posts/image1.jpg")
        },
        {
            image: require("../assets/posts/image2.jpg")
        },
        {
            image: require("../assets/posts/image3.jpg")
        },
        {
            image: require("../assets/posts/image4.jpg")
        },
        {
            image: require("../assets/posts/image5.jpg")
        },
        {
            image: require("../assets/posts/image6.jpg")
        },
        {
            image: require("../assets/posts/image7.jpg")
        },
        {
            image: require("../assets/posts/image8.jpg")
        },
        {
            image: require("../assets/posts/image9.jpg")
        },
        {
            image: require("../assets/posts/image10.jpg")
        }
    ]
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.profileName}>global_guy_123</Text>

            <View style={styles.profileContainer}>
                <View style={styles.profileImage}>
                    <Image source={require("../assets/profile_photo.jpg")} style={styles.image}/>
                </View>
                <View style={{flexDirection: 'row', marg: 'center'}}>
                    <View style={{alignItems: 'center'}}>
                        <Text style={styles.number}>
                            11
                        </Text>
                        <Text style={styles.numberDescription}>
                            Trips
                        </Text>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <Text style={styles.number}>
                            9
                        </Text>
                        <Text style={styles.numberDescription}>
                            Posts
                        </Text>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <Text style={styles.number}>
                            997
                        </Text>
                        <Text style={styles.numberDescription}>
                            Followers
                        </Text>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <Text style={styles.number}>
                            561
                        </Text>
                        <Text style={styles.numberDescription}>
                            Following
                        </Text>
                    </View>
                </View>
            </View>

            <View style={styles.profileInfo}>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.textName}>Harry,</Text>
                    <Text style={{color: '#3A6496', fontSize: 18, textAlignVertical: 'bottom'}}>31</Text>
                </View>
                <Text style={{fontSize: 13, color: '#3A6496', opacity: .7}}>Maryland</Text>  
            </View>
            <TouchableOpacity style={styles.editProfile}>
                <Text style={{color: 'white'}}>Edit Profile</Text>
            </TouchableOpacity>

            <View style={styles.travelBuddies}>
                <Text style={{fontSize: 13, color: '#3A6496'}}>Travel Buddies</Text>
                <View style={{flexDirection: 'row', alignItems: 'center', paddingVertical: 10, justifyContent: 'space-evenly'}}>
                    <View style={{alignItems: 'center'}}>
                        <Image source={require("../assets/travel_buddy1.jpg")} style={styles.travelBuddyImage}/>
                        <Text style={{color: '#3A6496', fontSize: 12, fontWeight: 'bold'}}>john_travels</Text>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <Image source={require("../assets/travel_buddy2.jpg")} style={styles.travelBuddyImage}/>
                        <Text style={{color: '#3A6496', fontSize: 12, fontWeight: 'bold'}}>em_adventures</Text>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <Image source={require("../assets/travel_buddy3.jpg")} style={styles.travelBuddyImage}/>
                        <Text style={{color: '#3A6496', fontSize: 12, fontWeight: 'bold'}}>denise_012</Text>
                    </View>
                </View>
            </View>

            <View>
                <View style={{flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10}}>
                    <TouchableOpacity style={{opacity: .5}}>
                        <Feather name='map-pin' size={30} color='#3A6496'></Feather>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Feather name='image' size={30} color='#3A6496'></Feather>
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <FlatList 
                key={'_'}
                horizontal={false}
                data={photos} 
                renderItem= {
                    renderImages = item => {
                        return <View><Image source={{url: item.image}} style={{height:100, width:100}}/>
                        </View>
                    }
                }
                numColumns={3}/>
            </View>

            <View style={styles.footer}>
                <NavigationBar/>
            </View>
        </SafeAreaView>
    )
}

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        padding: 1,
        //justifyContent: 'center',
        //alignItems: 'center',
    },
    footer: {
        position:'absolute',
        bottom: 0,
        alignItems: 'center'
    },
    image: {
        flex: 1,
        width: undefined,
        height: undefined,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 100,
        overflow: 'hidden'
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30,
        marginLeft: 20,
        marginRight: 10,
        justifyContent: 'space-between'
    },
    number: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#3A6496',
    },
    numberDescription: {
        fontSize: 12,
        color: '#3A6496',
        paddingHorizontal: 12
    },
    profileName: {
        fontSize: 20,
        color: '#F8C98A',
        textAlign: 'center',
        paddingBottom: 1
    },
    textName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#3A6496',
        marginRight: 5
    },
    profileInfo: {
        marginTop: 15,
        marginLeft: 25,
        marginRight: 25
    },
    editProfile: {
        marginVertical: 10,
        alignItems: 'center',
        padding: 6,
        marginHorizontal: 10,
        backgroundColor: '#D28A8E',
        borderRadius: 5
    },
    travelBuddies: {
        marginHorizontal: 10,
        padding: 1
    },
    travelBuddyImage: {
        width: 50,
        height: 50,
        borderRadius: 50,
        overflow: 'hidden'
    }
})