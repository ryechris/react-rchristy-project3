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

export function deleteDeck (deckTitle) {
  console.log('INSIDE DELETE DECK: ', deckTitle)
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[deckTitle] = undefined
      delete data[deckTitle]
      console.log('DEEP STATE: ', data)
      AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
    })
}
