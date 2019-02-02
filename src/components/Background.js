import React, {Component} from 'react';
import {Image,StyleSheet} from 'react-native'

export default class Background extends Component {
  render() {
    return (
        <Image source={require('../images/bg.jpg')} style={styles.imgBG} resizeMode="cover"/>
    );
  }
}  
     
const styles = StyleSheet.create({
  imgBG: {
    flex:1 ,
    position: 'absolute',
    top: 0,
    left: 0 
  }
});