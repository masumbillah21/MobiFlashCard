import { ADD_DECK, RETRIEVE_DECK, DELETE_DECK, RESET_DECK , ADD_CARD } from '../actions'

export default function decks (state = {}, actions){
    switch(actions.type){
        case ADD_DECK:
            return{
                ...state,
                [actions.deckId] : actions.deck
            }
        case RETRIEVE_DECK:
            return{
                ...state,
                ...actions.decks
            }
        case DELETE_DECK:
            return{

            }
        case RESET_DECK:
            return{

            }
        case ADD_CARD:
            return{
                
            }
        default:
            return state
    }
}