import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const TripScreen = ({route,navigation}) => {
  // Extract data about the trip from the route object
  const city = route.params.city;
  const startDate = route.params.startDate;
  const endDate = route.params.endDate;
  const flightInfo = route.params.flightInfo;
  const hotelInfo = route.params.hotelInfo;
  const itenerary = route.params.itenerary;

    return (
        <SafeAreaView style={styles.container}>
          {/* Header with back button and trip city name */}
            <View style={{marginTop:20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',  borderBottomWidth: 1,
                borderColor: '#f0f0f0'}}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.buttonContainer}>
                        <Ionicons name='chevron-back' size={30} />
                </TouchableOpacity>
                <Text style={styles.header}>{city}</Text>
                <View style={{ width: 30 }} />
            </View>
            {/* Scrollable view containing trip information */}
            <ScrollView style={styles.scrollView}>
                {/* Start date */}
                <View style={styles.tripInfoContainer}>
                <Text style={styles.tripInfoLabel}>Start Date:</Text>
                <Text style={styles.tripInfoValue}>{startDate}</Text>
                </View>
                {/* End date */}
                <View style={styles.tripInfoContainer}>
                <Text style={styles.tripInfoLabel}>End Date:</Text>
                <Text style={styles.tripInfoValue}>{endDate}</Text>
                </View>
                {/* Flight information */}
                <View style={styles.tripInfoContainer}>
                <Text style={styles.tripInfoLabel}>Flight Information:</Text>
                <Text style={styles.tripInfoValue}>{flightInfo}</Text>
                </View>
                {/* Hotel information */}
                <View style={styles.tripInfoContainer}>
                <Text style={styles.tripInfoLabel}>Hotel Information:</Text>
                <Text style={styles.tripInfoValue}>{hotelInfo}</Text>
                </View>
                {/* Itinerary */}
                <View style={styles.itineraryInfoContainer}>
                <Text style={styles.itineraryInfoLabel}>Itinerary:</Text>
                <ScrollView>
                    <Text style={styles.itineraryInfoValue}>
                        {itenerary}
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
