import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as request from 'request-promise';
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

app.post('/vote/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    var userRef = db.collection('Users').doc(userId.toString());
    let wtfRef = req.body.wtf;
    var wtfTeamRef = db.collection('Teams').doc(wtfRef.toString());
    let pitchRef = req.body.pitch;
    var pitchTeamRef = db.collection('Teams').doc(pitchRef.toString());
    let techRef = req.body.tech;
    var techTeamRef = db.collection('Teams').doc(techTeamRef.toString());

    var getWtfTeamRef = wtfTeamRef.get()
      .then(teamRef => {
        if(!teamRef.exists) {
          throw new Error("Team does not exists");
        }
      })
    
    var getPitchTeamRef = pitchTeamRef.get()
      .then(teamRef => {
        if(!teamRef.exists) {
          throw new Error("Team does not exists");
        }
      })
    
    var geTechTeamRef = techTeamRef.get()
      .then(teamRef => {
        if(!teamRef.exists) {
          throw new Error("Team does not exists");
        }
      })

    var getUser = userRef.get()
      .then(user => {
        if(!user.exists) {
          throw new Error("Wrong User");
        } else {
          let userTeam = user.get('team');
          if (userTeam.in([wtfRef, pitchRef, techRef])) {
            throw new Error("You may not vote for you own team");
          }
          user['wtf'] = wtfRef;
          user['pitch'] = pitchRef;
          user['technology'] = techRef;

          userRef.set(user);
        }
      })
  } catch(error) {
    console.log('Error detecting sentiment or saving message', error.message);
    res.sendStatus(500);
  }
});

