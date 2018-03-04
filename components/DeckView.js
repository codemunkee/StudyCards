import React, { Component } from 'react';
import {
  ActivityIndicator,
  Button,
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { getDeck } from '../utils/helpers';
import { NavigationActions } from 'react-navigation';

class DeckView extends Component {

  state = {
    deckKey: this.props.navigation.state.params,
    dataLoaded: false,
  }

  handlePress = (data) => {
    const { navigate } = this.props.navigation;
    return () => {
      if (data === 'startQuiz') {
        navigate('QuizView', this.state.deckData);
      }
      if (data === 'addQuestion') {
        navigate('AddQuestion', this.state.deckData);
      }
      if (data === 'deckList') {
        this.props.navigation.dispatch(NavigationActions.reset({
          index: 0,
          key: null,
          actions: [NavigationActions.navigate(
            {
              routeName: 'Home',
              params: this.state.key
            }
          )]
        }));
      }
    }
  }

  async componentDidMount() {
    const deckData = await getDeck(this.state.deckKey);
    this.setState({
      dataLoaded: true,
      deckData
    })
  }

  render() {
    const { deckData, dataLoaded } = this.state;
    return (
      <View style={{ flex: 1 }}>
        { !dataLoaded && (
          <View style={styles.dataLoading}>
            <ActivityIndicator size="large" color="#2a2a66" />
            <Text>
              Loading Cards...
            </Text>
          </View>
        )}

        { dataLoaded && (
          <View style={styles.container}>
            <View style={styles.deckDetails}>
              <View style={styles.deckTitleContainer}>
                <Text style={styles.deckTitleText}>{deckData.title}</Text>
              </View>
              <View style={styles.deckCountContainer}>
                <Text style={styles.deckCountInteger}>{deckData.questions.length}</Text>
                <Text style={styles.deckCountText}>cards</Text>
              </View>
            </View>
            { deckData.questions.length > 0 && (
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
            )}
            <View style={styles.buttonContainer}>
              <View style={[styles.buttonBar, {flexDirection: 'row'}]}>
                <TouchableOpacity
                  onPress={this.handlePress('addQuestion')}
                  style={[styles.button, {backgroundColor: '#80ffaa'}]}
                >
                  <Text style={styles.buttonText}>ADD CARD</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={this.handlePress('deckList')}
                  style={[styles.button, {backgroundColor: 'lightgray'}]}
                >
                  <Text style={styles.buttonText}>ALL DECKS</Text>
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
    backgroundColor: 'aqua',
    marginLeft: 5,
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
