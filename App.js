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
    headerMode: 'float',
    navigationOptions: {
      title: 'StudyCards',
      headerBackTitle: null,
      headerStyle: {
        backgroundColor: 'lightblue',
        height: 24,
        paddingBottom: 10,
      },
      headerTitleStyle: {
        fontFamily: 'Futura',
        fontSize: 30,
        paddingBottom: 10,
        color: '#2a2a66',
      },
    },
  }
)

export default class App extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StudyStatusBar backgroundColor="lightblue" barStyle="dark-content" />
        <MainNavigator />
      </View>
    );
  }
}
