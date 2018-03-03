import { AsyncStorage } from 'react-native';

async function getStoredDecks() {
  let response = await AsyncStorage.getItem('deckData');
  let storedDeckData = await JSON.parse(response);
  return storedDeckData;
}

async function updateDeckData(newDeckData) {
  await AsyncStorage.setItem('deckData', JSON.stringify(newDeckData));
}

export async function getDecks() {
  let deckData = await getStoredDecks();
  if (!deckData) {
    // bootstrap with some data if this is the first time
    // that the app is being launched.
    console.log('bootstrapping');
    await updateDeckData(bootstrapDeckData);
    deckData = await getStoredDecks();
  }
  console.log('here', deckData)
  // we turn the object of objects that is deckData into an
  // array, we also add a property indicating the key of the
  // deck object in the array, this is required when we use
  // certain components like FlatList/ListItem
  return Object.keys(deckData).map((deckKey) => {
    return { key: deckKey, ...deckData[deckKey]};
  });
}

export async function getDeck(deckKey) {
  const deckData = await getStoredDecks();
  return { key: deckKey, ...deckData[deckKey]};
}

export async function saveDeckTitle(deckTitle) {
  const deckData = await getStoredDecks();
  // remove special characters and spaces for our deckKey
  const deckKey = deckTitle.replace(/[^A-Z0-9]/ig, '');
  const newDeckData = {
    ...deckData,
    [deckKey]: {
      title: deckTitle,
      questions: []
    }
  }
  await updateDeckData(newDeckData);
}

export async function addCardToDeck(key, question, answer) {
  console.log("Adding new card")
  let newDeckData = await getStoredDecks();
  newDeckData[key].questions.push({question, answer});
  await updateDeckData(newDeckData);
}

let bootstrapDeckData = {
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
