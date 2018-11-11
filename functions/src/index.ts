import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
const express = require('express');
// const QRCode = require('qrcode');
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

app.get('/results', async (req, res) => {
  const teamVotes = [];
  try {
    db.collection('Teams').get()
    .then((allTeams) => {
      // Setup the Votes-Object for each tema
      allTeams.forEach((team) => {
        teamVotes.push({
          id: team.id,
          name: team.get("name"),
          pitch: 0,
          technology: 0,
          wtf: 0
        });
      });

      db.collection('Users').get()
      .then((allUsers) => {
        // For all users, count their vote
        allUsers.forEach((user) => {
          teamVotes.forEach((team) => {
            if((team.id) === user.get("pitch")){
              team.pitch++;
            }
            if(team.id === user.get("technology")){
              team.technology++;
            }
            if(team.id === user.get("wtf")){
              team.wtf++;
            }
          })
        });

        // Dummy values
        // let bestPitch = [{
        //   name: "no best pitch yet",
        //   id: "dummyP",
        //   pitch: 0,
        //   technology: 0,
        //   wtf: 0
        // }];
        // let bestTechnology = [{
        //   name: "no best technology yet",
        //   id: "dummyT",
        //   pitch: 0,
        //   technology: 0,
        //   wtf: 0
        // }];
        // let bestWtf = [{
        //   name: "no best wtf yet",
        //   id: "dummyW",
        //   pitch: 0,
        //   technology: 0,
        //   wtf: 0
        // }];

        // teamVotes.forEach((team) => {
          // if(team.pitch > bestPitch[0].pitch){
          //   bestPitch = [...team];           
          // }
          // // else if(team.pitch === bestPitch[0].pitch){
          // //   bestPitch.push(team);
          // // }
          // if(team.technology > bestTechnology[0].technology){
          //   bestTechnology = [...team];
          // }
          // // else if(team.technology === bestTechnology[0].technology){
          // //   bestTechnology.push(team);
          // // }
          // if(team.wtf > bestWtf[0].wtf){
          //   bestWtf = [...team];
          // }
          // // else if(team.wtf === bestWtf[0].wtf){
          // //   bestWtf.push(team);
          // // }
        // });
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(teamVotes);
      })
      .catch(error => {
        throw new Error(error.message);
      });
    })
    .catch(error => {
      throw new Error(error.message);
    });
  } catch(error){
    res.status(500).send(error);
  }  
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
          res.status(400).send("Team does not exists");
          throw new Error("Team does not exists");
        }
      })
      .catch(error => {
        throw new Error(error.message);
      })

    pitchTeamRef.get()
      .then(teamRef => {
        if(!teamRef.exists) {
          res.status(400).send("Team does not exists");

          throw new Error("Team does not exists");
        }
      })
      .catch(error => {
        throw new Error(error.message);
      })
    techTeamRef.get()
      .then(teamRef => {
        if(!teamRef.exists) {
          res.status(400).send("Team does not exists");

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
            res.status(400).send("You may not vote for you own team");
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

// app.get('/generateUsers/:num', async (req, res) => {
//   const num = req.params.num;
//   let result = ""
//   try {
//     const teamsRef = db.collection('Teams');
//     teamsRef.get()
//     .then(snapshot => {
//       snapshot.forEach(team => {
//         for(let i=0; i<num; i++) {
//           db.collection('Users').add({
//             team: team.id,
//             teamName: team.data().name,
//             pitch: "",
//             tech: "",
//             wtf: ""
//           }).then(user => {
//             QRCode.toDataURL('https://creativehackvoting.firebaseapp.com/voting?token=' + user.id, function (err, url) {
//               result += '<tr><td><image src="' + url + '"></td><td>' + team.data().name + '</td></tr>'
//               // console.log(result)
//             })
//           }).catch(err => {
//             res.status(500).send(err);
//             return;
//           });
//         }
//       })
//       // setTimeout(console.log(result), 5000
//       setTimeout(function() {res.status(200).send('<html><body><table>' + result + '</table></body></html>')}, 3000);
//     })
//     .catch(err => {
//       console.log('Error getting documents', err);
//       res.status(500).send(err);
//       return;
//     });
//   } catch(error) {
//     console.log('Error detecting sentiment or saving message', error.message);
//     res.status(500).send(error);
//   }
// });


app.get('/me/:token', async (req, res) => {
  const token = req.params.token;
  
  try {
    const usersRef = db.collection('Users').doc(token);
    usersRef.get()
    .then(snapshot => {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(snapshot));
    })
    .catch(err => {
      console.log('Error getting documents', err);
      res.status(500).send(err);
      return;
    });
  } catch(error) {
    console.log('Error detecting sentiment or saving message', error.message);
    res.status(500).send(error);
  }
});
// app.get('/updateUsers', async (req, res) => {
//   const num = req.params.num;
  
//   try {
//     const usersRef = db.collection('Users');
//     usersRef.get()
//     .then(snapshot => {
//       snapshot.forEach(item => {
//         db.collection('Users').doc(item.id).set({pitch: "", tech: "", wtf: ""}, {merge: true});
//       })
//     })
//     .catch(err => {
//       console.log('Error getting documents', err);
//       res.status(500).send(err);
//       return;
//     });
//   } catch(error) {
//     console.log('Error detecting sentiment or saving message', error.message);
//     res.status(500).send(error);
//   }
// });

exports.api = functions.https.onRequest(app);
