import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import { getDecks } from '../utils/helpers';

export default function DeckLinks(props) {

  const deckList = getDecks();

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
