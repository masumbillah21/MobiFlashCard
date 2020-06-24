import React from 'react';
import DeckList from './DeckList'
import AddDeck from './AddDeck'
import { Platform } from 'react-native'
import { purple, white } from '../utils/colors'
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

const TabNavigator = createBottomTabNavigator({
    History: {
      screen: DeckList,
      navigationOptions: {
        tabBarLabel: 'Decks',
        tabBarIcon: ( {tintColor }) => <MaterialCommunityIcons name="cards" size={30} color={tintColor}/>
      }
    },
    AddDeck: {
      screen: AddDeck,
      navigationOptions: {
        tabBarLabel: 'Add',
        tabBarIcon: ( {tintColor }) => <FontAwesome name="plus-square" size={30} color={tintColor}/>
      }
    }
  }, {
  navigationOptions:{
      header: null
  },
  tabBarOptions:{
    activeTintColor: Platform.OS === 'ios' ? purple: white,
    style:{
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : purple,
      shadowColor: 'rgba(0,0,0,0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
});

  

  export default createAppContainer(TabNavigator);