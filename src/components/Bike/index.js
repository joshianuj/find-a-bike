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
                        <FirestoreCollection path={`/bikes`}>
                            {d => {
                                console.log(d.value)
                                return d.isLoading
                                    ? 'Loading'
                                    : d.value &&
                                          d.value.map((bike, i) => (
                                              <>
                                                  <div>{bike.code}</div>
                                                  <div>
                                                      {bike.location.latitude}
                                                  </div>
                                                  <div>
                                                      {bike.location.longitude}
                                                  </div>
                                              </>
                                          ))
                            }}
                        </FirestoreCollection>
                    )}
                </FirestoreProvider>
            )
        }}
    </FirebaseAuthConsumer>
)
