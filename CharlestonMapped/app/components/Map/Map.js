// @flow
import {
  TouchableHighlight,
  TouchableOpacity,
  AppRegistry,
  Dimensions,
  StyleSheet,
  Image,
  Text,
  View
 } from 'react-native';
 import React, { Component } from 'react';
 import MapView from 'react-native-maps'

 import {
   myAPI,
 } from '../../API/Api';

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
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    )
  }
  onPressMarker(markerData) {
    this.setState({ openedMarker: markerData });
    this.refs.map.animateToRegion({
        latitude: parseFloat(markerData.latitude),
        longitude: parseFloat(markerData.longitude),
        latitudeDelta: 0.005,
        longitudeDelta: 0.001
    });
  }
  componentDidMount() {
    console.log('componentDidMount.');
    var markers = []
    myAPI.getMarkerCoords().then(response => {
      let responseLength = response.length;
      for(let key = 0; key < responseLength; key++){
        console.log(response[key]);
        markers[key] = {
          coords: {
            lat: response[key].lat,
            long: response[key].long,
          },
          id: response[key].id,
          street: response[key].street,
          date: response[key].date,
          style: response[key].style,
          stories: response[key].stories
        }
      }
      this.setState({markers: markers})
    });
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
    fmStyle = function(vheight) {
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
        <View style={fmStyle(varTop)}>
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
              key={marker.id}
              coordinate={{
                latitude: marker.coords.lat,
                longitude: marker.coords.long,
              }}
              street={marker.street}
            >
              <MapView.Callout style={{width: 200, height: 125}}>
                <View>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{fontWeight: 'bold'}}>Address: </Text>
                    <Text>{marker.street}</Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{fontWeight: 'bold'}}>Est Construction Date: </Text>
                    <Text>{marker.date}</Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{fontWeight: 'bold'}}>stories: </Text>
                    <Text>{marker.stories}</Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{fontWeight: 'bold'}}>style: </Text>
                    <Text>{marker.style}</Text>
                  </View>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{fontWeight: 'bold'}}>stories: </Text>
                    <Text>{marker.stories}</Text>
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
