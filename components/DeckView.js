import React, { Component } from 'react';
import {
  ActivityIndicator,
  Button,
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons'
import { getDeck } from '../utils/helpers'

class DeckView extends Component {

  state = {
    deckTitle: this.props.navigation.state.params,
    dataLoaded: false,
  }

  handlePress = (data) => {
    return () => {
      if (data === 'startQuiz') {
        this.props.navigation.navigate('QuizView', this.state.deckData)
      }
      if (data === 'addQuestion') {
        this.props.navigation.navigate('AddQuestion', this.state.deckData)
      }
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
            <View style={styles.buttonContainer}>
              <View style={styles.buttonBar}>
                <TouchableOpacity
                  onPress={this.handlePress('startQuiz')}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>START QUIZ</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <View style={styles.buttonBar}>
                <TouchableOpacity
                  onPress={this.handlePress('addQuestion')}
                  style={[styles.button, {backgroundColor: 'lightgray'}]}
                >
                  <Text style={styles.buttonText}>ADD QUESTION</Text>
                </TouchableOpacity>
              </View>
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
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonBar: {
    flex: 1,
    height: 70,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#80ffaa',
    borderRadius: 15,
    shadowOpacity: .9,
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  buttonText: {
    padding: 15,
    fontSize: 20,
  }
})

export default DeckView;
