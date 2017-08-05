/**
 * Created by tichaona on 7/3/17.
 */
var axios = require('axios');

class BbzApiBase {

    constructor(baseUrl) {
        baseUrl = baseUrl.replace(/\/+$/g, '');
        this.baseUrl = baseUrl + "/";
        axios.defaults.baseURL = this.baseUrl;
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        //console.log("this.baseUrl", this.baseUrl);

        this.axiosConfig = {
            headers: {'Authorization': process.env.BBZ_API_KEY}
        };
    }

    getBaseUrl = () => {
        return this.baseUrl;
    }

    GET(resource) {
        return axios.get(resource, this.axiosConfig);
    }

    POST(resource, data) {
        //console.log("resource", resource);
        //console.log("data", data);
        return axios.post(resource, data, this.axiosConfig);
    }

    buildUrl(resource) {
        // remove leading slash from resource
        resource = resource.replace(/^\/+/g, '');
        return this.baseUrl + resource;
    }
}

module.exports = BbzApiBase;