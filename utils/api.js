import { AsyncStorage } from 'react-native'

const DECK_STORAGE_KEY = 'fcDeck'

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

/*

export function submitEntry ({ entry, key }) {
  return AsyncStorage.mergeItem(CALENDAR_STORAGE_KEY, JSON.stringify({
    [key]: entry
  }))
}

export function removeEntry (key) {
  return AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[key] = undefined
      delete data[key]
      AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(data))
    })
}

export function fetchCalendarResults() {
  return AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
    .then(formatCalendarResults)
}

ref. setDummyData

we'll do it this way, we're going to put all the keys in the LocalStorageA

theobject
title: 'DeckTitle',
questions: []


 */
