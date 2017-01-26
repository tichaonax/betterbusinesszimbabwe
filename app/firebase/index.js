import firebase from 'firebase';

try {
    // Initialize Firebase
    var config = {
        apiKey: process.env.API_KEY,
        authDomain: process.env.AUTH_DOMAIN,
        databaseURL: process.env.DATABASE_URL,
        storageBucket: process.env.STORAGE_BUCKET,
    };

    firebase.initializeApp(config);
} catch (e) {

}

export var googleProvider = new firebase.auth.GoogleAuthProvider();
export var githubProvider = new firebase.auth.GithubAuthProvider();
export var facebookProvider = new firebase.auth.FacebookAuthProvider();
export var firebaseRef = firebase.database().ref();
export default firebase;

