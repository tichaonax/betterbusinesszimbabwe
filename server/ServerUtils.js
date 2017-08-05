/**
 * Created by tichaona on 7/4/17.
 */
var Promise = require("bluebird");

class ServerUtils {
    static isAuthorizeApiCall(req) {
        const apiKey = 'r8502b3cc3672d15daa8ac6fdca062752b3b314t';
        return (req.headers['authorization'] == apiKey);
    }
}

module.exports = ServerUtils;