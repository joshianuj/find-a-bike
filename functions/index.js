const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const admin = require("firebase-admin");

const express = require("express");
const cors = require("cors");
var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://find-a-bike-4964c.firebaseio.com"
});
const app = express();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

// build multiple CRUD interfaces:
app.post("/rent/", async (req, res) => {
  const bikeId = req.body.bikeId;
  const userEmail = req.body.userEmail;
  console.log(req.body);
  var db = admin.firestore();
  let user = await admin
    .auth()
    .getUserByEmail(userEmail)
    .catch(e => {
      res.status(302).send("Illegal user");
      return;
    });
  if (user) {
    console.log(user);
    let snapshot = await db
      .collection("bikes")
      .doc(bikeId)
      .get()
      .catch(e => {
        res.status(302).send("Bike doesn't exist");
        return;
      });

    let bike = snapshot.data();
    console.log(bike);
    if (bike) {
      if (bike.isRented) {
        res.status(302).send("bike already rented");
      } else {
        bike.isRented = true;
        let setDoc = await db
          .collection("bikes")
          .doc(bikeId)
          .set({ ...bike, userId: user.uid });
        // await db.collection("rental_history").add({
        //   user_id: user.uid,
        //   bike_id: bikeId,
        //   date: admin.firestore.Timestamp.fromDate(new Date()),
        //   returned: true
        // });
        res.status(200).send("bike is succesfully rented");
      }
    } else {
      res.status(302).send("No bike found");
    }
  }
});

// build multiple CRUD interfaces:
app.post("/return/", async (req, res) => {
  const bikeId = req.body.bikeId;
  const userEmail = req.body.userEmail;
  var db = admin.firestore();
  let user = await admin
    .auth()
    .getUserByEmail(userEmail)
    .catch(e => {
      res.status(302).send("Illegal user");
      return;
    });
  if (user) {
    console.log(user);
    let snapshot = await db
      .collection("bikes")
      .doc(bikeId)
      .get()
      .catch(e => {
        res.status(302).send("Bike doesn't exist");
        return;
      });
    let bike = snapshot.data();

    if (bike) {
      if (bike.isRented) {
        if (bike.userId === user.uid) {
          bike.isRented = false;
          let setDoc = await db
            .collection("bikes")
            .doc(bikeId)
            .set({ ...bike, userId: "" });
          res.status(200).send("bike is succesfully returned");
        } else {
          res.status(302).send("bike is rented by another user");
        }

        // await db.collection("rental_history").add({
        //   user_id: user.id,
        //   bike_id: bikeId
        // });
        // res.status(200).send("bike is succesfully returned");
        // await db.collection("rental_history").add({
        //   user_id: user.uid,
        //   bike_id: bikeId,
        //   date: admin.firestore.Timestamp.fromDate(new Date()),
        //   returned: true
        // });
      } else {
        res.status(302).send("bike is already available");
      }
    } else {
      res.status(302).send("No bike found");
    }
  }
});

exports.bike = functions.https.onRequest(app);
