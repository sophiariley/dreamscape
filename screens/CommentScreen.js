import { FontAwesome, Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Comments({visible, onClose}) {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.captionContainer}>
                    <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
                            <Text style={[styles.profileName, {marginLeft: 15, marginRight: 10}]}>john_travels</Text>
                            <Text style={styles.caption}>Caption appears here!</Text>
                    </View>   
                </View>
                <View style={styles.commentContainer}>
                    <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
                            <Text style={[styles.profileName, {marginLeft: 15, marginRight: 10}]}>johns_bestie</Text>
                            <Text style={styles.comment}>Comments appear here!</Text>
                    </View>  
                </View>
            </ScrollView>
            <View style={styles.inputContainer}>
             <TextInput 
                style={styles.input}    
                placeholder="Add a comment..."
                placeholderTextColor= '#3A6496'
            />
            <Ionicons name='send' size={20} color= '#3A6496'/>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
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
        fontSize: 18, 
        fontWeight: 'bold',
    },
    captionContainer: {
        borderBottomColor: 'rgba(217,217,217, 0.7)',
        borderBottomWidth: 1
    },
    caption:
    {
        fontSize: 18,
        paddingBottom: 20
    },
    commentContainer: {
        paddingTop: 20,
        paddingBottom: 20
    },
    comment:
    {
        fontSize: 18
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
        padding: 10,
        borderTopWidth: 1,
        borderColor: '#CCCCCC'
    },
     input: {
        flex: 1,
        fontSize: 20,
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 10,
        marginRight: 10,
        marginLeft: 2,
        color: '#3A6496'
    },
});
