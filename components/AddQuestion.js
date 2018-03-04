import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput
} from 'react-native';
import { addCardToDeck } from '../utils/helpers';
import { NavigationActions } from 'react-navigation';

class AddQuestion extends Component {

  state = {
    key: this.props.navigation.state.params.key,
    title: this.props.navigation.state.params.title,
    questionText: '',
    answerText: '',
    submitBlocked: false,
  }

  submitQA() {
    return async () => {
      const { key, questionText, answerText } = this.state;
      if (!questionText || !answerText) {
        this.setState({
          submitBlocked: true
        });
      } else {
        await addCardToDeck(key, questionText, answerText);
        this.props.navigation.dispatch(NavigationActions.reset({
          index: 0,
          key: null,
          actions: [NavigationActions.navigate(
            {
              routeName: 'DeckView',
              params: this.state.key
            }
          )]
        }));

      }
    }
  }

  render() {
    const { key, title, questionText, answerText, submitBlocked } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={{ fontSize: 40}}>
            {title}
          </Text>
          <Text style={{ fontSize: 25, color: 'gray'}}>
            Add New Question
          </Text>
        </View>
        <View style={styles.inputView}>
          <Text style={styles.inputHeading}>Question
            { submitBlocked && !questionText && (
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
            onChangeText={(questionText) => this.setState({questionText})}
            value={this.state.questionText}
          />
          <Text style={styles.inputHeading}>Answer
            { submitBlocked && !answerText && (
              <View style={styles.inputRequired}>
                <Text style={{ color: 'red', paddingLeft: 5 }}>
                (Required)
                </Text>
              </View>
            )}
          </Text>
          <TextInput
            style={styles.answerInput}
            multiline={true}
            onChangeText={(answerText) => this.setState({answerText})}
            value={this.state.answerText}
          />
        </View>
        <View style={styles.buttonView}>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={this.submitQA()}
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

export default AddQuestion;
