import React from "react";
import styles from "./index.module.scss";

import * as firebase from "firebase/app";
import "firebase/auth";

import { IfFirebaseUnAuthed } from "@react-firebase/auth";

export default () => (
  <IfFirebaseUnAuthed>
    {() => (
      <div className={styles.loginContainer}>
        <div className={styles.content}>
          <h1>Hello, dear biker</h1>
          <h3>Wanna ride!! Just hit the login button </h3>
          <button
            onClick={() => {
              const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
              firebase.auth().signInWithPopup(googleAuthProvider);
            }}
          >
            Sign In with Google
          </button>
        </div>
      </div>
    )}
  </IfFirebaseUnAuthed>
);
