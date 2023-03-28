import React, { useState } from "react";
import { StyleSheet, View, ScrollView, Text, TouchableOpacity } from "react-native";
import NavigationBar from "../components/navigationBar";
import { collection, query, where, onSnapshot, getDocs, setDoc, doc } from "firebase/firestore";
import { db } from "../firebase-config";

const Trips = ({ route, navigation }) => {

    //username and userID of logged in account
    const username = route.params.username;
    const userID = route.params.userID;

    // Sample trip data
    const trips = [
        {city: "New York", date: "April 2023"},
        {city: "Paris", date: "May 2023"},
        {city: "Tokyo", date: "June 2023"},
        {city: "London", date: "July 2023"},
        {city: "Sydney", date: "August 2023"},
        {city: "Cairo", date: "September 2023"},
        {city: "Rio de Janeiro", date: "November 2023"},
        {city: "Mumbai", date: "December 2023"},
    ];

    return (
        <View style={styles.container}>
            <View style={styles.scrollViewContainer}>
                <ScrollView>
                    {trips.map((trip, index) => (
                        <TouchableOpacity key={index} style={styles.tripBox} onPress={() => navigation.navigate('TripScreen')}>
                            <View style={styles.tripDetails}>
                                <Text style={styles.tripCity}>{trip.city}</Text>
                            </View>
                            <Text style={styles.tripDate}>{trip.date}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
            <View style={styles.footer}>
                <NavigationBar toNavBarUsername={username} toNavBarUserID={userID}/>
            </View>
        </View>
    )
}

export default Trips;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F4F4F4',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    scrollViewContainer: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 5,
        paddingTop: 10,
        paddingBottom: 60
    },
    tripBox: {
        backgroundColor: '#F8C98A',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 50,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    tripDetails: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    tripCity: {
        position: 'absolute',
        color: '#ffffff',
        fontSize: 25,
        alignSelf: 'flex-start',
        textShadowColor: 'black',
        textShadowRadius: 5,
        left: 0,
        top: 5
    },
    tripDate: {
        position: 'absolute',
        color: '#ffffff',
        fontSize: 15,
        alignSelf: 'flex-end',
        textShadowColor: 'black',
        textShadowRadius: 3,
        right: 5,
        bottom: 5
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        alignItems:'center'
    }
});
