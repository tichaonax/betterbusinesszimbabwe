var axios = require('axios');
const URL = "https://ifcfg.me/ip";

module.exports = {
    getClientIpAddress: function () {
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