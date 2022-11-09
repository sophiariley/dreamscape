import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState, useEffect } from "react";
import { db } from "./firebase-config";
import { collection, getDocs } from "firebase/firestore";
import Constants from 'expo-constants';

export default function App() {
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id })));
    };

    getUsers();
  })
  return (
    <View style={styles.container}>
      {users.map((user) => {
        return (
          <View key={user.id}>
            <Text> Name: {user.name}</Text>
            <Text> Age: {user.age}</Text>
            <Text> ID: {user.id}</Text>
          </View>
        );
      })}
      
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