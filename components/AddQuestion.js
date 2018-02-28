import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

class AddQuestion extends Component {

  render() {
    console.log(this.props)
    return (
      <View style={{ flex: 1 }}>
        <Text>Add Question View</Text>
      </View>
    )
  }
}

export default AddQuestion;
