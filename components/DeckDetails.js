import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux'
import { white, purple, red } from '../utils/colors'
import SubmitButton from './SubmitButton'
import TextButton from './TextButton'
import { getCardLength, removeDeck } from '../utils/helpers'
import { deleteDeck } from '../actions'
import { NavigationActions } from 'react-navigation'

class DeckDetails extends Component {

    static navigationOptions = ( {navigation} ) => {
        const deckName  = navigation.state.params.deckId
        return{
            title: deckName
        }
    }
    handleAddCard = (deckId) => {
        const { navigation } = this.props
        navigation.navigate('AddCard', {deckId})
    }

    handleStartQuiz = (deckId) => {
        const { navigation } = this.props
        navigation.navigate('Quiz', {deckId})
    }

    handleDeleteDeck = (deckId) => {
        const { dispatch, navigation } = this.props
        dispatch(deleteDeck(deckId))
        removeDeck(deckId)

        navigation.goBack()

    }

        
    render() {
        const { decks, deckId } = this.props
        if(decks[deckId]){            
            const { title, questions } = decks[deckId]
            return (
                <View style={styles.container}>
              
                    <Text style={styles.title}>{title}</Text>
    
                    <Text style={styles.total}>{questions ? getCardLength(questions) : 'No card added'}</Text>
                    
                    <View style={styles.buttonContainer}>
    
                        <SubmitButton 
                        onPress={ () => this.handleAddCard(deckId) }>
                            <Text>Add Card</Text>
                        </SubmitButton>
    
                        <SubmitButton 
                            style={styles.quizButton} 
                            onPress={ () => this.handleStartQuiz(deckId)}>
                            <Text style={{color: white}}>Start Quiz</Text>
                        </SubmitButton>
                    </View>
    
                    <View>
                        <TextButton 
                            style={{marginTop: 30}} 
                            onPress={() => this.handleDeleteDeck(deckId)}>
                            <Text style={styles.deleteButton}>Delete Deck</Text>
                        </TextButton>
                    </View>
                </View>
            )
        }

        return (
            <View>
                <Text>No deck</Text>
            </View>
        )
        
        
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        minHeight: 200,
        backgroundColor: white,
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 5,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 5
    },
    title: {
        fontSize: 40,
        marginBottom: 10
    },
    total: {
        fontSize: 20
    },
    buttonContainer: {
        flexDirection: 'row',
        padding: 10,
        
    },
    quizButton:{
        backgroundColor: purple
    },
    deleteButton:{
        color: red,
        fontWeight: 'bold',
        fontSize: 18,
    }
})

const mapStateToProps = (decks, { navigation }) => {
    const deckId = navigation.state.params.deckId
    return{
        decks,
        deckId
    }
}

export default connect(mapStateToProps)(DeckDetails)