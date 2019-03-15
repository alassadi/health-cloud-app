// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');
// The Firebase Admin SDK to access the Firebase Firestore Database.
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const register = require('./register');

const funs = {
  helloWorld: functions.https.onRequest((req, res) => {
    res.send('Hello from a Serverless Database!');
  }),
  ...register
};
module.exports = funs;
