import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';
import { useState, userEffect, useEffect } from "react";
import { db } from './firebase-config';
import { collection, getDocs } from "firebase/firestore";

export default function App() {
  const [users, setUsers] = useState([]); // this is a hook, holds the list of users in our table
  const usersCollectionRef = collection(db, "users");

  // function that is called whenever the page is rendered
  useEffect(() => {

    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      console.log(data);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }

    getUsers();
  }, [])

  return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        {users.map((user) => {
           return (
            <div> 
              {" "}
              <Text> Name: {user.name}</Text>
              <Text> Age: {user.age} </Text>
            </div>
           );
        })}
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

