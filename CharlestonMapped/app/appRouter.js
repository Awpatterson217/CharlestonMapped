// @flow
import {
  AppRegistry,
  Navigator
 } from 'react-native';
 import React, { Component } from 'react';

import Home from './components/Home/Home';
import TheMap from './components/Map/Map';
import {
  makeInitialRequest,
  getMarkerCoords,
  getAllMyKeys,
  clearAllKeys,
  checkForKeys,
  getMultiObj,
  getTestObj
} from './API/Api';

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
    return <TheMap navigator={navigator} {...route.passProps} />
  }
}

  render() {
    return(
      <Navigator
        configureScene={(route, routeStack) => Navigator.SceneConfigs.FloatFromRight}
        initialRoute={{ name: 'Home' }}
        renderScene={ this.renderScene }
      />
    );
  }
}
AppRegistry.registerComponent('App', () => App);
