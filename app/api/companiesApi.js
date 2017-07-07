/**
 * Created by tichaona on 7/2/17.
 */
import {Utils} from 'app/common/Utils';
var BbzApiBase = require('app/api/BbzApiBase');
class CompaniesApi extends BbzApiBase {
    constructor() {
        super(Utils.getUrlAddress(window.location.href));
    }

    findAllCompanies = () => {
        var resource = '/api/companies';
        return this.GET(resource).then((resp) => {
            return resp.data;
        }, (error) => {
            throw new Error(error);
        })
    }

    addCompany = (userId) => {
        var resource = `/api/companies/save/${userId}`;
        var data = {serviceCategory};
        return this.POST(resource, data).then((resp) => {
            return resp.data;
        }, (error) => {
            throw new Error(error);
        })
    }

    updateCompany = (serviceId, serviceCategory, userId) => {
        var resource = `/api/companies/update/category/${serviceId}/${userId}`;
        var data = {serviceCategory};
        return this.POST(resource, data).then((resp) => {
            console.log("updateServiceCategory",resp);
            return resp.data;
        }, (error) => {
            throw new Error(error);
        })
    }

    deleteCompany = (userId, adminUserId) => {
        var resource = `/api/companies/delete/${userId}/${adminUserId}`;
        var data = {};
        return this.POST(resource, data).then((resp) => {
            console.log("deleteUser", resp);
            return resp.data;
        }, (error) => {
            throw new Error(error);
        })
    }
}

module.exports = CompaniesApi;