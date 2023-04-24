import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, LogBox } from "react-native";
import NavigationBar from "../components/navigationBar";
import { collection, query, where, onSnapshot, getDocs, setDoc, doc, getCountFromServer } from "firebase/firestore";
import { db } from "../firebase-config";
import { DataContext } from "../DataContext";

LogBox.ignoreAllLogs();

const Trips = ({ route, navigation }) => {

    //username and userID of logged in account
    const username = route.params.username;
    const userID = route.params.userID;

    const {uID, setUID} = useContext(DataContext);
    setUID(userID);
    console.log("DataContext UID: ", uID);

    // Get trip data to display
    const [trips, setTrips] = useState([]);
    const getTrips = async () => {
        const newtrips = [];
        const userRef = doc(db,"users", userID);
        const tripsSnapshot = await getDocs(collection(userRef, 'trips'));
        tripsSnapshot.forEach((docu) => {
            console.log(docu.data());
            const trip = {city: docu.data().city, startDate: docu.data().startDate, endDate: docu.data().endDate, flightInfo: docu.data().flightInfo, hotelInfo: docu.data().hotelInfo, itenerary: docu.data().itenerary};
            newtrips.push(trip);
        });
        return newtrips;
    }

    

    async function runIt() {
        const userRef = doc(db,"users", userID);
        const snapshot = await getCountFromServer(collection(userRef, 'trips'));
        if (snapshot.data().count != trips.length) {
            const aysncrun = async () => {
                const mytrips = await getTrips();
                setTrips(mytrips);
            }
            aysncrun();
        }
        
    }

    runIt();

    return (
        <View style={styles.container}>
            <View style={styles.scrollViewContainer}>
                <ScrollView>
                    {trips.map((trip, index) => (
                    <TouchableOpacity key={index} style={styles.tripBox} onPress={() => navigation.navigate('TripScreen', {
                        city: trip.city,
                        startDate: trip.startDate,
                        endDate: trip.endDate,
                        flightInfo: trip.flightInfo,
                        hotelInfo: trip.hotelInfo,
                        itenerary: trip.itenerary
                    })}>
                        <View style={styles.tripDetails}>
                            <Text style={styles.tripCity}>{trip.city}</Text>
                        </View>
                        <Text style={styles.tripDate}>{trip.startDate}</Text>
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
