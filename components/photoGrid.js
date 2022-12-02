import React from "react";
import {View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, FlatList } from "react-native";

const Images = [
    {url: require('../assets/posts/image1.jpg')},
    {url: require('../assets/posts/image2.jpg')},
    {url: require('../assets/posts/image3.jpg')},
    {url: require('../assets/posts/image4.jpg')},
    {url: require('../assets/posts/image5.jpg')},
    {url: require('../assets/posts/image6.jpg')},
    {url: require('../assets/posts/image7.jpg')},
    {url: require('../assets/posts/image8.jpg')},
    {url: require('../assets/posts/image9.jpg')},
    {url: require('../assets/posts/image10.jpg')}
]

let {width: screenWidth, height: screenHeight} = Dimensions.get('window');

export default function photoGrid() {
    return (
    <View>
        <FlatList 
            data={Images}
            renderItem = {item => {
                return (
                    <View style={{flex: 1, marginBottom: 2}}>
                        <TouchableOpacity>
                        <Image 
                            source={item.item.url}
                            style={{
                                height: screenWidth/3,
                                width: screenWidth/3 - 2
                            }}
                        />
                        </TouchableOpacity>
                    </View>
                )}
            }
            onLayout= { e => {
                const {width,height} = e.nativeEvent.layout
                console.log(height);
            }}
            numColumns={3}
            key={'_'}
        />
    </View>
    )
}