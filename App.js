import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ExploreScreen from './screens/ExploreScreen';
import {FontAwesome5, AntDesign} from 'react-native-vector-icons';
import {useNavigation} from '@react-navigation/native'

const Stack = createNativeStackNavigator();


// TO DO: Change size of back button
export default function App({navigation}) {
  // const navigation = useNavigation();
  return (
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
                  <TouchableOpacity style={styles.button}>
                    <FontAwesome5 name='envelope' size={35} color='#F6F6F6'/>
                  </TouchableOpacity>
                </View>
              )
            }} name="Explore" component={ExploreScreen} />
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
  }
}) 

