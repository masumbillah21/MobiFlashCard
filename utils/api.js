import { AsyncStorage } from 'react-native'

export const MOBI_FLASHCARDS_STORAGE_KEY = 'MobiFlashCards:decks'

const initialData = {
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

function setDecks(){
  AsyncStorage.setItem(MOBI_FLASHCARDS_STORAGE_KEY, JSON.stringify(initialData))
  return initialData
}

export function formatDecks(results){
  return results === null ? setDecks() : JSON.parse(results)
}