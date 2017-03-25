import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';

// To prevent memory leaks
const makeCancelable = (promise) => {
  let hasCanceled_ = false;
  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then((val) =>
      hasCanceled_ ? reject({isCanceled: true}) : resolve(val)
    );
    promise.catch((error) =>
      hasCanceled_ ? reject({isCanceled: true}) : reject(error)
    );
  });
  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled_ = true;
    },
  };
};
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
          //console.log(key);
          //console.log(thisSite);
        }
      }
    })
    .catch(function(error) {
        console.error(error);
    });
}
var getAllMyKeys = new Promise(function(resolve, reject){
  AsyncStorage.getAllKeys().then((keys) => {
    resolve(keys);
  });
});

var checkForKeys = new Promise(function(resolve, reject){
  getAllMyKeys.then((keys) => {
    console.log('keys.length: ' + keys.length);
    if(keys.length != 0){
      console.log(keys);
      //resolve(keys);
    }else{
      makeInitialRequest();
      console.log('madeInitialRequest');
      getAllMyKeys.then((keys) => {
        console.log('keys.length: ' + keys.length);
      if(keys.length != 0){
        console.log(keys);
        //resolve(keys);
      }else{
        console.log('Error: Unable to load sites. Is internet access enabled?')
        console.log('empty');
      }
      });
      //console.log('empty');
    }
  });
});
var getMarkerCoords = function(){
  console.log('new press');
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
          if(allCoords.length == keysLength){
            console.log(allCoords);
          }
        });
      }
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
export {
  makeInitialRequest,
  getMarkerCoords,
  getAllMyKeys,
  clearAllKeys,
  checkForKeys,
  getTestObj,
  getMultiObj
};
