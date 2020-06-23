import TabNavigator from './TabNavigator'
import { purple, white } from '../utils/colors'
import DeckDetails from './DeckDetails'
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
  });

  

  export default createAppContainer(StackNavigation);