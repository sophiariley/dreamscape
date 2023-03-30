import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/core';

import { db, storage } from "../firebase-config";
import { getStorage, ref, getDownloadURL, } from "firebase/storage"
import { collection, query, where, onSnapshot, getDocs, getDoc, getDocuments, doc, snapshotEqual, getCountFromServer, addDoc } from "firebase/firestore";

const Comments = ({route}) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const navigation = useNavigation();

  // // PostID and UserID of poster
  const postID = route.params.postID;
  const posterID = route.params.posterID;
  const posterUsername = route.params.posterUsername;
  const caption = route.params.caption;
  const userID = route.params.userID;
  const username = route.params.username;


  const handlePostComment = () => {
    if (newComment !== '') {
      setComments([...comments, {username: username, comment: newComment}]);
      addComment();
      setNewComment('');
    }
  };


  const addComment = async () => {
    // const posterDoc = doc(db, "users", posterID);
    const docRef = doc(doc(db, "users", posterID), "userPosts", postID);

    await addDoc(collection(docRef, 'comments'), {
        username: username,
        comment: newComment,
        //timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
  }

  const handleBackPress = () => {
    navigation.goBack();
  };

  // Populating Comments / / / / / / / / / / / / / / / / / / / / / / / / / / / / /

  async function doItAll() {
    populateComments();
  }

  async function populateComments() {
    const commentArr = [];
    
    const posterDoc = doc(db, "users", posterID);
    const docRef = doc(posterDoc, "userPosts", postID);
    const commentCollection = await getDocs(collection(docRef, "comments"));
    commentCollection.forEach(async (doc) => {
      commentArr.push({username: doc.data().username, comment: doc.data().comment});
    });

    // for (let i = 0; i < commentArr.length; i++) {
    //   console.log("username: ", commentArr[i].username);
    // }

    if (!(JSON.stringify(commentArr) == JSON.stringify(comments))) {
      setComments(commentArr);
      for (let i = 0; i < comments.length; i++) {
        // console.log("username: ", comments[i].username);
      }
    }
  }

  doItAll();

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
          <Text style={[styles.profileName, {marginLeft: 5, marginTop: 5, marginRight: 5}]}>{posterUsername}</Text>
          <Text style={{fontSize: 13}}>{caption}</Text>
        </View>
      <ScrollView style={{ flex: 1 }}>
        {comments.map((comment, index) => (
          <View key={index} style={[styles.commentContainer, index === comments.length - 1]}>
            <Text style={[styles.profileName, {marginLeft: 5, marginTop: 5, marginRight: 5}]}>{comment.username}</Text>
            <Text style={{fontSize: 13}}>{comment.comment}</Text>
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
