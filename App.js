import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import {FontAwesome5} from 'react-native-vector-icons';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
<<<<<<< HEAD
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" />
      </View>
  );
}


// // ---The different screens of Dreamscape---
// // Looking into consolidating each screen into a seperate file for cleanliness
// // This is an idea of the screens to create for the PoC milestone 
// const LoginScreen = ({ navigation}) => {
//   // TO DO: Code
// }

// const ResetPasswordScreen = ({ navigation}) => {
//   // TO DO: Code
// }
 
// // Unsure how many create account screens we need. Should look into consolidating them into one thing
// const CreateAccountScreen1 = ({ navigation}) => {
//   // TO DO: Code
// }

// const CreateAccountScreen2 = ({ navigation}) => {
//   // code login screen here
// }

// const CreateAccountScreen3 = ({ navigation}) => {
//   // TO DO: Code
// }
// //----------------------------------------------------------------------------------------------------

// const HomeScreen = ({ navigation}) => {
//   // TO DO: Code
// }

// const ProfileScreen = ({ navigation}) => {
//   // TO DO: Code
// }

// const ExploreScreen = ({ navigation}) => {
//   // TO DO: Code
// }

// const CreatePostScreen = ({ navigation}) => {
//   // TO DO: Code
// }

=======
    <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
          <Stack.Screen 
            options={{ 
              title: 'Dreamscape',
              headerTitleAlign: 'center',
              headerBackVisible: false,
              headerStyle: {
                backgroundColor: '#D28A8E'
              },
              headerTitleStyle: {
                color: '#F6F6F6',
                fontSize: 25
              },
              headerRight: () => (
                <View>
                  <TouchableOpacity style={styles.button}>
                    <FontAwesome5 name='envelope' size={35} color='#F6F6F6'/>
                  </TouchableOpacity>
                </View>
              )
            }} name="Home" component={HomeScreen} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}

>>>>>>> origin
const styles = StyleSheet.create({
  dreamscape: {
    fontSize: 80
  }
<<<<<<< HEAD
}) 
=======
}) 

>>>>>>> origin
