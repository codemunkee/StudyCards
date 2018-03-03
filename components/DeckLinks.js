import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import { getDecks } from '../utils/helpers';
import { FontAwesome } from '@expo/vector-icons'

class DeckLinks extends Component {

  state = {
    deckList: [],
  }

  goToDeck = (deckKey) => {
    return () => {
      const  { navigate } = this.props.navigation;
      navigate('DeckView', deckKey);
    }
  }

  addDeck = () => {
    this.props.navigation.navigate('AddDeck');
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
      <View>
        <TouchableOpacity
          style={styles.addDeckContainer}
          onPress={this.addDeck}
        >
          <Text style={styles.addDeckText}>
            Add a Deck
          </Text>
          <View style={{ marginLeft: 5}}>
            <FontAwesome
              name="plus"
              size={20}
              color="#2a2a66"
            />
          </View>
        </TouchableOpacity>
        <FlatList
            data={deckList}
            renderItem={({ item }) => (
                <ListItem
                  containerStyle={styles.listContainer}
                  key={item.title}
                  title={item.title}
                  badge={{ value: item.questions.length, textStyle: { color: 'powderblue' } }}
                  onPress={this.goToDeck(item.key)}
                />
            )}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  addDeckContainer: {
    height: 50,
    backgroundColor: 'lightgreen',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'darkgray',
    borderWidth: 2,
    flexDirection: 'row',
  },
  addDeckText: {
    fontSize: 20,
  },
  listContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'lightgray',
  }
})

export default DeckLinks;
