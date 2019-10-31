export const RECEIVE_ENTRIES = 'RECEIVE_ENTRIES'
export const ADD_ENTRY = 'ADD_ENTRY'
export const UPDATE_ENTRY = 'UPDATE_ENTRY'

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
  console.log('update INSIDE updateEntry: ', update)
  return {
    type: UPDATE_ENTRY,
    update
  }
}
