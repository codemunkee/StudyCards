import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { Constants } from 'expo';
import { getDecks } from './utils/helpers';
import DeckLinks from './components/DeckLinks';

function StudyStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

export default class App extends React.Component {
  render() {
    const decks = getDecks();
    return (
      <View style={styles.container}>
        <StudyStatusBar backgroundColor="darkgray" barStyle="light-content" />
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
