import firebase from 'firebase';

try {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCokaBnMFrWffZTcQAae0AfSDDES-qWD3s",
        authDomain: "tich-todo-app.firebaseapp.com",
        databaseURL: "https://tich-todo-app.firebaseio.com",
        storageBucket: "tich-todo-app.appspot.com",
        messagingSenderId: "122662683372"
    };
} catch (e) {

}

firebase.initializeApp(config);
export var firebaseRef = firebase.database().ref();


export default firebase;