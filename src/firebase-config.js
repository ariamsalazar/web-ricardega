
import * as firebase from 'firebase'; 

var firebaseConfig = {
    apiKey: "AIzaSyDDqGhttbCKyzrbfElBS6qk5ud9bO6Yg-E",
    authDomain: "ricardega-web.firebaseapp.com",
    databaseURL: "https://ricardega-web.firebaseio.com",
    projectId: "ricardega-web",
    storageBucket: "ricardega-web.appspot.com",
    messagingSenderId: "897185929296",
    appId: "1:897185929296:web:7c241d3cca3bba0f9c5955"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage()

export  {
    storage, firebase as default
}
 