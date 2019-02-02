import React, {Component} from 'react';
import ShowItem from '../components/ShowItem';
import CustomHeader from '../components/CustomHeader';
import CustomFooter from '../components/CustomFooter';
import Background from '../components/Background';
import {View,FlatList,ToastAndroid,ActivityIndicator,StyleSheet} from 'react-native';

export default class HomeScreen extends Component {

  static navigationOptions = {
    header: null,
  };

  constructor(){
    super()
    this.state = {
      data:[],
      previousData:[],
      loading:true,
      amount: 8,
      searching: false,
      saveOnce: true
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

  filterResults = (text)=>{
    
    if ( text.length > 0){ 
      // User starts writing search query
      // Save previous data state once.
      if ( this.state.saveOnce ){
        this.setState({previousData: this.state.data,saveOnce: false})
      }

      var filteredData = this.results.filter((item)=>{
        return item.show.name.toLowerCase().indexOf(text.toLowerCase()) !== -1
      })
      // return filtered data ,searching true: disable loading more data
      this.setState({data: filteredData,searching:true})

    } else { 
      // User deleted his search query, 
      // set the data to the previous condition (before searching)
      this.setState({data: this.state.previousData,
                     previousData: this.state.data,
                     saveOnce: true,
                     searching:false // enable loading more data
                    })
    }
  }

  loadMore = () =>{

    const {data,amount} = this.state
    const dataLength = data.length
 
    if (dataLength + amount < this.results.length){
      // Get the next results
      this.setState({
                     data:[...data,...this.results.slice(dataLength,dataLength+amount)],
                     searching:false // enable loading more data
                    })

    } else {
      // Get the last results
      this.setState({
                     data:[...data,...this.results.slice(dataLength,this.results.length)],
                     searching:true // disable loading more data
                    })
    }
  }

  FlatListFooter = () => {
      return(<View style={{alignItems:"center"}}><ActivityIndicator animating={true} size="large"/></View>)
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
        <Background/>
        <CustomHeader searchFunction={this.filterResults}/>
        <FlatList 
              data={this.state.data}
              renderItem={this.renderItem}
              keyExtractor={(item)=>item.id}
              ListFooterComponent={!this.state.searching ? this.FlatListFooter : ()=>{return(<View></View>)}}
              onEndReached={ !this.state.searching ? this.loadMore : ()=>{}}
              onEndReachedThreshold ={1}
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
  