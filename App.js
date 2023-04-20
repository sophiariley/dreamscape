import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Modal } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import CreatePost2 from './screens/CreatePost2';
import ExploreScreen from './screens/ExploreScreen';
import CreateAccount1 from './screens/CreateAccount1'
import CreateAccount2 from './screens/CreateAccount2'
import ProfileScreen from './screens/ProfileScreen';
import OtherProfileScreen from './screens/OtherProfileScreen';
import MessageScreen from './screens/MessageScreen';
import SettingsScreen from './screens/SettingsScreen';
import {FontAwesome5, AntDesign} from 'react-native-vector-icons';
import PostScreen from './screens/PostScreen';
import Comments from './screens/comments';
import Trips from './screens/Trips';
import TripScreen from './screens/TripScreen';
import CreateTrip from './screens/CreateTrip';
import { Entypo } from '@expo/vector-icons';
import { DataContext } from './DataContext';

const Stack = createNativeStackNavigator();

export default function App({navigation}) {
  const [uID, setUID] = React.useState('');
  const [modalVisible, setModalVisible] = React.useState(false);
    const handleSavePress= () => {
        setModalVisible(false);
    }
    const handleCancelPress= () => {
        setModalVisible(false);
    }
  console.log("App.js userID: ", uID);
  return (
    <DataContext.Provider value={{ uID, setUID }}>
    <NavigationContainer>
        <Stack.Navigator>
          
          <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />

          <Stack.Screen options={{ headerShown: false }} name="Reset Password" component={ResetPasswordScreen} />

          <Stack.Screen options={{ headerShown: false }} name="Create Account 1" component={CreateAccount1} />

          <Stack.Screen options={{ headerShown: false }} name="Create Account 2" component={CreateAccount2} />
          
          <Stack.Screen options={{ headerShown: false }} name="Profile" component={ProfileScreen} />

          <Stack.Screen options={{ headerShown: false }} name="OtherProfileScreen" component={OtherProfileScreen} />

          <Stack.Screen options={{ headerShown: false }} name="PostScreen" component={PostScreen} />

          <Stack.Screen options={{ headerShown: false }} name="TripScreen" component={TripScreen} />
          
          <Stack.Screen options={{ headerShown: false }} name="Comments" component={Comments} />

          <Stack.Screen options={{ headerShown: false }} name="CreateTrip" component={CreateTrip} />
          <Stack.Screen 
             options={() => ({
              title: 'Trips',
              headerTitleStyle: {
                color: '#F6F6F6',
                fontSize: 25
              },
              headerTitleAlign: 'center',
              headerBackVisible: false,
              headerStyle: {
                backgroundColor: '#D28A8E',
              },
               headerRight: () => (
                <View>
                  <TouchableOpacity onPress={() => {setModalVisible(true)}}>
                    <Entypo name='plus' size={35} color='#F6F6F6'/>
                  </TouchableOpacity>
                <Modal visible={modalVisible}>
                <CreateTrip uID={uID} onSave={handleSavePress} onCancel={handleCancelPress}/>
            </Modal>
                </View>
              )
            })} name="Trips" component={Trips} />

          <Stack.Screen 
            options={({ navigation }) => ({
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
              // headerRight: () => (
              //   <View>
              //     <TouchableOpacity 
              //       onPress={() =>  navigation.navigate('Messages')}>
              //       <FontAwesome5 name='envelope' size={35} color='#F6F6F6'/>
              //     </TouchableOpacity>
              //   </View>
              // )
            })} name="Home" component={HomeScreen} />
            
            <Stack.Screen 
            options={{
              title: 'Explore',
              headerTitleStyle: {
                color: '#F6F6F6',
                fontSize: 25
              },
              headerTitleAlign: 'center',
              headerBackVisible: false,
              headerStyle: {
                backgroundColor: '#D28A8E',
              }
            }} name="Explore" component={ExploreScreen} />
          
            <Stack.Screen
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
            }} name="Create Post" component={CreatePost2} />

            <Stack.Screen 
            options={{ 
              title: 'Messages',
              headerTitleStyle: {
                color: '#F6F6F6',
                fontSize: 25
              },
              headerTitleAlign: 'center',
              headerTintColor: '#F6F6F6', // coloring for back button
              headerStyle: {
                backgroundColor: '#D28A8E',
              }
            }} name="Messages" component={MessageScreen} />

            <Stack.Screen options={{ 
              title: 'Settings',
              headerTitleStyle: {
                color: '#F6F6F6',
                fontSize: 25
              },
              headerTitleAlign: 'center',
              headerTintColor: '#F6F6F6', // coloring for back button
              headerStyle: {
                backgroundColor: '#D28A8E',
              }
            }} name="Settings" component={SettingsScreen} />
            
        </Stack.Navigator>

    </NavigationContainer>
    </DataContext.Provider>
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