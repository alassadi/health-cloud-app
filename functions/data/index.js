'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')();
const express = require('express');
const app = express();
const auth = require('../auth');
const firebaseHelper = require('firebase-functions-helper');
const db = admin.firestore();
app.use(require('cors')({ origin: true }));
app.use(cookieParser);
app.use(bodyParser.json());
app.use(auth);

app.get('/', (req, res) => {
  firebaseHelper.firestore.backup(db, 'data').then(data => res.status(200).send(data));
});

app.get('/:id', (req, res) => {
  const id = req.params.id;
  firebaseHelper.firestore.getDocument(db, 'data', id).then(data => res.status(200).send(data)).catch(error => {
    return res.status(500).json({
      message: 'Error' + error.toString()
    });
  });
});

module.exports.data = functions.region('europe-west1').https.onRequest(app);