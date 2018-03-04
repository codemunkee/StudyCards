import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput
} from 'react-native';
import { saveDeckTitle } from '../utils/helpers';
import { NavigationActions } from 'react-navigation';

class AddDeck extends Component {

  constructor() {
    super();
    this.state = {
      deckTitleText: '',
      submitBlocked: false,
    }
  }

  submitDeck() {
    return async () => {
      const { key, deckTitleText } = this.state;
      if (!deckTitleText) {
        this.setState({
          submitBlocked: true
        });
      } else {
        await saveDeckTitle(deckTitleText);
        this.props.navigation.dispatch(NavigationActions.reset({
          index: 0,
          key: null,
          actions: [NavigationActions
            .navigate({
              routeName: 'DeckView',
              params: deckTitleText.replace(/[^A-Z0-9]/ig, '')
            })]
        }));
      }
    }
  }

  render() {
    const { deckTitleText, submitBlocked } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={{ fontSize: 25, color: 'darkblue'}}>
            Add New Deck
          </Text>
        </View>
        <View style={styles.inputView}>
          <Text style={styles.inputHeading}>Deck Title
            { submitBlocked && !deckTitleText && (
              <View style={styles.inputRequired}>
                <Text style={{ color: 'red' }}>
                (Required)
                </Text>
              </View>
            )}
          </Text>
          <TextInput
            style={styles.questionInput}
            multiline={true}
            onChangeText={(deckTitleText) => this.setState({deckTitleText})}
            value={this.state.deckTitleText}
          />
        </View>
        <View style={styles.buttonView}>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={this.submitDeck()}
          >
            <Text style={styles.buttonText}>SUBMIT</Text>
          </TouchableOpacity>
        </View>
      </View>

    )
  }
}

styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    height: 80,
    backgroundColor: 'skyblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputView: {
    flex: 1,
    height: 50,
    backgroundColor: 'powderblue',
    paddingBottom: 40
  },
  inputHeading: {
    fontSize: 20,
    padding: 5,
  },
  inputRequired: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 5,
  },
  questionInput: {
    height: 40,
    backgroundColor: 'white',
    marginLeft: 10,
    marginRight: 10,
  },
  answerInput: {
    height: 80,
    backgroundColor: 'white',
    marginLeft: 10,
    marginRight: 10,
  },
  buttonView: {
    flex: 2, backgroundColor: 'powderblue', alignItems: 'center'
  },
  submitButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 120,
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

export default AddDeck;
