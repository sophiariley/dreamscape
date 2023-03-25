import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/core';

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const navigation = useNavigation();

  const handlePostComment = () => {
    if (newComment !== '') {
      setComments([...comments, newComment]);
      setNewComment('');
    }
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={{borderBottomWidth: 1, borderColor: '#ccc'}}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, marginBottom: 10 }}>
          <Ionicons name='chevron-back' size={30} onPress={handleBackPress} />
          <Text style={styles.header}>Comments</Text>
          <View style={{ width: 30 }} />
        </View>
      </View>
        <View style={{flexDirection: 'row', alignItems: 'baseline', marginBottom: 5}}>
          <Text style={[styles.profileName, {marginLeft: 5, marginTop: 5, marginRight: 5}]}>john_travels</Text>
          <Text style={{fontSize: 13}}>Caption</Text>
        </View>
      <ScrollView style={{ flex: 1 }}>
        {comments.map((comment, index) => (
          <View key={index} style={[styles.commentContainer, index === comments.length - 1]}>
            <Text style={[styles.profileName, {marginLeft: 5, marginTop: 5, marginRight: 5}]}>john_travels</Text>
            <Text style={{fontSize: 13}}>{comment}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={[styles.inputContainer, { justifyContent: 'center' }]}>
        <TextInput
          style={[styles.input, { borderRadius: 20 }]}
          value={newComment}
          placeholder="Write a comment..."
          onChangeText={setNewComment}
        />
        <Ionicons name='send' size={30} color={'#3A6496'} onPress={handlePostComment} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    flex: 1,
  },
  commentContainer: {
    borderRadius: 5,
    marginBottom: 5,
    flexDirection: 'row', 
    alignItems: 'baseline'
  },
  commentText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  input: {
    flex: 1,
    marginRight: 10,
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
  },
  profileName: {
    color: '#3A6496', 
    fontSize: 13, 
    fontWeight: 'bold',
    },
});

export default Comments;
