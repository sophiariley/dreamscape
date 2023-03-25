import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const handlePostComment = () => {
    if (newComment !== '') {
      setComments([...comments, newComment]);
      setNewComment('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.header}>Comments</Text>
      </View>
      <View style={{ flex: 1 }}>
        {comments.map((comment, index) => (
          <View key={index} style={[styles.commentContainer, index === comments.length - 1 && { marginBottom: 80 }]}>
            <Text style={styles.commentText}>{comment}</Text>
          </View>
        ))}
      </View>
      <View style={[styles.inputContainer, {justifyContent: 'center' }]}>
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
    marginBottom: 10,
    marginTop: 10,
  },
  commentContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    padding: 10,
    marginBottom: 5,
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
});

export default Comments;
