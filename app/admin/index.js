const functions = require('firebase-functions');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')();
const auth = require('../auth');
const express = require('express');
const app = express();

app.use(require('cors')({
    origin: true
}));
app.use(cookieParser);
app.use(bodyParser.json());
app.use(auth);

const checkUserData = data =>
    data.hasOwnProperty('name') &&
    data.hasOwnProperty('email') &&
    data.hasOwnProperty('password') &&
    data.hasOwnProperty('date_of_birth') &&
    data.hasOwnProperty('gender');

/** 
 * With URL parameters:
 * Send a POST request such as
 * http://localhost:5000/cloudproject-f25f2/us-central1/admins/doctors
 * to add a doctor to the database 
 * @type {HttpsFunction}
 */

app.post('/doctors', (req, res) => {
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
                .collection('doctors')
                .doc(userRecord.uid.toString())
                .set({
                    name: data.name,
                    email: data.email,
                    date_of_birth: data.date_of_birth,
                    gender: data.gender
                })
                .then(() => {
                    return res.status(200).json({
                        message: 'Doctor Created Successfully'
                    });
                });
        })
        .catch(error => {
            return res.status(500).json({
                message: 'Error' + error.toString()
            });
        });
});

/** 
 * With URL parameters:
 * Send a DELETE request such as
 * http://localhost:5000/cloudproject-f25f2/us-central1/admins/doctors/test@test.com
 * to delete a doctor which his/her email is "test@test.com"
 * @type {HttpsFunction}
 */

app.delete('/doctors/:email', (req, res) => {
    const db = admin.firestore();
    const dbref = db.collection('doctors').where('email', '==', req.params.email);
    const batch = db.batch();

    dbref
        .get()
        .then(snapshot => {
            snapshot.docs.forEach(doc => {
                batch.delete(doc.ref);
            });
            batch.commit();
            return res.status(200).json({
                message: 'Doctor Deleted Successfully'
            });
        })
        .catch(error => {
            return res.status(500).json({
                message: 'Error' + error.toString()
            });
        });
});


/** 
 * With URL parameters:
 * Send a DELETE request such as
 * http://localhost:5000/cloudproject-f25f2/us-central1/admins/users/test@test.com
 * to delete a user which his/her email is "test@test.com"
 * @type {HttpsFunction}
 */

app.delete('/users/:email', (req, res) => {

    const db = admin.firestore();
    const dbref = db.collection('users').where('email', '==', req.params.email);

    const batch = db.batch();

    dbref
        .get()
        .then(snapshot => {
            snapshot.docs.forEach(doc => {
                batch.delete(doc.ref);
            });
            batch.commit();
            return res.status(200).json({
                message: 'User Deleted Successfully'
            });
        })
        .catch(error => {
            return res.status(500).json({
                message: 'Error' + error.toString()
            });
        });
});

exports.admins = functions.region('europe-west1').https.onRequest(app);