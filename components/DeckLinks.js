import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';

export default function DeckLinks({ decks }) {
  console.log('called', decks)
  const deckList = Object.keys(decks).map((deckKey) => {
    return decks[deckKey];
  })
  console.log(deckList);
  return (
    <FlatList
        data={deckList}
        renderItem={({ item }) => (
            <ListItem
              containerStyle={styles.container}
              key={item.title}
              title="Oh Yay"
              badge={{ value: 3, textStyle: { color: 'orange' } }}
            />
        )}
        keyExtractor={(item, index) => index}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'gray',
  }
})
