import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';

export default function App() {
  return (
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  swipes: {
    flex: 1,
    padding: 10,
    paddingTop: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
}) 

