import React, {Component} from 'react';
import {View,Text} from 'react-native'
import {Button} from 'native-base'

export default class HomeScreen extends Component {

  render(){
    return(
      <View>
        <Text>Main Screen</Text>
        <Button onPress={()=>{this.props.navigation.navigate("ItemInfo")}}>
          <Text>Next</Text>
        </Button>
      </View>
    )
  }
}
  