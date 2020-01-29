import React from "react";
import "./index.module.scss";

import * as firebase from "firebase/app";
import "firebase/firestore";
import { FirebaseAuthConsumer } from "@react-firebase/auth";
import {
  FirestoreProvider,
  FirestoreCollection
} from "@react-firebase/firestore";
import firebaseConfig from "../../firebaseConfig";
import SMarker from "../Maps/SMarker";
export default () => (
  <FirebaseAuthConsumer>
    {({ isSignedIn, user, providerId }) => {
      return (
        <FirestoreProvider {...firebaseConfig} firebase={firebase}>
          {user && (
            <FirestoreCollection path={`/bikes`}>
              {d => {
                return d.isLoading
                  ? "Loading"
                  : d.value &&
                      d.value.map((bike, i) => <SMarker key={i} bike={bike} />);
              }}
            </FirestoreCollection>
          )}
        </FirestoreProvider>
      );
    }}
  </FirebaseAuthConsumer>
);
