// @flow
import {
  TouchableHighlight,
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View
} from 'react-native';
import React, { Component, PropTypes, } from 'react';

import {
  makeInitialRequest,
  getMarkerCoords,
  getAllMyKeys,
  clearAllKeys,
  checkForKeys,
  getTestObj,
  getMultiObj
} from '../../API/Api';

export default class Home extends Component {
  constructor(props){
    super(props);
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
      top: 5,
      bottom: 5,
      left: 5,
      right: 5,
    }
    const enterHitSlop = {
      top: 12,
      bottom: 12,
      left: 12,
      right: 12,
    }
    return(
      <Image source={require('../../Assets/lincoln.jpg')} style={styles.backgroundImage}>
        <View style={styles.enterButtonContainer}>
          <TouchableHighlight
            hitSlop = {enterHitSlop}
            activeOpacity={0.4}
            style={styles.enterButton}
            onPress={ () => this._navigate() } >
              <Text style={styles.enterButtonText}>Explore</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.buttonContainer}>
           <TouchableHighlight
             hitSlop = {hitSlop}
             activeOpacity={0.4}
             style={styles.button}
             onPress={ () =>  clearAllKeys()} >
               <Text style={styles.buttonText}>Settings</Text>
           </TouchableHighlight>
           <TouchableHighlight
             hitSlop = {hitSlop}
             activeOpacity={0.4}
             style={styles.button}
             onPress={ () =>  getMarkerCoords()} >
               <Text style={styles.buttonText}>About</Text>
           </TouchableHighlight>
         </View>
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
  },
  enterButtonContainer: {
    flex: 2,
    alignItems: 'center',
    marginTop: 80,
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
  },
  buttonContainer: {
    flex: 1,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
  },
  enterButton: {
    width: 300,
    height: 165,
    //padding: 40,
    //elevation: 15,
    borderWidth: 5,
    marginBottom: 60,
    borderStyle: 'solid',
    borderColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 100 / 20,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  button: {
    width: 125,
    height: 27,
    opacity: 1,
    elevation: 5,
    borderWidth: 1,
    marginBottom: 10,
    alignItems: 'center',
    borderRadius: 100 / 30,
    backgroundColor: 'white',
    justifyContent: 'space-around',
    shadowRadius: 10,
    shadowOpacity: .5,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 5},
    //padding: 60,
  },
  enterButtonText: {
    padding: 15,
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  }
})

AppRegistry.registerComponent('Home', () => Home);
