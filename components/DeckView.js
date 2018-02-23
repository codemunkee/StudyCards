import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { getDeck } from '../utils/helpers'

class DeckView extends Component {

  state = {
    dataLoaded: false,
    deckData: {},
  }

  handlePress = (data) => {
    return () => {
      console.log(`${data} was pressed!`);
    }
  }

  componentDidMount() {
    const deckData = getDeck(this.props.navigation.state.params);
    this.setState({
      dataLoaded: true,
      deckData,
    })
  }

  render() {
    const { deckData, dataLoaded } = this.state;
    return (
      <View style={{flex: 1}}>
        <View>
          <Text>
            {this.props.navigation.state.params}
          </Text>
        </View>

        { this.state.dataLoaded && (
          <View>
            <View>
              <Text>{this.state.deckData.questions.length}</Text>
            </View>
            <View>
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
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'lightgray',
  }
})

export default DeckView;
