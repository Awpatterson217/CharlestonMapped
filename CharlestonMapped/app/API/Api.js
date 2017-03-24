import React, { Component, PropTypes } from 'react';
import { AsyncStorage } from 'react-native';

var makeInitialRequest = function(response){
  const initialURL = 'EXCLUDED';
  var myRequest = new Request(initialURL, {method: 'GET', headers:{'X-Requested-With':'XMLHttpRequest'}});
  fetch(myRequest)
    .then(function(response) {
        if(response.status == 200) return response.json();
        else throw new Error('Something went wrong on api server!');
    })
    .then(function(response) {
      for(var key in response){
        if (response.hasOwnProperty(key)) {
          let siteID = response[key].resource_id;
          //console.log(siteID);
          let thisSite = {
            url: response[key].info_window_url,
            lat: response[key].latitude,
            long: response[key].longitude,
            street: response[key].address_string,
            city: response[key].city,
            state: response[key].state,
            zip: response[key].address_number,
            stories: response[key].number_of_stories,
            constructionEst: response[key].estimated_construction_date,
            form: response[key].form,
            function: response[key].current_function,
            style: response[key].style_primary
          }
          AsyncStorage.setItem(key, JSON.stringify(thisSite));

          console.log(key);
          console.log(thisSite);
        }
      }
      //console.log('First latitude: ' + JSON.stringify(response[0].latitude));
      //console.log('First longitude: ' + JSON.stringify(response[0].longitude));
      //console.log(response);
      //return response;
    })
    .catch(function(error) {
        console.error(error);
    });
}
var getAllMyKeys = new Promise(function(resolve, reject){
  AsyncStorage.getAllKeys().then((keys) => {
    //console.log(keys);
    resolve(keys);
  });
});
var getMarkerCoords = function(){
  console.log('new press');
  //makeInitialRequest().then()
    getAllMyKeys.then((keys) => {
      var allCoords = [];
      var keysLength = keys.length;
      let count = 0;
      for(count; count < keysLength; count++){
        let thisKey = keys[count];
        AsyncStorage.getItem(thisKey).then((data) => {
          let thisLat = data.lat;
          let thisLong = data.long;
          console.log(thisLong);

          let thisCoordsObj = {
            key: thisKey,
            lat: thisLat,
            long: thisLong,
          }
          allCoords.push(thisCoordsObj)
          //console.log(thisCoordsObj);
          //console.log(keysLength);
          //console.log(allCoords.length);

          if(allCoords.length == keysLength){
            console.log(allCoords);
          }
        });
      }
    //console.log(keys);
  });
}

var getTestObj = function(){
  AsyncStorage.getItem('10').then((data) => {
    //var lat = data[long];
    //console.log(lat);
    console.log(data);

  });
}
var clearAllKeys = function(){
  AsyncStorage.clear().then((callback, error) => {
    if(error){
      console.log(error);
    }else{
      console.log('All keys cleared');
    }
  });
}
var getMultiObj = function(){
AsyncStorage.multiGet(['10','11'], (err, stores) => {
  stores.map( (result, i, store) => {
    let key = store[i][0];
    let val = store[i][1];
    console.log(key, val);
  });
});
}
export { makeInitialRequest, getAllMyKeys, clearAllKeys, getTestObj, getMultiObj, getMarkerCoords };
