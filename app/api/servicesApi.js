/**
 * Created by tichaona on 7/2/17.
 */
import {Utils} from 'app/common/Utils';
var BbzApiBase = require('app/api/BbzApiBase');
class ServicesApi extends BbzApiBase {
    constructor() {
        super(Utils.getUrlAddress(window.location.href));
    }

    findAllServices = () => {
        var resource = '/api/services';
        return this.GET(resource).then((resp) => {
            //console.log(resp);
            return resp.data;
        }, (error) => {
            throw new Error(error);
        })
    }

    addServiceCategory = (serviceCategory, userId) => {
        var resource = '/api/services/save';
        var data = {serviceCategory, userId};
        return this.POST(resource, data).then((resp) => {
            console.log("addServiceCategory",resp);
            return resp.data;
        }, (error) => {
            throw new Error(error);
        })
    }
}

module.exports = ServicesApi;