import React, { Component } from 'react'
import './index.module.scss'

import * as firebase from 'firebase/app'
import 'firebase/firestore'
import { FirebaseAuthConsumer } from '@react-firebase/auth'
import {
    FirestoreProvider,
    FirestoreCollection,
} from '@react-firebase/firestore'
import firebaseConfig from '../../firebaseConfig'

export default () => (
    <FirebaseAuthConsumer>
        {({ isSignedIn, user, providerId }) => {
            return (
                <FirestoreProvider {...firebaseConfig} firebase={firebase}>
                    {user && (
                        <FirestoreCollection
                            path={`/bikes/u60Fo4xDnPln5I1T10NU`}>
                            {d => {
                                return d.isLoading
                                    ? 'Loading'
                                    : d.value &&
                                          d.value.map((bike, i) => (
                                              <div key={i}>{bike.code}</div>
                                          ))
                            }}
                        </FirestoreCollection>
                    )}
                </FirestoreProvider>
            )
        }}
    </FirebaseAuthConsumer>
)
