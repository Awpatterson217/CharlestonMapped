// @flow
import {
  Navigator,
  AppRegistry,
  StyleSheet,
  Text,
  View
 } from 'react-native';
 import React, { Component } from 'react';
import Home from './components/Home/Home';
import TheMap from './components/Map/Map';
import API from './components/API/API';

export default class App extends Component {
_navigate(property){
	this.props.navigator.push({
		name: 'TheMap',
		passProps: {
			name: property
		},
		type: type
	})
}
renderScene(route, navigator) {
  if(route.name == 'Home'){
    return <Home navigator={navigator} {...route.passprops} />
  }
  if(route.name == 'TheMap'){
    return <TheMap navigator={navigator} {...route.passProps} historicSites={API.response} />
  }
}

  render() {
    return(
      <Navigator
        configureScene={ this.configureScene }
        initialRoute={{ name: 'Home' }}
        renderScene={ this.renderScene }
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEEEEE'
  },
  buttonContainer: {
    flex: 1,
  },
    map: {
    flex: 1,
  }
})

AppRegistry.registerComponent('App', () => App);
