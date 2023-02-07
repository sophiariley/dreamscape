import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import NavigationBar from "../components/navigationBar";
// import HomeBar from "../components/homeBar";

const HomeScreen = ({route}) => {

    //const [data, setData] = useState('nothing');
    const data = route.params.paramKey;
    const toNavBar = () => {
        console.log("Home Screen data:", data);
        console.log("Home Screen route:", route.params.paramKey);
        //setData(route.params.paramKey);
        //return data;
    }
    const printData = () => {
        //setData(route.params.paramKey);
        console.log("Home Screen data:", data);
        console.log("Home Screen route:", route.params.paramKey);
    }

    //printData();
    toNavBar();

    return (
        <View style={styles.container}>
            <View style={styles.footer}>
                <NavigationBar toNavBar={data}/>
            </View>
            
        </View>
        
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    // the styling of the header, used for the home bar
    header: {
        position: 'absolute',
        bottom: 0,
        alignItems:'center'
    },
    // the styling of the footer, used for the navigation bar
    footer: {
        position: 'absolute',
        bottom: 0,
        alignItems:'center'
    }
})