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
var getAllKeys = function(){
  AsyncStorage.getAllKeys().then((key) => {
    console.log(key);
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
var getTestObj = function(){
  AsyncStorage.getItem('10').then((data) => {
    console.log(data);
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
export { makeInitialRequest, getAllKeys, clearAllKeys, getTestObj, getMultiObj };
