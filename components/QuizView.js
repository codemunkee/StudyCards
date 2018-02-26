import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated
} from 'react-native';

class QuizView extends Component {
  state = {
    deckData: this.props.navigation.state.params,
    showFront: true,
    activeQuestion: 0,
    quizOver: false,
  }

  componentWillMount() {
    this.animatedValue = new Animated.Value(0);
    this.value = 0;
    this.animatedValue.addListener(({ value }) => {
      this.value = value;
    })
    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    })
    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg']
    })
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
    if (this.value >= 90) {
      Animated.spring(this.animatedValue,{
        toValue: 0,
        friction: 18,
        tension: 2
      }).start();
    } else {
      Animated.spring(this.animatedValue,{
        toValue: 180,
        friction: 18,
        tension: 2
      }).start();
    }
  }

  render() {
    const { title, questions } = this.state.deckData;
    const { question, answer } = questions[this.state.activeQuestion];
    console.log(questions)

    const frontAnimatedStyle = {
      transform: [
        { rotateY: this.frontInterpolate}
      ]
    }
    const backAnimatedStyle = {
      transform: [
        { rotateY: this.backInterpolate }
      ]
    }

    return (
      <View style={styles.container}>
        <View style={{backgroundColor: 'orange', paddingBottom: 40}}>
          <Text>{title} Quiz View</Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => this.flipCard()} activeOpacity={1}>
            { this.state.showFront && (
              <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
                <Text style={styles.flipText}>
                  Question
                  {question}
                </Text>
              </Animated.View>
            )}
            { !this.state.showFront && (
              <Animated.View style={[backAnimatedStyle, styles.flipCard, styles.flipCardBack]}>
                <Text style={styles.flipText}>
                  Answer
                  {answer}
                </Text>
              </Animated.View>
            )}
          </TouchableOpacity>
        </View>
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
    backgroundColor: 'blue',
    backfaceVisibility: 'hidden',
  },
  flipCardBack: {
    backgroundColor: "red",
    top: 0,
  },
  flipText: {
    width: 190,
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  }
});

export default QuizView;
