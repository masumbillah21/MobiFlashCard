import TabNavigator from './TabNavigator'
import { purple, white } from '../utils/colors'
import DeckDetails from './DeckDetails'
import AddCard from './AddCard'
import Quiz from './Quiz'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const StackNavigation = createStackNavigator({
    Home: {
      screen: TabNavigator,
      navigationOptions:{
        header: null,
      }
    },
    DeckDetails: {
      screen: DeckDetails,
      navigationOptions: {        
        headerTintColor: white,
        headerStyle: {
          backgroundColor: purple
        }
      }
    },
    AddCard: {
      screen: AddCard,
      navigationOptions: { 
        title: 'Add Card',       
        headerTintColor: white,
        headerStyle: {
          backgroundColor: purple
        }
      }
    },
    Quiz: {
      screen: Quiz,
      navigationOptions: {  
        headerTintColor: white,
        headerStyle: {
          backgroundColor: purple
        }
      }
    },
  });

  

  export default createAppContainer(StackNavigation);