import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import { getDecks } from '../utils/helpers';

class DeckLinks extends Component {

  state = {
    deckList: [],
  }

  handlePress = (data) => {
    return () => {
      const  { navigate } = this.props.navigation;
      navigate('DeckView', data)
    }
  }

  componentDidMount() {
    console.log('DeckLinks: Called componentDidMount')
    const deckList = getDecks();
    this.setState({
      deckList
    })
  }

  render() {
    const { deckList } = this.state;
    console.log('DeckLinks (deckList):', deckList);
    return (
      <FlatList
          data={deckList}
          renderItem={({ item }) => (
              <ListItem
                containerStyle={styles.container}
                key={item.title}
                title={item.title}
                badge={{ value: item.questions.length, textStyle: { color: 'powderblue' } }}
                onPress={this.handlePress(item.title)}
              />
          )}
      />
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

export default DeckLinks;
