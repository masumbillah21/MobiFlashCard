export const MOBI_FLASHCARDS_STORAGE_KEY = 'MobiFlashCards:decks'
export const MOBI_FLASHCARDS_NOTIFY_KEY = 'MobiFlashCards:notify'

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

export function getInitailData(){
  return initialData
}
