import firebase from 'firebase';
var config = {
    apiKey: "AIzaSyAjd3zjuA2jQ4qZzqyFx5i6ZQi_LWDN5wE",
    authDomain: "unergia-a6bc3.firebaseapp.com",
    databaseURL: "https://unergia-a6bc3.firebaseio.com",
    projectId: "unergia-a6bc3",
    storageBucket: "unergia-a6bc3.appspot.com",
    messagingSenderId: "861094953154"
};
var firebaseApp = firebase.initializeApp(config);
export default firebaseApp;
