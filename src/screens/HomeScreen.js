import React, {Component} from 'react';
import {View,FlatList,ToastAndroid,ActivityIndicator,StyleSheet,Text} from 'react-native';
export default class HomeScreen extends Component {

  constructor(){
    super()
    this.state = {
      data:[],
      loading:true,
      amount: 8
    }

    this.results = []
  }

  componentDidMount(){
    const url = "http://api.tvmaze.com/schedule?country=US&date=2018-11-10" // Gets a Specific day
    this.getJsonFromAPI(url)
  }

  getJsonFromAPI = (url) => {
    fetch(url)
    .then((response)=>response.json())
    .then((data)=>{
      this.results = data
      this.setState({data:data.slice(0,this.state.amount),loading:false})
    })
    .catch((error)=>{
      ToastAndroid.show("Failure",ToastAndroid.SHORT)
      this.setState({loading:false})
    })
  }
  renderItem = ({item}) =>{
    return(
      <View>
        <Text>{item.show.name}</Text>
      </View>
    )
  }
  render(){
    return(
      this.state.loading // While fetching data show indicator
      ? 
      <View style={styles.spinnerContainer}>
        <ActivityIndicator size="large"/>
      </View>
      : 
      <View style={styles.mainContainer}>
      <FlatList 
            data={this.state.data}
            renderItem={this.renderItem}
            keyExtractor={(item)=>item.id}
          />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  spinnerContainer: {
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  }
});
  