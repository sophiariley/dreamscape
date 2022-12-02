import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import CreatePost from './screens/CreatePost';
import CreatePost2 from './screens/CreatePost2';
import ExploreScreen from './screens/ExploreScreen';
import CreateAccount1 from './screens/CreateAccount1'
import CreateAccount2 from './screens/CreateAccount2'
import ProfileScreen from './screens/ProfileScreen';
import {FontAwesome5, AntDesign} from 'react-native-vector-icons';
import {useNavigation} from '@react-navigation/native'
import { useState, useEffect } from "react";
import { db } from "./firebase-config";
import { collection, getDocs } from "firebase/firestore";

const Stack = createNativeStackNavigator();


// TO DO: Change size of back button
export default function App({navigation}) {
  // const navigation = useNavigation();

  /*const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id })));
    };

    getUsers();
  })*/

  
  return (
    <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />

          <Stack.Screen options={{ headerShown: false }} name="Create Account 1" component={CreateAccount1} />

          <Stack.Screen options={{ headerShown: false }} name="Create Account 2" component={CreateAccount2} />
          <Stack.Screen options={{ headerShown: false }} name="Profile" component={ProfileScreen} />
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
                  <TouchableOpacity>
                    <FontAwesome5 name='envelope' size={35} color='#F6F6F6'/>
                  </TouchableOpacity>
                </View>
              )
            }} name="Home" component={HomeScreen} />
            
            <Stack.Screen 
            options={{
              title: 'Explore',
              headerTitleStyle: {
                color: '#F6F6F6',
                fontSize: 25
              },
              headerTitleAlign: 'center',
              headerTintColor: '#F6F6F6', // coloring for back button
              headerStyle: {
                backgroundColor: '#D28A8E',
              },
              headerRight: () => (
                <View>
                  <TouchableOpacity>
                    <FontAwesome5 name='envelope' size={35} color='#F6F6F6'/>
                  </TouchableOpacity>
                </View>
              )
            }} name="Explore" component={ExploreScreen} />
            
            {/* <Stack.Screen 
            options={{
              title: 'Create Post',
              headerTitleStyle: {
                color: '#F6F6F6',
                fontSize: 25
              },
              headerTitleAlign: 'center',
              headerTintColor: '#F6F6F6', // coloring for back button
              headerStyle: {
                backgroundColor: '#F8C98A',
              },
              headerRight: () => (
                <View>
                  <TouchableOpacity
                    style={styles.nextButton}
                    onPress={() =>  navigation.navigate('Create Post 2')}> 
                        <Text style={styles.next}>Next</Text>
                        <AntDesign name='arrowright' size={15} style={styles.rightArrow}/>
                  </TouchableOpacity>
                  <View>
                    <CreatePost2 navigation={navigation}/>
                  </View>
                </View>
              )
            }} name="Create Post" component={CreatePost} /> */}

            <Stack.Screen options={{ headerShown: false }} name="Create Post" component={CreatePost} />
            
            <Stack.Screen
            options={{
              title: 'Create Post 2',
              headerTitleStyle: {
                color: '#F6F6F6',
                fontSize: 25
              },
              headerTitleAlign: 'center',
              headerTintColor: '#F6F6F6', // coloring for back button
              headerStyle: {
                backgroundColor: '#F8C98A',
              },
            }} name="Add Caption" component={CreatePost2} />
            
        </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  dreamscape: {
    fontSize: 80
  },
  backButton: {
    size: 35
  },
  nextButton: {
    backgroundColor: '#3A6496',
    borderRadius: 5,
    width: 70,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    opacity: .85
  },
  next: {
    fontSize: 15,
    padding: 5,
    color: '#F6F6F6',
  },
  rightArrow: {
    alignSelf:'center',
    color: '#F6F6F6'
  }
}) 

