import React from 'react';
import {TextInput} from 'react-native';
import Story from 'react-native-story';

function Stories() {
  const stories = [
    {
      id: '4',
      source: require('../../assets/corn.jpg'),
      user: 'Ugur Erdal',
      avatar: require('../../assets/corn.jpg'),
    },
    {
      id: '2',
      source: 'https://picsum.photos/1080/1920',
      user: 'Mustafa',
      avatar: require('../../assets/corn.jpg'),
    },
    {
      id: '5',
      source: require('../../assets/corn.jpg'),
      user: 'Emre Yilmaz',
      avatar: require('../../assets/corn.jpg'),
    },
    {
      id: '3',
      source: require('../../assets/corn.jpg'),
      user: 'Cenk Gun',
      avatar: require('../../assets/corn.jpg'),
    },
  ];

  return (
    <Story
      unPressedBorderColor="#e95950"
      pressedBorderColor="#ebebeb"
      stories={stories}
      footerComponent={
        <TextInput placeholder="Send message" placeholderTextColor="white" />
      }
    />
  );
}

export default Stories;
