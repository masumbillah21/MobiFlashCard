import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducers from './reducers'
import StackNavigation from './components/StackNavigation'
import Constants from 'expo-constants'
import { purple } from './utils/colors'

function AppStatusBar ({backgroundColor, ...props}){
  return(
    <View style={{backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

class App extends Component {

  render(){
    const store = createStore(reducers)
    return (
      <Provider store={store} >
        <View style={{flex: 1}}>
          <AppStatusBar backgroundColor={purple} barStyle='light-content' />
          <StackNavigation />
        </View>
      </Provider>
      
    );
  }
}


export default App