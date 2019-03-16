const functions = require('firebase-functions');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')();
const express = require('express');
const app = express();

app.use(require('cors')({
  origin: true
}));
app.use(cookieParser);
app.use(bodyParser.json());

const checkUserData = data =>
  data.hasOwnProperty('name') &&
  data.hasOwnProperty('email') &&
  data.hasOwnProperty('password') &&
  data.hasOwnProperty('date_of_birth') &&
  data.hasOwnProperty('gender');

app.post('/', (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      message: 'No content in body.'
    });
  }

  const dbref = admin.firestore();
  const data = req.body;
  if (!checkUserData(data)) {
    return res.status(400).json({
      message: 'Denied. Missing parameters. Required: ' +
        'name, email, password, date_of_birth, gender'
    });
  }
  admin
    .auth()
    .createUser({
      email: data.email,
      emailVerified: false,
      password: data.password,
      disabled: false
    })
    .then(userRecord => {
      dbref
        .collection('users')
        .doc(userRecord.uid.toString())
        .set({
          name: data.name,
          email: data.email,
          date_of_birth: data.date_of_birth,
          gender: data.gender
        })
        .then(() => {
          return res.status(200).json({
            message: 'User Created Successfully',
            email: userRecord.email,
            user_uid: userRecord.uid
          });
        });
    })
    .catch(error => {
      return res.status(500).json({
        message: 'Error' + error.toString()
      });
    });
});

exports.register = functions.region('europe-west1').https.onRequest(app);