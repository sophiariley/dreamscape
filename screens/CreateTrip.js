import React, {useState} from "react";
import {Alert} from "react-native";
import { collection, query, where, onSnapshot, getDocs, addDoc, doc } from "firebase/firestore";
import { db } from "../firebase-config";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput,
} from "react-native";

const CreateTrip = ({ uID, onSave, onCancel }) => {

  // Set userID to the prop passed in from the parent component
  const userID = uID;

  // Set initial state for trip details
  const [city, setCity] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [flightInfo, setFlightInfo] = useState('');
  const [hotelInfo, sethotleInfo] = useState('');
  const [itenerary, setItenerary] = useState('');

  // Function that adds a new trip to the user's collection in Firestore
  async function createATrip(city, startDate, endDate, flightInfo, hotelInfo, itenerary) {
    const userRef = doc(db, "users", userID);
    //const userRef = doc(db, "users", 'bV26oHiTJBDec19IiA5b'); //-----------fix hardcode UID
    await addDoc(collection(userRef, 'trips'), {
      city: city,
      startDate: startDate,
      endDate: endDate,
      flightInfo: flightInfo,
      hotelInfo: hotelInfo,
      itenerary: itenerary
    });
    onSave(); //----------- copy and past code for this here?
  }

  // Alerts user if they input an incorrect username or password
  const emptyAlert = (navigation) =>
  Alert.alert(
      'Error',
      'You must fill out all fields to make a trip!',
      [
      {text: 'Ok', style: 'cancel'}
      ]
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Container for the top part of the screen */}
      <View style={styles.topContainer}>
         {/* Button to cancel trip creation */}
        <TouchableOpacity onPress={onCancel} style={styles.cancelContainer}>
          <Text>Cancel</Text>
        </TouchableOpacity>
         {/* Button to create a new trip */}
        <TouchableOpacity onPress={() => city=='' || startDate=='' || endDate=='' || flightInfo=='' || hotelInfo=='' || itenerary=='' ? emptyAlert() : createATrip(city, startDate, endDate, flightInfo, hotelInfo, itenerary)} style={styles.saveContainer}>
          <Text>Create</Text>
        </TouchableOpacity>
        <Text style={styles.text}>Create Trip</Text>
      </View>
       {/* Container for the scrollable part of the screen */}
      <ScrollView>
         {/* Input fields for trip details */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>City</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter trip city"
            value={city}
            onChangeText={text => setCity(text)}
          />
        </View>
        {/* Start Date */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Start Date:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter trip start date"
            value={startDate}
            onChangeText={text => setStartDate(text)}
          />
        </View>
        {/* End Date */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>End Date:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter trip end date"
            value={endDate}
            onChangeText={text => setEndDate(text)}
          />
        </View>
        {/* Flight information */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Flight Information:</Text>
          <TextInput
            style={styles.flightHotelInput}
            placeholder="Enter flight information"
            value={flightInfo}
            onChangeText={text => setFlightInfo(text)}
          />
        </View>
        {/* Hotel Information */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Hotel Information:</Text>
          <TextInput
            style={styles.flightHotelInput}
            placeholder="Enter hotel information"
            value={hotelInfo}
            onChangeText={text => sethotleInfo(text)}
          />
        </View>
        {/* Itinerary */}
        <View style={styles.itineraryContainer}>
          <Text style={styles.inputLabel}>Itinerary:</Text>
          <TextInput
            style={styles.itineraryInput}
            placeholder="Enter itinerary"
            vlaue={itenerary}
            onChangeText={text => setItenerary(text)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateTrip;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  topContainer: {
    height: 50,
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#CCCCCC',
  },
  text: {
    alignSelf: 'center',
    fontSize: 17,
    color: 'black',
  },
  saveContainer: {
    justifyContent: 'center',
    width: 50,
    height: 50,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  cancelContainer: {
    justifyContent: 'center',
    width: 50,
    height: 50,
    position: 'absolute',
    right: 10,
    top: 0,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    justifyContent: 'space-between',
  },
  input: {
    flex: 1,
    fontSize: 14,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 5,
    marginRight: 10,
    marginLeft: 2,
  },
  inputLabel: {
    fontSize: 14,
    textAlign: 'left',
    color: 'black',
    marginRight: 5
  },
  flightHotelInput: {
    flex: 1,
    fontSize: 14,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 5,
    marginRight: 10,
    marginLeft: 2,
    maxHeight: 100,
    textAlignVertical: 'top',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  itineraryInput: {
    flex: 1,
    fontSize: 14,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 5,
    marginRight: 10,
    marginLeft: 2,
    width: '97%',
    height: 150,  // <-- Add this line to set the height of the input
    textAlignVertical: 'top',
  },
  itineraryContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f2f2f2',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    justifyContent: 'space-between',
  }
});
