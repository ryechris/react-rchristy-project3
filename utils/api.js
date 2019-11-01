import { AsyncStorage } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Notifications } from 'expo';

const DECK_STORAGE_KEY = 'fcDeck'
const NOTIFICATION_KEY = 'fcNotification'

function setDummyData () {
  let dummyData = {
    poijasdfjpo: {
      title: 'poijasdfjpo',
      questions: []
    }
  }
  AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(dummyData))
  return dummyData
}

function processResults (results) {
  return results === null
    ? setDummyData()
    : JSON.parse(results)
}

export function fetchDecks() {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then(processResults)
}

export function addDeck (deckTitle) {
  AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
    [deckTitle]: {
      title: deckTitle,
      questions: []
    }
  }))
}

export function addCard (deckTitle, questions) {
  AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
    [deckTitle]: {
      title: deckTitle,
      questions
    }
  }))
}

export function deleteDeck (deckTitle) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[deckTitle] = undefined
      delete data[deckTitle]
      AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
    })
}

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification() {
  return {
    title: 'Study time',
    body: 'Check out that quiz you made!',
    ios: {
      sound: true
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true
    }
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
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() * 1)
              tomorrow.setHours(20)
              tomorrow.setMinutes(0)

              Notifications.scheduleLocalNotificationAsync(
                createNotification(), {
                  time: tomorrow,
                  repeat: 'day'
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}
