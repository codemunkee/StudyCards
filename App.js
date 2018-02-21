import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { Constants } from 'expo';
import { TabNavigator, StackNavigator } from 'react-navigation';
import Home from './components/Home';
import DeckLinks from './components/DeckLinks';
import DeckView from './components/DeckView';

function StudyStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const MainNavigator = StackNavigator(
  {
    Home: {
      screen: DeckLinks,
    },
    DeckView: {
      screen: DeckView,
    },
  },
  {
    headerMode: 'none'
  }
)

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <StudyStatusBar backgroundColor="darkgray" barStyle="light-content" />
        <MainNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
