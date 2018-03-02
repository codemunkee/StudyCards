import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput
} from 'react-native';

class AddQuestion extends Component {

  render() {
    const { key, title } = this.props.navigation.state.params;
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
          <Text style={styles.inputHeading}>Question</Text>
          <TextInput
            style={styles.questionInput}
            multiline={true}
          />
          <Text style={styles.inputHeading}>Answer</Text>
          <TextInput
            style={styles.answerInput}
            multiline={true}
          />
        </View>
        <View style={styles.buttonView}>
          <TouchableOpacity style={styles.submitButton}>
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
