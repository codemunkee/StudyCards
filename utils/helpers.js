export function getDecks() {
  return deckData;
}

export function getDeck() {
  console.log('Get Deck');
}

export function saveDeckTitle() {
  console.log('Save Deck Title');
}

export function addCardToDeck() {
  console.log('Adding Card to Deck');
}

const deckData = {
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
