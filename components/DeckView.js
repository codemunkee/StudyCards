import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

export default function DeckView(props) {

  handlePress = (data) => {
    return () => {
      console.log(`${data} was pressed!`);
    }
  }

  return (
    <View style={{flex: 1}}>
      <Text>
        {props.navigation.state.params}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'lightgray',
  }
})
