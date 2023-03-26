import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";

const CreateTrip = ({onSave, onCancel}) => {
    return(
            <SafeAreaView style={styles.container}>
            <View style={styles.topContainer}>
                <TouchableOpacity onPress={onCancel} style={styles.cancelContainer}>
                        <Text>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onSave} style={styles.saveContainer}>
                <Text style={styles.buttonText}>Create</Text>
                </TouchableOpacity>
                <Text style={styles.text}>Create Trip</Text>
            </View>
            <ScrollView>
            </ScrollView>
        </SafeAreaView>
    )
}

export default CreateTrip;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    topContainer: {
        height: 50,
        flexDirection: 'row-reverse',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        width: '100%',
        borderBottomWidth: 1,
        borderColor: '#CCCCCC'
    },
    text: { 
        alignSelf: 'center',
        fontSize: 17,
        color: 'black',
    },
    saveContainer: {
        justifyContent: 'center',
        width: 50,
        height: 50,
        position: 'absolute',
        left: 0,
        top: 0,
    },
    cancelContainer: {
        justifyContent: 'center',
        width: 50,
        height: 50,
        position: 'absolute',
        right: 10,
        top: 0,
    },
    profileName: {
        color: '#3A6496', 
        fontSize: 14, 
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems:'center',
        backgroundColor: '#f2f2f2',
        padding: 12,
        borderBottomWidth: 1, 
        borderBottomColor:'black',
        justifyContent: 'space-between',
    },
    input: {
        flex: 1,
        fontSize: 14,
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 5,
        marginRight: 10,
        marginLeft: 2,
    },
    inputLabel: {
        fontSize: 14,
        color: 'black',
        width: 80
    },
    profilePicture: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 50
    }
});