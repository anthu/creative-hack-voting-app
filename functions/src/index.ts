import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
const express = require('express');
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
const app = express();
//Initialize Firebase
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/vote/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    const userRef = db.collection('Users').doc(userId.toString());
    const wtfRef = req.body.wtf;
    const wtfTeamRef = db.collection('Teams').doc(wtfRef.toString());
    const pitchRef = req.body.pitch;
    const pitchTeamRef = db.collection('Teams').doc(pitchRef.toString());
    const techRef = req.body.technology;
    const techTeamRef = db.collection('Teams').doc(techRef.toString());

    wtfTeamRef.get()
      .then(teamRef => {
        if(!teamRef.exists) {
          throw new Error("Team does not exists");
        }
      })
      .catch(error => {
        throw new Error(error.message);
      })

    pitchTeamRef.get()
      .then(teamRef => {
        if(!teamRef.exists) {
          throw new Error("Team does not exists");
        }
      })
      .catch(error => {
        throw new Error(error.message);
      })
    techTeamRef.get()
      .then(teamRef => {
        if(!teamRef.exists) {
          throw new Error("Team does not exists");
        }
      })
      .catch(error => {
        throw new Error(error.message);
      })
    userRef.get()
      .then(user => {
        if(!user.exists) {
          throw new Error("Wrong User");
        } else {
          const userTeam = user.get('team');
          if (userTeam === wtfRef || userTeam === pitchRef || userTeam === techRef) {
            throw new Error("You may not vote for you own team");
          }

          console.log(user);
          userRef.set({"wtf": wtfRef, "pitch": pitchRef, "technology": techRef}, {merge: true})
          .then(writestatistics => {
              res.setHeader('Content-Type', 'application/json');
              res.status(200).send({"wtf": wtfRef, "pitch": pitchRef, "technology": techRef});
            })
          .catch(error => {
            throw new Error(error.message);
          });
        }
      })
      .catch(error => {
        throw new Error(error.message);
      })
  } catch(error) {
    console.log('Error detecting sentiment or saving message', error.message);
    res.status(500).send(error);
  }
});

exports.api = functions.https.onRequest(app);
