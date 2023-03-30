import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
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
            <ScrollView style={styles.scrollView}>
                <View style={styles.tripInfoContainer}>
                <Text style={styles.tripInfoLabel}>Start Date:</Text>
                <Text style={styles.tripInfoValue}>April 15, 2023</Text>
                </View>
                <View style={styles.tripInfoContainer}>
                <Text style={styles.tripInfoLabel}>End Date:</Text>
                <Text style={styles.tripInfoValue}>April 23, 2023</Text>
                </View>
                <View style={styles.tripInfoContainer}>
                <Text style={styles.tripInfoLabel}>Flight Information:</Text>
                <Text style={styles.tripInfoValue}>Delta Airlines Flight 123</Text>
                </View>
                <View style={styles.tripInfoContainer}>
                <Text style={styles.tripInfoLabel}>Hotel Information:</Text>
                <Text style={styles.tripInfoValue}>Hilton Paris Opera</Text>
                </View>
                <View style={styles.itineraryInfoContainer}>
                <Text style={styles.itineraryInfoLabel}>Itinerary:</Text>
                <ScrollView>
                    <Text style={styles.itineraryInfoValue}>
                        Day 1: Eiffel Tower, Day 2: Louvre Museum, Day 3: Versailles Palace,
                        Day 4: Notre-Dame Cathedral
                    </Text>
                </ScrollView>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default TripScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 1,
    justifyContent: "flex-start",
  },
  header: {
    fontSize: 20,
    marginBottom: 10,
    marginTop: 10,
    textAlign: "center",
    flex: 1,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  scrollView: {
    paddingHorizontal: 5,
  },
  tripInfoContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    borderBottomColor: '#D3D3D3',
    padding: 10,
    borderBottomWidth: 1,
  },
  tripInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  tripInfoLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
    width: 130,
  },
  tripInfoValue: {
    fontSize: 16,
    flexWrap: 'wrap',

  },
    itineraryInfoLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
    width: 100,
  },
  itineraryInfoValue: {
    fontSize: 16,
    flexWrap: 'wrap',
  },
  itineraryInfoContainer: {
    flex: 1,
    flexDirection: "row",
    marginTop: 20,
    borderBottomColor: '#D3D3D3',
    padding: 10,
    borderBottomWidth: 1,
  }
});
