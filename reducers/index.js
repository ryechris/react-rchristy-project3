import { RECEIVE_ENTRIES, ADD_ENTRY, UPDATE_ENTRY } from '../actions'

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
      console.log('INSIDE REDUCER; ACTION: ', action)
      console.log('INSIDE REDUCER; ACTION.UPDATE: ', action.update)
      console.log('INSIDE REDUCER; deckTitle: ', deckTitle)
      console.log('INSIDE REDUCER; questions: ', questions)
      console.log('INSIDE REDUCER; THE RETURNED STATE: ', {
        ...state,
        [deckTitle]: {
          ...state[deckTitle],
          questions
        }
      })
      return {
        ...state,
        [deckTitle]: {
          ...state[deckTitle],
          questions
        }
      }
    default :
      return state
  }
}

export default entries


/*

let x = {
  a: {
    questions: [],
    title: 'abc',
  },
  b: {
    questions: [],
    title: 'bcd',
  },
  c: {
    questions: [],
    title: 'cde',
  },
  d: {
    questions: [],
    title: 'def',
  },
}

const y = {
  e: {
    questions: [],
    title: 'efg'
  }
}

x = {...x, ...y}


const ef = 'e'

x = {
  ...x,
  [ef]: {
    ...ef,
    questions: [{hello: 'hi'}],
  }
}

 */
