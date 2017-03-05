import { 
  TouchableHighlight,
  AppRegistry,
  StyleSheet,
  Text,
  View
 } from 'react-native';
 import React, { Component, PropTypes, } from 'react';
import DropDown, {
  Select,
  Option,
  OptionList,
} from 'react-native-selectme';

export default class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      location: ''
    }
  }
  _getOptionList() {
    return this.refs['OPTIONLIST'];
  }
  _location(place) {
    this.setState({
      ...this.state,
      location: place
    });
  }
  _navigate(property){
    this.props.navigator.push({
      name: 'TheMap',
      passProps: {
        name: property
      }
    })
  }

  render() {
    const hitSlop = {
      top: 15,
      bottom: 15,
      left: 15,
      right: 15,
    } 
    return( 
      <View style={styles.container}>
         <Text style={styles.location}>Choose your location:</Text>
         <Select
           style = {{backgroundColor: 'white'}}
            width={200}
            height={20}
            ref="SELECT1"
            optionListRef={this._getOptionList.bind(this)}
            defaultValue="Charleston, IL"
            onSelect={this._location.bind(this)}>
            <Option value = {{id : "charleston"}}>Charleston, IL</Option>
         </Select>    

         <TouchableHighlight 
         hitSlop = {hitSlop}
         activeOpacity={0.4} 
         style={styles.enterButton} 
         onPress={ () => this._navigate() } >
           <Text style={styles.centerText}>Enter</Text>
         </TouchableHighlight>
         <OptionList ref="OPTIONLIST"/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(193, 198, 200, 0.85)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  location: {
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
    padding: 10,
    color: 'black',
  },  
  selectBar: {
    marginBottom: 5,
    textAlign: 'center',
    padding: 10,
  },
  enterButton: {
    width: 110,
    height: 35,
    borderRadius: 100 / 2,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    shadowOpacity: 0.12,
    elevation: 10,
    padding: 10,
    opacity: 1,
    marginTop: 60,
  },
  centerText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  }
}) 

AppRegistry.registerComponent('Home', () => Home);
