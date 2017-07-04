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
        console.log("this.baseUrl", this.baseUrl);

        this.axiosConfig = {
            headers: {'Authorization': process.env.BBZ_API_KEY}
        };
    }

    getBaseUrl = () => {
        return this.baseUrl;
    }

    GET(resource) {
        console.log("this.axiosConfig", this.axiosConfig);
        return axios.get(resource, this.axiosConfig);
    }

    POST(resource, data) {
        var querystring = require('querystring');
        console.log("this.axiosConfig", this.axiosConfig);
        axios.post(resource, querystring.stringify(data), this.axiosConfig);
    }

    buildUrl(resource) {
        // remove leading slash from resource
        resource = resource.replace(/^\/+/g, '');
        return this.baseUrl + resource;
    }
}

module.exports = BbzApiBase;