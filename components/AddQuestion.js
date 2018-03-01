import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
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
        <View style={{ flex: 1, height: 50, backgroundColor: 'powderblue'}}>
          <Text>Add Question</Text>
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
})

export default AddQuestion;
