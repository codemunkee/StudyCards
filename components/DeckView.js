import React, { Component } from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { getDeck } from '../utils/helpers'

class DeckView extends Component {

  state = {
    deckTitle: this.props.navigation.state.params,
    dataLoaded: false,
  }

  handlePress = (data) => {
    return () => {
      console.log(`${data} was pressed!`);
    }
  }

  componentDidMount() {
    const deckData = getDeck(this.state.deckTitle);
    this.setState({
      dataLoaded: true,
      deckData,
    })
  }

  render() {
    const { deckTitle, deckData, dataLoaded } = this.state;
    return (
      <View style={{ flex: 1 }}>
        { !dataLoaded && (
          <View style={styles.dataLoading}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>
              Loading {deckTitle} Cards...
            </Text>
          </View>
        )}

        { this.state.dataLoaded && (
          <View>
            <View style={styles.deckDetails}>
              <Text>{deckData.questions.length}</Text>
              <Text>{JSON.stringify(deckData.questions)}</Text>
            </View>
            <View style={styles.deckQuestions}>
              <Text>Start Quiz</Text>
            </View>
            <View>
              <Text>Add a New Question</Text>
            </View>
          </View>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  dataLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    backgroundColor: 'powderblue',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  titleText: {
    backgroundColor: 'lightblue',
    fontSize: 30,
  },
  deckDetails: {
    backgroundColor: 'lightblue',
  },
  deckQuestions: {
    backgroundColor: 'steelblue',
  },
})

export default DeckView;
