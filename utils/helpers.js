export function getDecks() {
  // we turn the object of objects that is deckData into an
  // array, we also add a property indicating the key of the
  // deck object in the array, this is required when we use
  // certain components like FlatList/ListItem
  return Object.keys(deckData).map((deckKey) => {
    return { key: deckKey, ...deckData[deckKey]};
  });
}

export function getDeck(deckKey) {
  return { key: deckKey, ...deckData[deckKey]};
}

export function saveDeckTitle(deckTitle) {
  console.log('Save Deck Title', deckTitle);
  // remove special characters and spaces for our deckKey
  const deckKey = deckTitle.replace(/[^A-Z0-9]/ig, '');
  deckData = {
    ...deckData,
    [deckKey]: {
      title: deckTitle,
      questions: []
    }
  }
}

export function addCardToDeck(key, question, answer) {
  console.log('helpers (addCardToDeck): Adding Card to Deck');
  deckData[key].questions.push({question, answer});
}

let deckData = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}
