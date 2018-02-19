import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getDecks } from './utils/helpers';
import DeckLink from './components/DeckLink';

export default class App extends React.Component {
  render() {
    const decks = getDecks();
    console.log(decks);
    return (
      <View style={styles.container}>
        { Object.keys(decks).map(deck =>
          <DeckLink
            key={decks[deck].title}
            deck={decks[deck]}
          />)
        }
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
