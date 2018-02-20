import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getDecks } from './utils/helpers';
import DeckLinks from './components/DeckLinks';

export default class App extends React.Component {
  render() {
    const decks = getDecks();
    return (
      <View style={styles.container}>
        <DeckLinks style={{flex: 1}} decks={decks} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
