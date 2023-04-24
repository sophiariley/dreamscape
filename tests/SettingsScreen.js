// The screen where the user can log out with

import { StyleSheet, View, Text, Pressable, Alert } from "react-native";
// import {Feather} from 'react-native-vector-icons';

// Alerts the user of their log out attempt
const showAlert = (navigation) =>
  Alert.alert(
    'Log Out',
    'Are you sure you want to log out?',
    [
      {text: 'Yes', onPress: () => navigation.navigate('Login')},
      {text: 'No', style: 'cancel'}
    ]
  );


const SettingsScreen = ({navigation}) => {
    return (
        <View style={styles.container}>

            {/* A pressable the user can interact with in order to log out of their account */}
            <Pressable style={styles.logoutBox}
                testID="logoutButton"
                onPress={() => showAlert(navigation)}>
                <Text style={styles.text}>Logout</Text>
                {/* <Feather name='arrow-right' style={styles.arrow} size={20}/> */}
            </Pressable>
        </View>
    )
}

export default SettingsScreen;

// The styles used for this screen
const styles = StyleSheet.create({
    // A general container for components
    container: {
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },

    // A container for the "Logout" pressable
    logoutBox: {
        width: '100%',
        height: '15%',
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-around',
        backgroundColor: 'rgba(217,217,217, 0.05)',
        borderWidth: 1,
        borderColor: 'rgba(217,217,217, 0.7)',
    },

    // The styling for the "Logout" text
    text: {
        fontSize: 20,
        alignSelf: 'center',
        color: '#3A6496',
        opacity: .8,
        right: 50
    },

    // The styling for the arrow icon
    // arrow: {
    //     alignSelf: 'center',
    //     color: '#3A6496',
    //     opacity: .8,
    //     left: 50
    // },
})