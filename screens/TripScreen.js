import React, {useState} from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, ScrollView, SafeAreaView } from "react-native";
import NavigationBar from "../components/navigationBar";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const TripScreen = ({navigation}) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={{marginTop:20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',  borderBottomWidth: 1,
                borderColor: '#f0f0f0'}}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.buttonContainer}>
                        <Ionicons name='chevron-back' size={30} />
                </TouchableOpacity>
                <Text style={styles.header}>Paris</Text>
                <View style={{ width: 30 }} />
            </View>
            <ScrollView>
            </ScrollView>
        </SafeAreaView>
    )
}

export default TripScreen;

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