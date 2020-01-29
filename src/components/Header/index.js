import React from "react";
import styles from "./index.module.scss";
import logo from "../../assets/bike.svg";
import {
  FirebaseAuthConsumer,
  FirebaseAuthProvider,
  IfFirebaseAuthed
} from "@react-firebase/auth";
import config from "../../firebaseConfig";
import * as firebase from "firebase/app";

export default () => (
  <FirebaseAuthProvider {...config} firebase={firebase}>
    <header>
      <div className={styles.logo}>
        <img alt="Find a bike" src={logo} />
        <h1 className={styles.header}>Find a bike</h1>
      </div>
      <div className={styles.logout}>
        <IfFirebaseAuthed>
          {() => {
            return (
              <div>
                <FirebaseAuthConsumer>
                  {({ isSignedIn, user, providerId }) => {
                    return <></>;
                  }}
                </FirebaseAuthConsumer>
                <button
                  onClick={() => {
                    firebase.auth().signOut();
                  }}
                >
                  Sign Out
                </button>
              </div>
            );
          }}
        </IfFirebaseAuthed>
      </div>
    </header>
  </FirebaseAuthProvider>
);
