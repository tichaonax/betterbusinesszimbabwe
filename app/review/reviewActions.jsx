import moment from 'moment';
import requestip from 'clientIpAddress';
import firebase, {firebaseRef, githubProvider} from 'app/firebase/index';

//<editor-fold desc="reviews">

export var reviews = (review) => {
    return {
        type: 'ADD_REVIEW',
        review
    };
};

//</editor-fold>
