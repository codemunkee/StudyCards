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
            <ActivityIndicator size="large" color="#2a2a66" />
            <Text>
              Loading {deckTitle} Cards...
            </Text>
          </View>
        )}

        { this.state.dataLoaded && (
          <View style={styles.container}>
            <View style={styles.deckDetails}>
              <View style={styles.deckTitleContainer}>
                <Text style={styles.deckTitleText}>{deckTitle}</Text>
              </View>
              <View style={styles.deckCountContainer}>
                <Text style={styles.deckCountInteger}>{deckData.questions.length}</Text>
                <Text style={styles.deckCountText}>cards</Text>
              </View>
            </View>
            <View style={styles.quizButton}>
              <Text>Start Quiz</Text>
            </View>
            <View style={styles.addQuestionButton}>
              <Text>Add a New Question</Text>
            </View>
          </View>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  dataLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deckDetails: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deckTitleContainer: {
    flex: 2,
    height: 70,
    backgroundColor: 'skyblue',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deckTitleText: {
    fontSize: 40,
    backgroundColor: 'skyblue',
  },
  deckCountContainer: {
    flex: 1,
    height: 70,
    backgroundColor: 'lightblue',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deckCountInteger: {
    fontSize: 30,
  },
  deckCountText: {
    fontSize: 20,
  },
  quizButton: {
    flex: 1,
  },
  addQuestionButton: {
    flex: 1,
  },
})

export default DeckView;
