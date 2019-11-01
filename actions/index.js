export const RECEIVE_ENTRIES = 'RECEIVE_ENTRIES'
export const ADD_ENTRY = 'ADD_ENTRY'
export const UPDATE_ENTRY = 'UPDATE_ENTRY'
export const DELETE_ENTRY = 'DELETE_ENTRY'

export function receiveEntries (entries) {
  return {
    type: RECEIVE_ENTRIES,
    entries
  }
}

export function addEntry(entry) {
  return {
    type: ADD_ENTRY,
    entry
  }
}

export function updateEntry(update) {
  return {
    type: UPDATE_ENTRY,
    update
  }
}

export function deleteEntry(deckTitle) {
  return {
    type: DELETE_ENTRY,
    deckTitle
  }
}
