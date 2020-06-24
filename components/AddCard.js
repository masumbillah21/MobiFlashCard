import React, { Component } from 'react';
import { Text, TextInput, KeyboardAvoidingView, StyleSheet } from 'react-native';
import SubmitButton from './SubmitButton'
import { connect } from 'react-redux'
import { white, purple, black } from '../utils/colors'
import { saveCard } from '../utils/helpers'
import { addCard } from '../actions'
import { NavigationActions } from 'react-navigation'


class AddCard extends Component {
    
    state = { 
        question: '',
        answer: ''
    }
    
    handleSubmit = () => {
        const { question, answer } = this.state
        const { deckId, dispatch } = this.props
        if(!question || !answer){
            alert("Quesion and/or Answer can't be empty")
            return
        }

        dispatch(addCard(deckId, {question, answer}))
        
        this.setState({ question: '', answer: '' })
        saveCard( deckId, { question, answer } )

        this.props.navigation.dispatch(NavigationActions.back({
            key: null
        }))

    }
    
    render() {
        const { question, answer } = this.state
        const { deckId } = this.props

        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <Text style={styles.label}>Add Card</Text>
                <Text style={styles.label}>{deckId}</Text>
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

const mapStateToProps = (state, { navigation }) => {
    const deckId = navigation.state.params.deckId
    return{
        deckId
    }
}
export default connect(mapStateToProps)(AddCard)