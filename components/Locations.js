import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const Locations = () => {
  const locations = [
    'New York City',
    'Los Angeles',
    'Chicago',
    'Houston',
    'Philadelphia',
    'Phoenix',
    'San Antonio',
    'San Diego',
    'Dallas',
    'San Jose',
  ];

  const locationRows = [];
  for (let i = 0; i < locations.length; i += 2) {
    locationRows.push(
      <View key={i} style={styles.locationRow}>
        <TouchableOpacity style={styles.touchableLocation}>
          <View style={styles.locationContainer}>
            <Image source={require('../assets/city.jpg')} style={styles.image}/>
            <Text style={styles.locationText}>{locations[i]}</Text>
          </View>
        </TouchableOpacity>
        {i + 1 < locations.length && (
          <TouchableOpacity style={styles.touchableLocation}>
            <View style={styles.locationContainer} >
              <Image source={require('../assets/city.jpg')} style={styles.image}/>
              <Text style={styles.locationText}>{locations[i + 1]}</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {locationRows}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 5,
    paddingBottom: 60,
    paddingRight: 5,
  },
  locationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  touchableLocation: {
    width: '49.5%',
    aspectRatio: 1, // forces a square shape
  },
  locationContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 9999, // or a very large number to ensure a perfect circle
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationText: {
    fontWeight:'900',
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowRadius: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute', 
    borderRadius: 100
  }
});

export default Locations;
