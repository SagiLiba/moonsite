import React, {Component} from 'react';
import {Text,Header,Button,Item,Input,Icon} from 'native-base';

export default class ShowItem extends Component {
  render() {
    return (
    <Header searchBar rounded>
      <Item>
        <Icon name="ios-search" />
        <Input placeholder="Search"/>
        <Icon name="ios-people" />
      </Item>
      <Button transparent>
        <Text>Search</Text>
      </Button>
    </Header>
    );
  }
}  