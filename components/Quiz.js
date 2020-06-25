import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux'
import SubmitButton from './SubmitButton'
import { purple, red, white, gray, orange } from '../utils/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { NavigationActions } from 'react-navigation'
import { clearLocalNotification } from '../utils/helpers'


class Quiz extends Component {
    static navigationOptions = ( {navigation} ) => {
        const deckName  = navigation.state.params.deckId
        return{
            title: 'Quiz for ' + deckName
        }
    }
    state = { 
        showAns: false,
        quesNumber: 0,
        correct: 0
    }
    showAnswer = () => {
        this.setState({
            showAns: true
        })

        setTimeout(function(){
            this.setState({showAns: false});
        }.bind(this), 3000);
    }

    submitAnswer = (answer) => {
        //Clear notification as perticipated
        clearLocalNotification()
        const { correct, quesNumber } = this.state

        if(answer){
            this.setState({
                correct: correct + 1,
                quesNumber: quesNumber + 1,
                showAns: false
            })
        }else{
            this.setState({
                quesNumber: quesNumber + 1,
                showAns: false
            })
        }
    }

    restart = () => {
        this.setState({
            showAns: false,
            quesNumber: 0,
            correct: 0
        })
    }
    goBack = () => {
        this.props.navigation.dispatch(NavigationActions.back({
            key: null
        }))
    }
    render() {
        const { decks, deckId } = this.props
        const { quesNumber, showAns, correct } = this.state

        if(!decks[deckId].questions || decks[deckId].questions.length === 0){
            return(
                <View style={styles.container}>
                    <Text style={styles.scoreText}>Sorry, there is no quiz in this deck</Text>
                    <SubmitButton onPress={this.goBack}>
                        <Text>Back</Text>
                    </SubmitButton>
                </View>
            )
        }

        const num = quesNumber + 1
        const questionLength = decks[deckId].questions.length
        const incorrect = questionLength - correct

        if(quesNumber === questionLength){
            return (
                <View style={styles.container}>
                    { correct < incorrect 
                    ? <MaterialCommunityIcons name="emoticon-sad-outline" style={styles.icon} />
                    : <MaterialCommunityIcons name="emoticon-happy-outline" style={styles.icon} />}
                                       
                    <Text style={styles.scoreText}>You got: {correct} out of {questionLength}</Text>
                    <View style={styles.buttonContainer}>
                        <SubmitButton style={styles.correctBtn}
                            onPress={this.restart}>
                            <Text style={styles.btnText}>Restart</Text>
                        </SubmitButton>
                        <SubmitButton onPress={this.goBack}>
                            <Text>Back</Text>
                        </SubmitButton>
                    </View>
                    
                </View>
            )
        }
        return (
            <View style={styles.container}>
                {!showAns ?
                <View style={styles.questionContainer}>                    
                    <Text style={styles.questionText}>
                        {decks[deckId].questions[quesNumber].question}
                    </Text>
                </View>
                : 
                <View style={styles.ansContainer}> 
                    <Text style={styles.questionText}>
                        {decks[deckId].questions[quesNumber].answer}
                    </Text>
                </View>
                }

                <Text style={styles.numQuestion}>{num} out of {questionLength} questions</Text>
                <SubmitButton onPress={() => this.showAnswer()}>
                        <Text>Show Answer</Text>
                </SubmitButton>

                <View style={styles.buttonContainer}>
                    <SubmitButton style={styles.correctBtn} 
                        onPress={() => this.submitAnswer(true)}>
                        <Text style={styles.btnText}>Correct</Text>
                    </SubmitButton>

                    <SubmitButton style={styles.incorrectBtn}
                        onPress={() => this.submitAnswer(false)}>
                        <Text style={styles.btnText}>Incorrect</Text>
                    </SubmitButton>
                </View>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
        padding: 20
    },
    questionContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: gray,
        borderRadius: 10,
    },
    ansContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: purple,
        borderRadius: 10,
    },
    numQuestion:{
        marginTop:5,
        marginBottom:5,
        alignSelf: 'center',
        color: orange
    },
    questionText:{
        color: white,
        fontSize: 18,
    },
    buttonContainer: {
        flexDirection: 'row',
        padding: 10,        
    },
    correctBtn:{
        backgroundColor: purple,

    },
    incorrectBtn:{
        backgroundColor: red,
        borderColor: red        
    },
    btnText:{
        color: white
    },
    scoreText: {
        fontSize: 30,
        color: purple,
        textAlign: 'center'
    },
    icon: {
        fontSize: 80,
        color: purple,
        textAlign: 'center'        
    }
})

const mapStateToProps = (decks, { navigation }) => {
    const deckId = navigation.state.params.deckId
    return{
        deckId,
        decks
    }
}
export default connect(mapStateToProps)(Quiz)