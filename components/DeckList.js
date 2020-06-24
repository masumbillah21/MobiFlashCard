import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { white, gray } from '../utils/colors'
import { connect } from 'react-redux'
import { getDecks, getCardLength } from '../utils/helpers'
import { retrieveDeck } from '../actions'


class DeckList extends Component {   

    componentDidMount(){
        getDecks()
        .then((decks) => this.props.retrieveAllDecks(decks))
    }
    
    render() {
        const { decks } = this.props
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
                        <TouchableOpacity 
                            onPress={() => this.props.navigation.navigate('DeckDetails', {deckId: item.key })}>
                            <View style={styles.container} key={item.key}>
                                <Text style={styles.title}>{title}</Text>
                                <Text style={styles.total}>{getCardLength(questions)}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                }}
            />
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
    }
})

const mapStateToProps = (decks) => ( {decks} )

const mapDispatchToProps = ( dispatch ) => {
    return{
        retrieveAllDecks: (decks) => dispatch(retrieveDeck(decks))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckList)