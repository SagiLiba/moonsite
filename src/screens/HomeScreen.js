import React, {Component} from 'react';
import ShowItem from '../components/ShowItem';
import CustomHeader from '../components/CustomHeader';
import CustomFooter from '../components/CustomFooter';
import {View,FlatList,ToastAndroid,ActivityIndicator,StyleSheet,Text} from 'react-native';

export default class HomeScreen extends Component {

  static navigationOptions = {
    header: null,
  };

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
    var {name,image,rating,summary,genres,language,schedule,network} = item.show
    name = (name == undefined) ? "" : name
    image = (image == null) ? require("../images/placeholder.jpg") : {uri: image.medium}
    summary = (summary == null? "": summary)
    return(
     <ShowItem name={name} 
               img={image} 
               avgRating={rating.average} 
               clicked={()=>this.props.navigation.navigate("ItemInfo",
                                                          {
                                                          name: name,
                                                          img: image,
                                                          avgRating: rating.average,
                                                          summary: summary,
                                                          genres: genres,
                                                          language: language,
                                                          schedule: schedule,
                                                          network: network
                                                          })}
              />
    )
  };

  render(){
    return(
      this.state.loading // While fetching data show indicator
      ? 
      <View style={styles.spinnerContainer}>
        <ActivityIndicator size="large"/>
      </View>
      : 
      <View style={styles.mainContainer}>
        <View style={{flex:0.93}}>
        <CustomHeader searchFunction={this.filterResults}/>
        <FlatList 
              data={this.state.data}
              renderItem={this.renderItem}
              keyExtractor={(item)=>item.id}
            />
        </View>
        <CustomFooter text="Sagi Liba"/>{/* takes the rest of the space: 0.07 */}
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
  