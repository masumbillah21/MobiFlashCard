import { ADD_DECK, 
    RETRIEVE_DECK, 
    DELETE_DECK, 
    ADD_CARD } from '../actions'

export default function decks (state = {}, action){
    switch(action.type){
        case ADD_DECK:
            return{
                ...state,
                [action.deck]: {
                    title: action.deck,
                    qeuestions: []
                }
            }
        case RETRIEVE_DECK:
            return{
                ...state,
                ...action.decks
            }
        case DELETE_DECK:
            delete state[action.deckId]
            return{
                ...state
            }        
        case ADD_CARD:
            const { deckId, card } = action
            return{
                ...state,
                [deckId]:{
                    ...state[deckId],
                    questions: state[deckId].questions.concat([card])
                }
            }
        default:
            return state
    }
}