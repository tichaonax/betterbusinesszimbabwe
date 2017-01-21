/*
import firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCokaBnMFrWffZTcQAae0AfSDDES-qWD3s",
    authDomain: "tich-todo-app.firebaseapp.com",
    databaseURL: "https://tich-todo-app.firebaseio.com",
    storageBucket: "tich-todo-app.appspot.com",
    messagingSenderId: "122662683372"
};

firebase.initializeApp(config);
var firebaseRef = firebase.database().ref();

firebaseRef.set({
    app: {
        name: 'Todo App',
        version: "1.2.0"
    },
    isRunning: true,
    user: {
        name: 'Tichaona Hwandaza',
        age: 53,
        weight: 190
    }
});


firebaseRef.update({
    'app/name': 'Todo React Redux Application',
    'user/weight': 400
});


firebaseRef.child('app').update({version: '2.1.2'});
firebaseRef.child('user').update({age: 92});


firebaseRef.once('value').then((snapshot) => {
    console.log("Got the entire database", snapshot.val());
}, (error) => {
    console.log("Unable to fetch database value", error)
});

firebaseRef.child('app').once('value').then((snapshot) => {
    console.log("Got the just the hild", snapshot.key, snapshot.val());
}, (error) => {
    console.log("Unable to fetch database value", error)
});


var todoItemsRef = firebaseRef.child('todoItmes');

todoItemsRef.on('child_added',(snapshot)=>{
    console.log("New todoItem added to database", snapshot.key, snapshot.val());
});

todoItemsRef.push({
    completeDate: 1484696647,
    completed: true,
    createDate: 1484491906,
    text: "Eat lunch"
});

todoItemsRef.push({
    completed: false,
    createDate: 1484491906,
    text: "Sleep early today"
});

todoItemsRef.push({
    completed: false,
    createDate: 1484491906,
    text: "Wrap up study"
});*/
