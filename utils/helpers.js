import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';

const NOTIFICATION_KEY = 'StudyCards:notifications';

export function timeToString (time = Date.now()) {
  const date = new Date(time)
  const todayUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  return todayUTC.toISOString().split('T')[0]
}

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync())
}

function createNotification() {
  return {
    title: 'Study your decks',
    body: '👋 do not forget to study one of your decks today!',
    ios: {
      sound: true,
    },
  }
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({status}) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationAsync();
              let tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1);
              tomorrow.setHours(9);
              tomorrow.setMinutes(45);

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
            }
          })
      }
    });
}

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
    await updateDeckData(bootstrapDeckData);
    deckData = await getStoredDecks();
  }
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
