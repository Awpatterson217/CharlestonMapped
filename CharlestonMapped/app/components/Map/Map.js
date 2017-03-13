// @flow
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
      this.state = {
        region:{
          latitude: 39.4961,
          longitude: -88.1762,
          latitudeDelta: 0.015,
          longitudeDelta: 0.001
        },
        newLocation: false,
        innerRadius: 10,
        outerRadius: 70,
        historicSites: this.props.historicSites
      }
  }
  _navigate(property){
  this.props.navigator.pop()
  }
  _findMe(){
    this.state.newLocation = true;
    this.state.innerRadius = 2
    this.state.outerRadius = 20
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
            latitudeDelta: 0.001,
            longitudeDelta: 0.001,
          }
        })
      },
      (error) => alert('Location services are off.'),
      //(error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true}
    )
  }
  onPressMarker (markerData) {
    this.setState({ openedMarker: markerData });
    this.refs.map.animateToRegion({
        latitude: parseFloat(markerData.latitude),
        longitude: parseFloat(markerData.longitude),
        latitudeDelta: 0.0009,
        longitudeDelta: 0.001
    });
  }
  updateMarkers(payload) {
        var markers = []
        let id = 0
        _.forOwn(payload, function(value, key) {
            markers.push({
                coordinate: value.coordinates,
                key: id++
            });
        })
        this.setState({markers: newArrayOfCoordinates})
    }
  componentDidMount() {
      console.log('componentDidMount.');
      updateMarkers({JSON.stringify(this.state.historicSites)});
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
              latitudeDelta: 0.015,
              longitudeDelta: 0.001,
            }
          })
        },
        (error) => alert('Location services are off.')
      );
      this.watchID = navigator.geolocation.watchPosition(
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
              latitudeDelta: 0.015,
              longitudeDelta: 0.001,
            }
          })
      });
    }

  render() {
    var markers = this.state.markers || [];
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
      <View style={styles.container}>
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
        <MapView
          style={styles.map}
          region={this.state.region}
        >
          {this.state.position && (
            <MapView.Circle
              center={this.state.position}
              radius={this.state.outerRadius}
              showsUserLocation={true}
              strokeColor={'transparent'}
              fillColor={'rgba(112,185,213,0.30)'}
            />
          )}
          {this.state.position && (
            <MapView.Circle
              center={this.state.position}
              radius={this.state.innerRadius}
              strokeColor={'transparent'}
              fillColor={'rgba(11,48,60,0.84)'}
            />
          )}
          {markers.map(marker => (
            <MapView.Marker
              key={marker.uniqueId}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude
              }}
              title={marker.title}
              description={marker.desc}
            >
            <MapView.Callout>
              <View>
                <Text>This is a plain view</Text>
              </View>
            </MapView.Callout>
            </MapView.Marker>
          ))}
        </MapView>
      </View>
    );
  }
}

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
