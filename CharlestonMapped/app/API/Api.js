import ApiUtils from './ApiUtils'
// Currently in testing
let url = "localhost:3000"
var Api = {
  getMarkers: function() {
    return fetch(url)
      .then(ApiUtils.checkStatus)
      .then(response => response.json())
      .catch(e => e)
  },
  getDetails: function() {
    return fetch(`${url}/${path}`, {
      .then(ApiUtils.checkStatus)
      .then(response => response.json())
      .catch(e => e)
    }
  }
}
export { Api as default };
