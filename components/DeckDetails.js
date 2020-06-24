import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux'
import { white, purple, red } from '../utils/colors'
import SubmitButton from './SubmitButton'
import TextButton from './TextButton'
import { getCardLength } from '../utils/helpers'

class DeckDetails extends Component {

    static navigationOptions = ( {navigation} ) => {
        const deckName  = navigation.state.params.deckId
        return{
            title: deckName
        }
    }
    handleAddCard = () => {
        const { deckId, navigation } = this.props
        navigation.navigate('AddCard', {deckId})
    }

    handleStartQuiz = () => {
        const { deckId, navigation } = this.props
        navigation.navigate('Quiz', {deckId})
    }

    handleDeleteDeck = () => {

    }
    
    render() {
        const { decks, deckId } = this.props
        const { title, questions } = decks[deckId]
        
        return (
            <View style={styles.container}>
          
                <Text style={styles.title}>{title}</Text>

                <Text style={styles.total}>{getCardLength(questions)}</Text>
                
                <View style={styles.buttonContainer}>

                    <SubmitButton 
                    onPress={ () => this.handleAddCard() }>
                        <Text>Add Card</Text>
                    </SubmitButton>

                    <SubmitButton 
                        style={styles.quizButton} 
                        onPress={ () => this.handleStartQuiz()}>
                        <Text style={{color: white}}>Start Quiz</Text>
                    </SubmitButton>
                </View>

                <View>
                    <TextButton 
                        style={{marginTop: 30}} 
                        onPress={() => this.handleDeleteDeck()}>
                        <Text style={styles.deleteButton}>Delete Deck</Text>
                    </TextButton>
                </View>
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