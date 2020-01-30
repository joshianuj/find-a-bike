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

import Dropdown from "react-dropdown";

import "react-dropdown/style.css";

const CustomDropDown = ({ options, firebase }) => (
  <Dropdown
    controlClassName={styles.dropdown}
    options={options}
    onChange={e => {
      if (e.value === "logout") {
        firebase.auth().signOut();
      }
    }}
    placeholder=""
  />
);

export default () => {
  return (
    <FirebaseAuthProvider {...config} firebase={firebase}>
      <header>
        <div className={styles.logo}>
          <img alt="Find a bike" src={logo} />
          <h1 className={styles.header}>Find a bike</h1>
        </div>
        <IfFirebaseAuthed>
          {() => {
            return (
              <FirebaseAuthConsumer>
                {({ isSignedIn, user, providerId }) => {
                  let options = [user.displayName, "logout"];
                  return (
                    <div className={styles.logout}>
                      <div class={styles.profileBlock}>
                        <img src={user.photoURL} alt="profile" />
                        <span>{user.displayName}</span>
                      </div>
                      <CustomDropDown options={options} firebase={firebase} />
                    </div>
                  );
                }}
              </FirebaseAuthConsumer>
            );
          }}
        </IfFirebaseAuthed>
      </header>
    </FirebaseAuthProvider>
  );
};
