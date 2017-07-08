/**
 * Created by tichaona on 7/2/17.
 */
import {Utils} from 'app/common/Utils';
var BbzApiBase = require('app/api/BbzApiBase');
class LastloginApi extends BbzApiBase {
    constructor() {
        super(Utils.getUrlAddress(window.location.href));
    }

    findAllLastlogins = () => {
        var resource = '/api/lastlogin';
        return this.GET(resource).then((resp) => {
            return resp.data;
        }, (error) => {
            throw new Error(error);
        })
    }

    findLastloginByUserId = (userId) => {
        var resource = `/api/lastlogin/user/${userId}`;
        return this.GET(resource).then((resp) => {
            return resp.data;
        }, (error) => {
            throw new Error(error);
        })
    }

    findLastloginById = (lastloginId) => {
        var resource = `/api/lastlogin/${lastloginId}`;
        return this.GET(resource).then((resp) => {
            return resp.data;
        }, (error) => {
            throw new Error(error);
        })
    }

    updateLastlogin = (userId, city, country, ipAddress) => {
        var resource = `/api/lastlogin/update/${userId}`;
        var data = {city, country, ipAddress};
        return this.POST(resource, data).then((resp) => {
            return resp.data;
        }, (error) => {
            throw new Error(error);
        })
    }

    insertLastLogin = (userId, city, country, ipAddress, loginAt) => {
        var resource = `/api/lastlogin/save/${userId}`;
        var data = {city, country, ipAddress, loginAt};
        return this.POST(resource, data).then((resp) => {
            return resp.data;
        }, (error) => {
            throw new Error(error);
        })
    }

    moveLastLogin = (userId, city, country, ipAddress, loginAt) => {
        var resource = `/api/lastlogin/move/${userId}`;
        var data = {city, country, ipAddress, loginAt};
        return this.POST(resource, data).then((resp) => {
            return resp.data;
        }, (error) => {
            throw new Error(error);
        })
    }
}

module.exports = LastloginApi;