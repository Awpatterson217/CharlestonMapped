// @flow
import {
  AppRegistry,
  TouchableOpacity,
  TouchableHighlight,
  Dimensions,
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

      }
  }
  _navigate(property){
  this.props.navigator.pop()
  }
  _findMe(){
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
            latitudeDelta: 0.005,
            longitudeDelta: 0.001,
          }
        })
      },
      (error) => alert('Error: Are location services on?'),
      //(error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
      //{enableHighAccuracy: true}
    )
  }
  onPressMarker (markerData) {
    this.setState({ openedMarker: markerData });
    this.refs.map.animateToRegion({
        latitude: parseFloat(markerData.latitude),
        longitude: parseFloat(markerData.longitude),
        latitudeDelta: 0.005,
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
      //updateMarkers({JSON.stringify(this.state.historicSites)});
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
              latitudeDelta: 0.005,
              longitudeDelta: 0.001,
            }
          })
        },
        (error) => alert('Error: Are location services on?'),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
      );
      this.watchID = navigator.geolocation.watchPosition(
        ({coords}) => {
          const {lat, long} = coords
          this.setState({
            position: {
              lat,
              long
            }
          })
      });
    }
    componentWillUnmount() {
      navigator.geolocation.clearWatch(this.watchID);
    }
  render() {
    var markers = this.state.markers || [];
    const { height: windowHeight } = Dimensions.get('window');
    const varTop = windowHeight - 125;
    const hitSlop = {
      top: 15,
      bottom: 15,
      left: 15,
      right: 15,
    }
    const initialRegion = {
        latitude: 39.4961,
        longitude: -88.1762,
        latitudeDelta: 0.015,
        longitudeDelta: 0.001
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
          showsUserLocation={true}
          moveOnMarkerPress={false}
          initialRegion={initialRegion}
          showsCompass={true}
        >
          {markers.map(marker => (
            <MapView.Marker
              key={marker.key}
              coordinate={{
                latitude: marker.lat,
                longitude: marker.long
              }}
              title={marker.title}
              desc={marker.desc}
            >
            <MapView.Callout>
              <View>
                <Text>{this.title}</Text>
                <Text>{this.desc}</Text>
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
