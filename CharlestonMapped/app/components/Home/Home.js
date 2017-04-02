// @flow
import {
  TouchableHighlight,
  AppRegistry,
  StyleSheet,
  Image,
  View,
  theRes
} from 'react-native';
import React, { Component, PropTypes } from 'react';

import {
   myAPI,
   makeDetailedRequest
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
  _startUp(){
    myAPI.hasData().then((data) => {
      if(data){
        console.log("App has data");
      }else{
        console.log("App does not data");
        myAPI.makeInitialRequest();
      }
    });
  }
  componentDidMount() {
    this._startUp();
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
        <View style={styles.topContainer}>
        </View>
        <View style={styles.buttonContainer}>
        </View>
        <View style={styles.buttonContainer}>
           <TouchableHighlight
             hitSlop = {hitSlop}
             activeOpacity={0.4}
             style={styles.button}
             onPress={ () =>  makeDetailedRequest()} >
             <Image style={styles.infoImage} source={require('../../Assets/info.png')} />
           </TouchableHighlight>
           <TouchableHighlight
             hitSlop = {hitSlop}
             activeOpacity={0.4}
             style={styles.button}
             onPress={ () =>  alert("Work in progress!!")} >
             <Image style={styles.image} source={require('../../Assets/gear.png')} />
           </TouchableHighlight>
           <TouchableHighlight
             hitSlop = {hitSlop}
             activeOpacity={0.4}
             style={styles.button}
             onPress={ () => this._navigate()} >
             <Image style={styles.image} source={require('../../Assets/map.png')} />
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
  topContainer: {
    flex: 2,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  enterButton: {
    width: 100,
    height:100,
    elevation: 30,
    borderWidth: 1,
    alignItems: 'center',
    borderStyle: 'solid',
    justifyContent: 'center',
    backgroundColor: 'rgba(150, 150, 150, 0.5)',
  },
  button: {
    flex: 1,
    //elevation: 5,
    //borderWidth: 1,
    alignItems: 'center',
    //backgroundColor: 'rgba(150, 150, 150, 0.5)',
    justifyContent: 'space-around',
  },
  image: {
  width: 100,
  height: 100,
},
infoImage: {
width: 80,
height: 80,
},
})
