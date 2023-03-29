import { FontAwesome, Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Comments({visible, onClose}) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topContainer}>
                <TouchableOpacity onPress={onClose} style={styles.buttonContainer}>
                    <Ionicons name='chevron-back' size={35} />
                </TouchableOpacity>
                <Text style={styles.text}>Comments</Text>
            </View>
            <ScrollView>
                <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
                        <Text style={[styles.profileName, {marginLeft: 10, marginTop: 5, marginRight: 5}]}>john_travels</Text>
                        <Text style={styles.caption}>Caption</Text>
                </View>   
            </ScrollView>
            <View style={styles.inputContainer}>
             <TextInput 
                style={styles.input}    
                placeholder="Add a comment..."
            />
            <Ionicons name='send' size={20}/>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    topContainer: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        width: '100%',
        borderBottomWidth: 1,
        borderColor: '#CCCCCC'
    },
    // styling for the text
    text: { 
        alignSelf: 'center',
        fontSize: 17,
        color: 'black',
    },
    // styling for the button's container
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        position: 'absolute',
        left: 0,
        top: 0,
    },
    profileName: {
        color: '#3A6496', 
        fontSize: 14, 
        fontWeight: 'bold',
    },
        caption:
    {
        fontSize: 14,

    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
        padding: 5,
        borderTopWidth: 1,
        borderColor: '#CCCCCC',
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
});
