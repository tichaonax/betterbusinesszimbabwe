/**
 * Created by tichaona on 7/2/17.
 */
import {Utils} from 'app/common/Utils';
var BbzApiBase = require('app/api/BbzApiBase');
class UsersApi extends BbzApiBase {
    constructor() {
        super(Utils.getUrlAddress(window.location.href));
    }

    findAllUsers = () => {
        var resource = '/api/users';
        return this.GET(resource).then((resp) => {
            return resp.data;
        }, (error) => {
            throw new Error(error);
        })
    }

    findUserByFirebaseId = (firebaseId) => {
        var resource = `/api/users/firebase/${firebaseId}`;
        return this.GET(resource).then((resp) => {
            return resp.data;
        }, (error) => {
            throw new Error(error);
        })
    }

    findUserById = (userId) => {
        var resource = `/api/users/${userId}`;
        return this.GET(resource).then((resp) => {
            return resp.data;
        }, (error) => {
            throw new Error(error);
        })
    }

    addFirebaseUser = (firebaseId, displayName, email, photoURL, providerId, uid, reviewCount, isSuperUser, isAdmin) => {
        var resource = `/api/users/save/${firebaseId}`;
        var data = {displayName, email, photoURL, providerId, uid, reviewCount, isSuperUser, isAdmin};
        return this.POST(resource, data).then((resp) => {
            return resp.data;
        }, (error) => {
            throw new Error(error);
        })
    }

    updateFirebaseUserProfile = (firebaseId, displayName, email, photoURL, providerId, uid) => {
        var resource = `/api/users/update/profile/${firebaseId}`;
        var data = {displayName, email, photoURL, providerId, uid};
        return this.POST(resource, data).then((resp) => {
            return resp.data;
        }, (error) => {
            throw new Error(error);
        })
    }

    updateUserLastLogin = (userId, city, country, ipAddress) => {
        var resource = `/api/users/profile/lastlogin/update/${userId}`;
        var data = {userId, city, country, ipAddress};
        //console.log("data",data);
        return this.POST(resource, data).then((resp) => {
            return resp.data;
        }, (error) => {
            throw new Error(error);
        })
    }

    insertLastLogin = (userId, city, country, ipAddress, loginAt) => {
        var resource = `/api/users/lastlogin/update/${userId}`;
        var data = {city, country, ipAddress, loginAt};
        return this.POST(resource, data).then((resp) => {
            return resp.data;
        }, (error) => {
            throw new Error(error);
        })
    }

    deleteUser = (userId, adminUserId) => {
        var resource = `/api/users/delete/${userId}/${adminUserId}`;
        var data = {};
        return this.POST(resource, data).then((resp) => {
            //console.log("deleteUser", resp);
            return resp.data;
        }, (error) => {
            throw new Error(error);
        })
    }

    updateUserReviewCount = (userId, reviewCount) => {
        var resource = `/api/users/update/reviewcount/${userId}`;
        var data = {reviewCount};
        return this.POST(resource, data).then((resp) => {
            return resp.data;
        }, (error) => {
            throw new Error(error);
        })
    }

    updateUserIsAdminFlag = (userId, isAdmin, adminUserId) => {
        var resource = `/api/users/update/isadmin/${userId}/${adminUserId}`;
        var data = {isAdmin};
        return this.POST(resource, data).then((resp) => {
            return resp.data;
        }, (error) => {
            throw new Error(error);
        })
    }
}

module.exports = UsersApi;