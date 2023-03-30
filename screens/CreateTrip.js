import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput,
} from "react-native";

const CreateTrip = ({ onSave, onCancel }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <TouchableOpacity onPress={onCancel} style={styles.cancelContainer}>
          <Text>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onSave} style={styles.saveContainer}>
          <Text>Create</Text>
        </TouchableOpacity>
        <Text style={styles.text}>Create Trip</Text>
      </View>
      <ScrollView>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Start Date:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter trip start date"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>End Date:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter trip end date"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Flight Information:</Text>
          <TextInput
            style={styles.flightHotelInput}
            placeholder="Enter flight information"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Hotel Information:</Text>
          <TextInput
            style={styles.flightHotelInput}
            placeholder="Enter hotel information"
          />
        </View>
        <View style={styles.itineraryContainer}>
          <Text style={styles.inputLabel}>Itinerary:</Text>
          <TextInput
            style={styles.itineraryInput}
            placeholder="Enter itinerary"
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
