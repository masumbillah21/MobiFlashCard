import React, { Component } from 'react';
import {Text, 
    TextInput, 
    KeyboardAvoidingView,
    StyleSheet } from 'react-native';
import { connect } from 'react-redux'
import { addDeck } from '../actions'
import { saveDeck} from '../utils/helpers'
import { black } from '../utils/colors'
import SubmitButton from './SubmitButton'

class AddDeck extends Component {
    state = { 
        deckName: ''
    }
    
    handleSubmit = () =>{
        const { deckName } = this.state
        const { dispatch } = this.props
        
        if(!deckName){
            alert("Deck Name can't be empty")
            return
        }
       
        dispatch(addDeck(deckName))
        saveDeck(deckName)

        this.toDeckDetails(deckName)
        this.setState({deckName: ''})
        

    }

    toDeckDetails = (deckId) => {
        this.props.navigation.navigate('DeckDetails', {deckId})
    }
    render() {
        const { deckName } = this.state
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <Text style={styles.label}>What is your new deck name?</Text>
                <TextInput 
                    style={styles.input} 
                    value={deckName} 
                    placeholder="Write your deck name here.."
                    onChangeText={ (deckName) => this.setState({deckName})}/>
                <SubmitButton onPress={this.handleSubmit}> Add Deck</SubmitButton>
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
        fontSize: 20,
        marginBottom: 10
    },
    input:{
        width: 100 + '%',
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: black
    }
})

export default connect()(AddDeck)