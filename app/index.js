// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require("firebase-functions");

// The Firebase Admin SDK to access the Firebase Firestore Database.
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

// express
const express = require("express");
const app = express();

const cookieParser = require("cookie-parser")();
const cors = require("cors")({ origin: true });

const funs = {
  helloWorld: functions.https.onRequest((req, res) => {
    res.send("Hello from a Serverless Database!");
  })
};

module.exports = funs;
