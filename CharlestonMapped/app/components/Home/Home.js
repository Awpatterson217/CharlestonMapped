// @flow
import {
  TouchableHighlight,
  AppRegistry,
  StyleSheet,
  Text,
  View
 } from 'react-native';
 import React, { Component, PropTypes, } from 'react';

export default class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
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
        <Text style={styles.title}>Explore Charleston, IL</Text>
         <TouchableHighlight
         hitSlop = {hitSlop}
         activeOpacity={0.4}
         style={styles.enterButton}
         onPress={ () => this._navigate() } >
           <Text style={styles.centerText}>Enter</Text>
         </TouchableHighlight>
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
  title: {
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
    textAlign: 'center',
    padding: 10,
    fontSize: 20,
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
