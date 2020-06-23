import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { white, gray } from '../utils/colors'
import { getDecks } from '../utils/helpers'
import { retrieveDeck } from '../actions'
import { connect } from 'react-redux'

class DeckList extends Component {
    async componentDidMount(){
        const { dispatch } = this.props
        await getDecks()
        .then((decks) => dispatch(retrieveDeck(decks)))
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
                        <View style={styles.container}>
                            <Text style={styles.title}>{title}</Text>
                            <Text style={styles.total}>Total Cards: {questions ? questions.length: 0}</Text>
                        </View>
                    )
                    
                }}
            />
                
        );
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

const mapStateToProps = (decks) => {
    return{
        decks
    }
}


export default connect(mapStateToProps)(DeckList)