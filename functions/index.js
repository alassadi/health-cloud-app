'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');
// The Firebase Admin SDK to access the Firebase Firestore Database.
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const register = require('./register');
const data = require('./data');

const funs = _extends({
  helloWorld: functions.https.onRequest((req, res) => {
    res.send('Hello from a Serverless Database!');
  })
}, register, data);
module.exports = funs;