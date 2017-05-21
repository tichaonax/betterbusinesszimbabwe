import firebase from 'firebase';

try {
    // Initialize Firebase
    var config = {
        apiKey: process.env.API_KEY,
        authDomain: process.env.AUTH_DOMAIN,
        databaseURL: process.env.DATABASE_URL,
        projectId: process.env.PROJECT_ID,
        storageBucket: process.env.STORAGE_BUCKET,
        messagingSenderId: process.env.MESSAGING_SENDER_ID
    };

    firebase.initializeApp(config);

} catch (e) {

}

export var googleProvider = new firebase.auth.GoogleAuthProvider();
export var githubProvider = new firebase.auth.GithubAuthProvider();
export var facebookProvider = new firebase.auth.FacebookAuthProvider();
export var firebaseRef = firebase.database().ref();
export default firebase;
