import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import { getDecks } from '../utils/helpers';

export default function DeckLinks(props) {

  const decks = getDecks();
  const deckList = Object.keys(decks).map((deckKey) => {
    return decks[deckKey];
  })


  handlePress = (data) => {
    return () => {
      const  { navigate } = props.navigation;
      navigate('DeckView', data)
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
              badge={{ value: item.questions.length, textStyle: { color: 'powderblue' } }}
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
