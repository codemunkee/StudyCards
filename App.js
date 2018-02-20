import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getDecks } from './utils/helpers';
import DeckLinks from './components/DeckLinks';

export default class App extends React.Component {
  render() {
    const decks = getDecks();
    console.log(decks);
    return (
      <View style={styles.container}>
        <DeckLinks decks={decks} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
