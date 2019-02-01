import React, {Component} from 'react';
import HomeScreen from './src/screens/HomeScreen';
import ItemInfoScreen from './src/screens/ItemInfoScreen';
import {createStackNavigator} from 'react-navigation';
console.disableYellowBox = true

export default class App extends Component {
  render(){
    return(
      <Navigator />
    )
  }
}

const Navigator = createStackNavigator({
  Home: HomeScreen,
  ItemInfo: ItemInfoScreen
})
