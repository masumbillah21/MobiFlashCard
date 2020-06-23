import React, { Component } from 'react';
import { View, 
    Text, 
    TextInput, 
    KeyboardAvoidingView,
    StyleSheet } from 'react-native';
    import { connect } from 'react-redux'
import { addDeck } from '../actions'
import { saveDeck, generateID } from '../utils/helpers'
import { black } from '../utils/colors'
import SubmitButton from './SubmitButton'
import { NavigationActions } from 'react-navigation'

class AddDeck extends Component {
    state = { 
        deckName: ''
    }
    
    handleSubmit = () =>{
        const { deckName } = this.state
        const { dispatch } = this.props
        const id = generateID()
        if(!deckName){
            alert("Deck Name can't be empty")
            return
        }        
        const newDeck = {
            title: deckName.trim(),
            questions: []
        }
        dispatch(addDeck(id, newDeck))
        this.setState({
            deckName: ''
        })
        this.toHome()
        saveDeck(id, newDeck)

    }

    toHome = () => {
        this.props.navigation.dispatch(NavigationActions.back({
            key: 'AddDeck'
        }))
    }
    render() {
        const { deckName } = this.state
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <Text style={styles.label}>Deck Name</Text>
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
        fontSize: 30,
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