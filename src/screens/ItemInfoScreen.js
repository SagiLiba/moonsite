import React, {Component} from 'react';
import {View,Image,StyleSheet,ScrollView} from 'react-native';
import {Card, CardItem,Text,Left,Right} from 'native-base';
import CustomFooter from '../components/CustomFooter';

export default class ItemInfoScreen extends Component {

  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.name,

  })

  constructor(props){
    super(props)
    const {name,avgRating,img,summary,genres,language,schedule,network} = this.props.navigation.state.params
    this.state = {
      name: name,
      avgRating: avgRating,
      img: img,
      summary: summary,
      genres: genres,
      language:language,
      schedule:schedule,
      network:network
    }
  }

  formatDays = (array) => {

    var string = ""
    let daysLen = array.length
    if ( daysLen ==  1) {
      string = array[0]+"'s" 
    } else if ( daysLen > 1 && daysLen < 7){
      for (var i=0; i < daysLen; i ++){
          if ( i != daysLen-1){
            string += array[i] + ", "
          } else {
            string += array[i]
          }
      }
    } else {
      string = "Everyday"
    }
    return string;
  }

  render(){
    const regex = /(<([^>]+)>)/ig;
    const strippedHTMLsummary = this.state.summary.replace(regex,'')
    const mapGenres = this.state.genres.map((data,index) => {
      return (
        <Text style={styles.genreText}>{data}</Text>
      )
    })

    var days = this.formatDays(this.state.schedule.days);

    return(
      <View style={styles.mainContainer}>
        <ScrollView style={{flex:0.93,backgroundColor:"white"}}>
        <Card style={styles.cardStyle}>
        <CardItem cardBody>
          <Image source={this.state.img} style={styles.img}/>
        </CardItem>
        <CardItem>
          <Left>
            <View style={{flexDirection: 'row'}}>{mapGenres}</View>
          </Left>
          <Right>
            <Text>Rating: {this.state.avgRating == null ? 0 : this.state.avgRating}</Text>
          </Right>
        </CardItem>
        <CardItem>
          <Text>{strippedHTMLsummary}</Text>
        </CardItem>
        <CardItem>
          <View>
          <Text>{days} at {this.state.schedule.time}</Text>
          <Text>Network: {this.state.network.name}</Text>
          <Text>Language: {this.state.language}</Text>
          </View>
        </CardItem>
       </Card>
       </ScrollView>
       <CustomFooter text="Sagi Liba" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  cardStyle:{
    marginLeft:0,
    marginRight:0,
    marginBottom:0,
    marginTop:0
  },
  img: {
    height: 300,
    resizeMode: "stretch", 
    flex: 1
  },
  genreText: {
    color: "red",
    fontSize: 16,
  }
});