import React, {Component} from 'react';
import {Text,Header,Button,Item,Input,Icon} from 'native-base';

export default class ShowItem extends Component {
  render() {
    return (
    <Header searchBar rounded>
      <Item>
        <Icon name="ios-search" />
        <Input placeholder="Search"
         onChangeText={text=>this.props.searchFunction(text)}/>
        <Icon name="ios-people" />
      </Item>
      <Button transparent>
        <Text>Search</Text>
      </Button>
    </Header>
    );
  }
}  