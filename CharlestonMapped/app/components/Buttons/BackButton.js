import { 
  TouchableOpacity,
  AppRegistry,
  StyleSheet, 
  Text,
  View
	     } from 'react-native';
import React, { Component, } from 'react';

import Assets from '../../Assets/Assets';

export default class BackButton extends Component {

  _navigate(property){
  this.props.navigator.pop()
  }

  render() {

    return (

    <TouchableOpacity activeOpacity={0.6} style={styles.mapButton} onPress={ () => this._navigate() }>
      <Text style={{fontWeight: 'bold'}}>back</Text>
    </TouchableOpacity >
     
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {width: 0, height: 5},
 
    shadowOpacity: 0.12,
    opacity: 1,
    zIndex: 10,
  }
})
AppRegistry.registerComponent('BackButton', () => BackButton);