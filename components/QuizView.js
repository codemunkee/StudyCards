import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons'

class QuizView extends Component {
  state = {
    deckData: this.props.navigation.state.params,
    showFront: true,
    activeQuestion: 0,
    correctQs: 0,
    incorrectQs: 0,
    quizOver: false,
  }

  flipCard() {
    if (this.state.showFront) {
      this.setState({
        showFront: false,
      })
    } else {
      this.setState({
        showFront: true,
      })
    }
  }

  answer(data) {
    return () => {
      const { correctQs, incorrectQs, activeQuestion, deckData } = this.state;
      if (data === 'correct') {
        this.setState({
          correctQs: correctQs + 1,
          showFront: true,
          activeQuestion: activeQuestion + 1,
          quizOver: ((correctQs + incorrectQs + 1) === deckData.questions.length)
            ? true : false,
        })
      }
      if (data === 'incorrect') {
        this.setState({
          incorrectQs: incorrectQs + 1,
          showFront: true,
          activeQuestion: activeQuestion + 1,
          quizOver: ((correctQs + incorrectQs + 1) === deckData.questions.length)
            ? true : false,
        })
      }
    }
  }

  render() {
    const { title, questions } = this.state.deckData;
    const { activeQuestion, quizOver, correctQs, incorrectQs } = this.state;

    console.log('STATE', this.state);

    return (
      <View style={styles.container}>
        { quizOver && (
          <View style={styles.container}>
            <Text>Quiz Over!</Text>
          </View>
        )}
        { !quizOver && (
          <View style={styles.container}>
            <View style={{paddingTop: 40, paddingBottom: 40, alignItems: 'center'}}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>{title} Quiz</Text>
              <Text>Question {activeQuestion + 1}/{questions.length}</Text>
            </View>
            <View>
              <TouchableOpacity onPress={() => this.flipCard()} activeOpacity={1}>
                { this.state.showFront && (
                  <View style={[styles.flipCard]}>
                    <Text style={styles.flipText}>
                      {questions[activeQuestion].question}
                    </Text>
                    <FontAwesome name="share" size={30} color="#2a2a66" style={{paddingTop: 20}} />
                  </View>
                )}
                { !this.state.showFront && (
                  <View style={[styles.flipCard, styles.flipCardBack]}>
                    <Text style={styles.flipText}>
                      {questions[activeQuestion].answer}
                    </Text>
                    <FontAwesome name="share" size={30} color="#2a2a66" style={{paddingTop: 20}} />
                  </View>
                )}
              </TouchableOpacity>
              <View style={styles.answerButtonContainer}>
                <TouchableOpacity
                  style={[styles.answerButton, styles.answerButtonLeft]}
                  onPress={this.answer('correct')}
                >
                  <FontAwesome name="thumbs-up" size={20} color="#2a2a66" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.answerButton, styles.answerButtonRight]}
                  onPress={this.answer('incorrect')}
                >
                  <FontAwesome name="thumbs-down" size={20} color="#2a2a66" />
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
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  flipCard: {
    width: 300,
    height: 300,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'skyblue',
    backfaceVisibility: 'hidden',
    shadowOpacity: .9,
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  flipCardBack: {
    backgroundColor: 'powderblue',
    top: 0,
  },
  flipText: {
    fontSize: 18,
    paddingLeft: 5,
    paddingRight: 5,
  },
  answerButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 40,
  },
  answerButton: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'lightgray',
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  answerButtonLeft: {
    backgroundColor: 'lightgreen',
    marginLeft: 20,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,

  },
  answerButtonRight: {
    backgroundColor: 'pink',
    marginRight: 20,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
});

export default QuizView;
