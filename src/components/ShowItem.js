import React, {Component} from 'react';
import {Card, CardItem,Text,Left,Right} from 'native-base';
import {TouchableOpacity,Image,StyleSheet} from 'react-native';

export default class ShowItem extends Component {
  render() {
    return (
    <TouchableOpacity onPress={this.props.clicked}>
      <Card style={styles.cardStyle}>
        <CardItem cardBody>
          <Image source={this.props.img} style={styles.img}/>
        </CardItem>
        <CardItem>
          <Left>
            <Text>{this.props.name}</Text>
          </Left>
          <Right>
            <Text>Rating: {this.props.avgRating == null ? 0 : this.props.avgRating}</Text>
          </Right>
        </CardItem>
      </Card>
      </TouchableOpacity>
    );
  }
}  
     
const styles = StyleSheet.create({
  cardStyle:{
    marginLeft:10,
    marginRight:10,
    marginBottom:10,
    marginTop:10
  },
  img: {
    height: 200, 
    width: null,
    resizeMode: "stretch",
    flex:1
  }
});