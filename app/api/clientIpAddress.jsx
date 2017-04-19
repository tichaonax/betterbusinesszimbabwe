var axios = require('axios');


module.exports = {
    getClientIpAddress: function () {

        const URL = "https://ifcfg.me/ip";

        return axios.get(URL).then(function (resp) {
            console.log(resp);
            if (resp.status == 200) {
                return resp.data;
            } else {

                throw new Error(resp.data.message);
            }
        }, function (resp) {
            throw new Error(resp.data);
        })
    },

    getClientLocationByIpAddress: function (ipAddress) {

        const URL = `https://ipinfo.io/${ipAddress}/json`;

        return axios.get(URL).then(function (resp) {
            console.log(resp);
            if (resp.status == 200) {
                return resp.data;
            } else {
                throw new Error(resp.data.message);
            }
        }, function (resp) {
            throw new Error(resp.data);
        })
    }
}