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
            return resp.data;
        }, (error) => {
            throw new Error(error);
        })
    }

    addServiceCategory = (serviceCategory, userId) => {
        var resource = `/api/services/save/${userId}`;
        var data = {serviceCategory};
        return this.POST(resource, data).then((resp) => {
            return resp.data;
        }, (error) => {
            throw new Error(error);
        })
    }

    updateServiceCategory = (serviceId, serviceCategory, userId) => {
        var resource = `/api/services/update/category/${serviceId}/${userId}`;
        var data = {serviceCategory};
        return this.POST(resource, data).then((resp) => {
            console.log("updateServiceCategory",resp);
            return resp.data;
        }, (error) => {
            throw new Error(error);
        })
    }

    deleteServiceCategory = (serviceId, userId) => {
        var resource = `/api/services/delete/${serviceId}/${userId}`;
        var data = {};
        return this.POST(resource, data).then((resp) => {
            console.log("deleteServiceCategory", resp);
            return resp.data;
        }, (error) => {
            throw new Error(error);
        })
    }
}

module.exports = ServicesApi;