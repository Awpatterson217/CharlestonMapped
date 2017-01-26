import { 
  TouchableOpacity,
  TouchableHighlight,
  Dimensions,
  AppRegistry,
  StyleSheet,
  Image,
  Text,
  View
 } from 'react-native';
 import React, { Component } from 'react';
 import MapView from 'react-native-maps'

export default class TheMap extends Component {

  constructor(props){
    super(props);
      // Initial region doesn't seem to be available
      // Have tried passing with {this.props.region}
      this.region = {
        latitude: 39.4961,
        longitude: 88.1762,
        latitudeDelta: 0.04,
        longitudeDelta: 0.02,
      }
      this.position = {
        latitude: 39.4961,
        longitude: 88.1762,
      }
      this.state = {
        newLocation: false,
      }
  }
   
  _findMe(){
    this.state.newLocation = true
    navigator.geolocation.getCurrentPosition(
      ({coords}) => {
        const {latitude, longitude} = coords
        this.setState({
          position: {
            latitude,
            longitude,
          },
          region: {
            latitude,
            longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.001,
          }
        })
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    )
  }

  _navigate(property){
  this.props.navigator.pop()
  }

  render() {
    
    let region = this.state.newLocation ? this.state.region : this.props.region;
    let position = this.state.newLocation ? this.state.position : this.props.position;

   //const {region, position} = this.state
    const { height: windowHeight } = Dimensions.get('window');

    // Dynamic sizing 
    const varTop = windowHeight - 125;
       
    // hitSlop property defines touch/ button proximity 
    const hitSlop = {
      top: 15,
      bottom: 15,
      left: 15,
      right: 15,
    }

    bbStyle = function(vheight) {
      return {
        position: 'absolute',
        top: vheight,
        left: 10,
        right: 10,
        backgroundColor: 'transparent',
        alignItems: 'center',
      }
    }
    
    return( 
      
      // Holds entire scene
      <View style={styles.container}>

        // Back button
        <View style={styles.backButtontray}>
          <TouchableHighlight 
            hitSlop = {hitSlop}
            activeOpacity={0.7} 
            style={styles.backButton} 
            onPress={ () => this._navigate() }
          >
              <Image style={styles.image} source={require('../../Assets/back.png')} />
          </TouchableHighlight>
        </View>

        // Find Me button
        <View style={bbStyle(varTop)}>
          <TouchableOpacity  
            hitSlop = {hitSlop}
            activeOpacity={0.7} 
            style={styles.mapButton} 
            onPress={ () => this._findMe() }
          >
              <Text style={{fontWeight: 'bold', color: 'black',}}>
                Find Me
              </Text>
          </TouchableOpacity>
        </View>

        // MapView requires key to Google Maps API
        // located in ../android/app/src/main/AndroidManifest.xml
        <MapView
          style={styles.map}
          region={region}
        >
          // Outer circle - current location  
          {position && (
            <MapView.Circle
              center={position}
              radius={75}
              strokeColor={'transparent'}
              fillColor={'rgba(112,185,213,0.30)'}
            />
          )}
          // Inner circle - current location
          {position && (
            <MapView.Circle
              center={position}
              radius={10}
              strokeColor={'transparent'}
              fillColor={'rgba(11,48,60,0.84)'}
            />
          )}
        </MapView>

      </View>

    ); // End return
  } // End render
} // End TheMap

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEEEEE',
  },
  text: {
    color: 'white',
  },
    map: {
    flex: 1,
    zIndex: -1,
  },
  mapButton: {
    width: 75,
    height: 75,
    borderRadius: 85/2,
    backgroundColor: 'rgba(252, 253, 253, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowRadius: 8,
    shadowOpacity: 0.12,
    opacity: .6,
    zIndex: 10,
},
  backButton: {
    borderRadius: 120 / 2,
    width: 60,
    height: 35,
    backgroundColor: 'rgba(252, 253, 253, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    shadowOpacity: 0.9,
    opacity: 1,
    zIndex: 10,
},
  backButtontray: {
    position: 'absolute',
    top: 5,
    left: 5,
    justifyContent: 'space-around',
    backgroundColor: 'transparent',
    maxWidth: 120,
  },
    image: {
    width: 25,
    height: 25,
  },
}) 
AppRegistry.registerComponent('TheMap', () => TheMap);
