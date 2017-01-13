/*
*
* Cannot currently pass current location object to class
*
*/
import { 
  TouchableOpacity,
  AppRegistry,
  StyleSheet,
  Text, 
  View
       } from 'react-native'
import React, { Component, } from 'react'

// will have images for buttons
import Assets from '../../Assets/Assets'

export default class FindMeButton extends Component {

  render() {

    return (

      <TouchableOpacity  activeOpacity={0.6} style={styles.mapButton} onPress={ () => this._findMe() }>
        <Text style={{fontWeight: 'bold'}}>Find Me</Text>
      </TouchableOpacity >
     
    )
  }
}

const styles = StyleSheet.create({
  mapButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 5},
    shadowRadius: 8,
    shadowOpacity: 0.12,
    opacity: 1,
    zIndex: 10,
  }
})
AppRegistry.registerComponent('FindMeButton', () => FindMeButton);