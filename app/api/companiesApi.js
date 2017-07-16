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

    addNewCompanyInfo = (userId, serviceId, companyTitle, companyDesc) => {
        var resource = `/api/companies/save/${userId}`;
        let rating = 0;
        let reviewCount = 0;
        let isApproved = 0;
        var data = {serviceId, companyTitle, companyDesc, rating, reviewCount, isApproved};
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
            //console.log("updateCompany",resp.data);
            return resp.data;
        }, (error) => {
            throw new Error(error);
        })
    }

    updateCompanyInfo = (companyId, serviceId, companyTitle, companyDesc) => {
        var resource = `/api/companies/update/info/${companyId}`;
        var data = {serviceId, companyTitle, companyDesc};
        return this.POST(resource, data).then((resp) => {
            //console.log("updateCompanyInfo",resp.data);
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

    updateCompanyRatingInfo = (companyId, rating, reviewCount) => {
        var resource = `/api/companies/update/ratinginfo/${companyId}`;
        var data = {rating, reviewCount};
        return this.POST(resource, data).then((resp) => {
            console.log("updateCompanyRatingInfo", resp.data);
            return resp.data;
        }, (error) => {
            throw new Error(error);
        })
    }

}

module.exports = CompaniesApi;