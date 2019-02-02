import React, {Component} from 'react';
import {View,StyleSheet} from 'react-native'
import {Text} from 'native-base';

export default class CustomFooter extends Component {
  render() {
    return (
      <View style={styles.footerContainer}>
        <Text style={styles.text}>{this.props.text}</Text>
      </View>
    );
  }
}  
     
const styles = StyleSheet.create({
  footerContainer: {
    flex: 0.07,
    backgroundColor: "#4050b5",
    justifyContent:"center",
    alignItems: 'center'
  },
  text:{
    color: "white"
  }
});