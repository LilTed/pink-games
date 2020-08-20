import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "./index.css";
import * as firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCyqIGnJEeoTZr85piiJBxMjMh1FCyXo2g",
    authDomain: "pink-games-d4112.firebaseapp.com",
    databaseURL: "https://pink-games-d4112.firebaseio.com",
    projectId: "pink-games-d4112",
    storageBucket: "pink-games-d4112.appspot.com",
    messagingSenderId: "896248049887",
    appId: "1:896248049887:web:c93c71ee7c59a9c42b396a",
    measurementId: "G-TZ6MX0H747"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

ReactDOM.render(<App />, document.getElementById("app"));
