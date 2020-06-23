import { AsyncStorage } from 'react-native'
import {formatDecks, MOBI_FLASHCARDS_STORAGE_KEY } from './api'

export function generateID () {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }

export function getDecks(){
    return AsyncStorage.getItem(MOBI_FLASHCARDS_STORAGE_KEY)
    .then(formatDecks)
}

export function saveDeck(key, value){
    return AsyncStorage.mergeItem(MOBI_FLASHCARDS_STORAGE_KEY, JSON.stringify({
        [key]: value
    }))
}

export function saveCard(key, question, answer){
    AsyncStorage.getItem(MOBI_FLASHCARDS_STORAGE_KEY)
    .then((result) => {
        const decks = JSON.parse(result)
        decks[key].questions.push({question, answer})
        AsyncStorage.mergeItem(MOBI_FLASHCARDS_STORAGE_KEY, JSON.stringify(decks))
    })
}