import { StyleSheet, View, Text, Pressable, Alert } from "react-native";
import {Feather} from 'react-native-vector-icons';

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
            <Pressable style={styles.logoutBox}
                onPress={() => showAlert(navigation)}>
                <Text style={styles.text}>Logout</Text>
                <Feather name='arrow-right' style={styles.arrow} size={20}/>
            </Pressable>
        </View>
    )
}

export default SettingsScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
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
    text: {
        fontSize: 20,
        alignSelf: 'center',
        color: '#3A6496',
        opacity: .8,
        right: 50
    },
    arrow: {
        alignSelf: 'center',
        color: '#3A6496',
        opacity: .8,
        left: 50
    },
})