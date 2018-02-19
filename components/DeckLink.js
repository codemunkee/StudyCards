import React from 'react';
import { View, Text } from 'react-native';

export default function DeckLink({ deck }) {
  console.log('called', deck)
  return (
    <View>
      <Text>{deck.title}</Text>
    </View>
  )
}
