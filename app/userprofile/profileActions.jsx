import moment from 'moment';
import firebase, {firebaseRef} from 'app/firebase/index';

//<editor-fold desc="User Profile">

export var setUserProfile = (profile) => {
    return {
        type: 'SET_USER_PROFILE',
        profile
    };
};

export var resetUserProfile = () => {
    return {
        type: 'RESET_USER_PROFILE'
    };
};

export var updateUserProfile = (profileUpdates) => {
    return {
        type: 'UPDATE_USER_PROFILE',
        profileUpdates
    };
};

export var startSetUserProfile = () => {
    return (dispatch, getState) => {
        var uid = getState().auth.uid;
        var bbzProfileRef = firebaseRef.child(`users/${uid}/userProfile`);
        return bbzProfileRef.once('value').then((snapshot) => {
            var profile = snapshot.val() || {}; //return available data or empty object
            dispatch(setUserProfile(profile));
        });
    };
};


export var addUserProfile = (profile) => {
    return {
        type: 'ADD_USER_PROFILE',
        profile
    };
};


export var startAddUserProfile = (email, displayName, providerId, userId, photoURL) => {
    console.log("Start Add User Profile!");
    return (dispatch, getState) => {
        var profile = {
            displayName,
            email,
            createDate: moment().unix(),
            isAdmin: false,
            providerId,
            userId,
            photoURL
        }

        var uid = getState().auth.uid;
        var profileRef = firebaseRef.child(`users/${uid}`);
        return profileRef.update({userProfile: profile}).then(() => {
                dispatch(addUserProfile(profile));
            }
        )
    };
};

export var startUpdateUserProfile = (userItemId, email, displayName, providerId, userId, photoURL) => {
    return (dispatch, getState) => {
        var userItemRef = firebaseRef.child(`users/${userItemId}/userProfile`);
        var userProfile={};
        return userItemRef.once('value').then((snapshot) => {
            userProfile = snapshot.val() || {}; //return available data or empty object
        }).then(()=>{
            var updates = {
                email,
                providerId,
                userId,
                photoURL
            };
            userProfile["email"] = email;
            userProfile["providerId"] = providerId;
            userProfile["userId"] = userId;

            return userItemRef.update(updates).then(()=>{
                return dispatch(updateUserProfile({userProfile: userProfile}));
            })
        }).catch(
            (error) => {
                console.debug("Unable to update user admin status", error);
                var errorObj = {
                    errorCode: error.code,
                    errorMessage: error.message
                };
                return dispatch(errorActions.bbzReportError(errorObj));
            }
        );
    };
}
//</editor-fold>
