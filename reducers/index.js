import {
  RECEIVE_ENTRIES,
  ADD_ENTRY,
  UPDATE_ENTRY,
  DELETE_ENTRY } from '../actions'

function entries (state = {}, action) {
  switch (action.type) {
    case RECEIVE_ENTRIES :
      return {
        ...state,
        ...action.entries
      }
    case ADD_ENTRY :
      return {
        ...state,
        ...action.entry
      }
    case UPDATE_ENTRY :
      const { deckTitle, questions } = action.update
      return {
        ...state,
        [deckTitle]: {
          ...state[deckTitle],
          questions
        }
      }
    case DELETE_ENTRY :
      state[action.deckTitle] = undefined
      delete state[action.deckTitle]
      return state
    default :
      return state
  }
}

export default entries
