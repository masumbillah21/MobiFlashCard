import React, { Component } from 'react';
import { Text, TextInput, KeyboardAvoidingView, StyleSheet } from 'react-native';
import SubmitButton from './SubmitButton'
import { connect } from 'react-redux'
import { white, purple, black } from '../utils/colors'
import { saveCard } from '../utils/helpers'
import { addCard } from '../actions'


class AddCard extends Component {
    
    state = { 
        question: '',
        answer: ''
    }
    
    handleSubmit = () => {
        const { question, answer } = this.state
        const { dispatch } = this.props
        const deckId = this.props.navigation.state.params.deckId
        
        if(!question || !answer){
            alert("Quesion and/or Answer can't be empty")
            return
        }
        saveCard( deckId, { question, answer } )   
        dispatch(addCard(deckId, { question, answer})) 
         
        this.setState({ question: '', answer: '' })           
        
        this.props.navigation.navigate('DeckDetails', {deckId})

    }
    
    render() {
        const { question, answer } = this.state
        const { deckId, decks } = this.props
        const {title} = decks[deckId]
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <Text style={styles.label}>Add Card</Text>
                <Text style={styles.label}>{title}</Text>
                <TextInput 
                    style={styles.input} 
                    value={question} 
                    placeholder="Write qeustion here..."
                    onChangeText={ (question) => this.setState({question})}/>

                <TextInput 
                    style={styles.input} 
                    value={answer} 
                    placeholder="Write answer here.."
                    onChangeText={ (answer) => this.setState({answer})}/>

                <SubmitButton onPress={() => this.handleSubmit()}> Add Card</SubmitButton>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    label:{
        fontSize: 30,
        marginBottom: 10
    },
    input:{
        width: 100 + '%',
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: black,
        marginTop: 10
    }
})

const mapStateToProps = (decks, { navigation }) => {
    const deckId = navigation.state.params.deckId
    return{
        decks,
        deckId
    }
}
export default connect(mapStateToProps)(AddCard)