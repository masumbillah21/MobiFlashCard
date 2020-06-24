export const ADD_DECK = 'ADD_DECK'
export const RETRIEVE_DECK = 'RETRIEVE_DECK'
export const DELETE_DECK = 'DELETE_DECK'
export const ADD_CARD = 'ADD_CARD'

export function addDeck(deck){
    return{
        type: ADD_DECK,
        deck
    }
}

export function retrieveDeck(decks){
    return{
        type: RETRIEVE_DECK,
        decks
    }
}

export function deleteDeck(deckId){
    return{
        type: DELETE_DECK,
        deckId
    }
}


export function addCard(deckId, card){
    return{
        type: ADD_CARD,
        deckId,
        card
    }
}
