import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';

export default function DeckLinks({ decks }) {

  const deckList = Object.keys(decks).map((deckKey) => {
    return decks[deckKey];
  })

  handlePress = (data) => {
    return () => {
      console.log(`${data} was pressed!`);
    }
  }

  return (
    <FlatList
        data={deckList}
        renderItem={({ item }) => (
            <ListItem
              containerStyle={styles.container}
              key={item.title}
              title={item.title}
              badge={{ value: item.questions.length, textStyle: { color: 'orange' } }}
              onPress={this.handlePress(item.title)}
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
    backgroundColor: 'lightgray',
  }
})
