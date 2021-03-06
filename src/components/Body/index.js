import React from "react";

import Login from "../Login";
import Maps from "../Maps";
import * as firebase from "firebase/app";
import "firebase/auth";

import { FirebaseAuthProvider, IfFirebaseAuthed } from "@react-firebase/auth";

import config from "../../firebaseConfig";

export default () => (
  <FirebaseAuthProvider {...config} firebase={firebase}>
    <Login />
    <IfFirebaseAuthed>
      <Maps />
    </IfFirebaseAuthed>
  </FirebaseAuthProvider>
);
