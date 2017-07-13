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
            //console.log("/api/companies=>",JSON.stringify(resp.data));
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

    updateCompany = (companyId, serviceId, companyTitle, companyDesc, rating, reviewCount, isApproved) => {
        var resource = `/api/companies/update/${companyId}`;
        var data = {serviceId, companyTitle, companyDesc, rating, reviewCount, isApproved};
        return this.POST(resource, data).then((resp) => {
            console.log("updateCompany",resp);
            return resp.data;
        }, (error) => {
            throw new Error(error);
        })
    }

    updateCompanyIsApprovedFlag=(companyId, isApproved)=>{
        var resource = `/api/companies/update/isapproved/${companyId}`;
        var data = {isApproved};
        return this.POST(resource, data).then((resp) => {
            return resp.data;
        }, (error) => {
            throw new Error(error);
        })
    }
}

module.exports = CompaniesApi;