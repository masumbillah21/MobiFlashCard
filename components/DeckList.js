import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Animated } from 'react-native';
import { white, gray } from '../utils/colors'
import { connect } from 'react-redux'
import { getDecks, getCardLength } from '../utils/helpers'
import { retrieveDeck } from '../actions'


class DeckList extends Component {   

    componentDidMount(){
        getDecks()
        .then((decks) => this.props.retrieveAllDecks(decks))
    }

    state = { 
        bounceValue: new Animated.Value(1)
    }

  
    gotoDescription = (deckId)=>{
        const { bounceValue } = this.state

        Animated.sequence([
            Animated.timing(bounceValue, { duration: 125, toValue: 0.96 }),
            Animated.timing(bounceValue, { duration: 125, toValue: 1})
        ]).start(() => {
            this.props.navigation.navigate('DeckDetails', {deckId})
        })

        
    }
    render() {
        const { decks } = this.props
        const { bounceValue } = this.state
        
        if( Object.keys(decks).length === 0 && decks.constructor === Object){
            return(
                <View style={styles.container}>
                    <Text style={styles.title}>NO DECK FOUND</Text>
                </View>
            )
        }else{            
            return (
                <FlatList style={{flex: 1, backgroundColor: gray}}    
                    data={Object.keys(decks).map((id) => {
                        return{
                            key: id
                        }
                    })}
    
                    renderItem={({item}) => {
                        const { title, questions } = decks[item.key]
                        return (
                            <Animated.View style={{transform:[{scale: bounceValue}]}}>
                                <TouchableOpacity                                
                                    onPress={() => this.gotoDescription(item.key)}>
                                    <View style={styles.container} key={item.key}>
                                        <Text 
                                            style={styles.title}>{title}</Text>
                                        <Text 
                                            style={styles.total}>{getCardLength(questions)}</Text>
                                    </View>
                                </TouchableOpacity>
                            </Animated.View>
                        )
                    }}
                />
            )
        }
        
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
    }
})

const mapStateToProps = (decks) => ( {decks} )

const mapDispatchToProps = ( dispatch ) => {
    return{
        retrieveAllDecks: (decks) => dispatch(retrieveDeck(decks))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckList)