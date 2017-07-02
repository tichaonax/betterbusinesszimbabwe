/**
 * Created by tichaona on 7/2/17.
 */
import {Utils} from 'app/common/Utils';
var axios = require('axios');

var BASE_URL = Utils.getUrlAddress(window.location.href);//"http://localhost:3000/api";

module.exports = {
    findAllServices: function () {
        //console.log("BASE_URL",BASE_URL);
        //var encodedLocation = encodeURIComponent(location);
        var requestUrl = `${BASE_URL}/api/services`;
        return axios.get(requestUrl).then((resp) => {
            //console.log(resp);
            return resp.data;
        }, (error) => {
            throw new Error(error);
        })
    }
}
