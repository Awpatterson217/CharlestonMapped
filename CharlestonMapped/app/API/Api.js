import { AsyncStorage } from 'react-native';

const myAPI = {
  getMarkerCoords: () => {
    console.log("getMarkerCoords");
    return new Promise(function(resolve, reject){
    return AsyncStorage.getAllKeys((err, keys) => {
      const kLength = keys.length;
      let coordsArray = [];
      for(let x = 0; x < kLength; x++){
        let thisKey = keys[x];
        console.log('thiskey: ' + thisKey);
         AsyncStorage.getItem(thisKey).then((data) => {
          res = JSON.parse(data);
          return res;
        }).then((res) => {
          let tempObj = {};
          let thisUrl = res['url'];
          let theLat = res['lat'];
          let theLong = res['long'];
          let theStreet = res['street'];
          let constructionEst = res['constructionEst'];
          let style = res['style'];
          let stories = res['stories'];
            tempObj.stories = stories;
            tempObj.style = style;
            tempObj.date = constructionEst;
            tempObj.street = theStreet;
            tempObj.id = thisKey;
            tempObj.url = thisUrl;
            tempObj.lat = parseFloat(theLat);
            tempObj.long = parseFloat(theLong);
            coordsArray.push(tempObj);
            if(coordsArray.length == kLength){
              console.log('coordsArray created.');
              resolve(coordsArray);
            }
          }); // END getItem
        } // END for loop
      });// END getAllKeys
    });//end promise
  },
  makeInitialRequest: (response) => {
  const initialURL = 'EXCLUDED';
  var myRequest = new Request(initialURL, {method: 'GET', headers:{'X-Requested-With':'XMLHttpRequest'}});
  fetch(myRequest)
    .then(function(response) {
      console.log("Initial request made to RuskinArc");
        if(response.status == 200) return response.json();
        else throw new Error('Something went wrong on api server!');
    })
    .then(function(response) {
      for(var key in response){
        if (response.hasOwnProperty(key)) {
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
        }
      }
    })
    .catch(function(error) {
        console.error(error);
    });
  },
  hasData: () => {
    return new Promise(function(resolve, reject){
      AsyncStorage.getAllKeys((err, keys) => {
        if(keys.length > 0){
          resolve(true);
        }else{
          resolve(false);
        }
      });
    });
  }
}
const makeInitialRequest = function(response){
  const initialURL = 'EXCLUDED';
  var myRequest = new Request(initialURL, {method: 'GET', headers:{'X-Requested-With':'XMLHttpRequest'}});
  fetch(myRequest)
    .then(function(response) {
      console.log("Initial request made to RuskinArc");
        if(response.status == 200) return response.json();
        else throw new Error('Something went wrong on api server!');
    })
    .then(function(response) {
      for(var key in response){
        if (response.hasOwnProperty(key)) {
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
        }
      }
    })
    .catch(function(error) {
        console.error(error);
    });
}
const getOneObj = function(){
  console.log("getOneObj")
  let coordsArray = [];
  AsyncStorage.getItem('10').then((data) => {
    //console.log('Initial data: ' + data);
    data = JSON.parse(data);
    return data;
  }).then((response) => {
    console.log(response);
    let thisUrl = response['url'];
    let theLat = response['lat'];
    let theLong = response['long'];
    console.log('thisUrl' + thisUrl);
    console.log('theLat' + theLat);
    console.log('theLong' + theLong);
    const coords = {
      key: this.thisUrl,
      lat: this.theLat,
      long: this.theLong,
    }
    console.log('coords object in getOneObj');
  }).then(function(coords){
  });
}
function getMarkerCoordsOld(){
  let tempObj = {}
  let coordsArray = [];
  console.log("getMarkerCoords");
  return new Promise(resolve => {
  AsyncStorage.getAllKeys((err, keys) => {
    const kLength = keys.length;
    for(let x = 0; x < kLength; x++){
      let thisKey = keys[x];
      AsyncStorage.getItem(thisKey).then((data) => {
        res = JSON.parse(data);
        return res;
      }).then((res) => {
        let thisUrl = res['url'];
        let theLat = res['lat'];
        let theLong = res['long']; stories
        let theStreet = res['street'];
        let constructionEst = res['constructionEst'];
        let style = res['style'];
        let stories = res['stories'];
          tempObj.stories = stories;
          tempObj.style = style;
          tempObj.date = constructionEst;
          tempObj.street = theStreet;
          tempObj.url = thisUrl;
          tempObj.lat = parseFloat(theLat);
          tempObj.long = parseFloat(theLong);
          coordsArray.push(tempObj);
          if(coordsArray.length == kLength){
            console.log('coordsArray created.');
          }
      }); // END getItem
    } // END for loop
  });// END getAllKeys
});//end promise
}// END function
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
myAPI
};
