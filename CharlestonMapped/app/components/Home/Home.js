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
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Explore Charleston, IL</Text>
        </View>
        <View style={styles.buttonContainer}>
           <TouchableHighlight
             hitSlop = {enterHitSlop}
             activeOpacity={0.4}
             style={styles.enterButton}
             onPress={ () => this._navigate() } >
               <Text style={styles.enterButtonText}>Enter</Text>
           </TouchableHighlight>
           <TouchableHighlight
             hitSlop = {hitSlop}
             activeOpacity={0.4}
             style={styles.button}
             onPress={ () =>  getTestObj()} >
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
  titleContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  title: {
    //width: 300,
    //height: 35,
    padding: 15,
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    borderRadius: 100 / 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 5, 5, 0.7)',
  },
  buttonContainer: {
    flex: 10,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
  },
  enterButton: {
    width: 110,
    height: 35,
    opacity: 1,
    elevation: 20,
    marginBottom: 45,
    //alignSelf: 'flex-start',
    alignItems: 'center',
    borderRadius: 100 / 10,
    backgroundColor: 'white',
    justifyContent: 'space-around',
    shadowRadius: 10,
    shadowOpacity: .5,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 5},
  },
  button: {
    width: 75,
    height: 22,
    opacity: 1,
    elevation: 10,
    marginBottom: 7,
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
    fontSize: 27,
    color: 'black',
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
