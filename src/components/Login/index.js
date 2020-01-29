import React from 'react'
import './index.module.scss'

import * as firebase from 'firebase/app'
import 'firebase/auth'

import { FirebaseAuthConsumer, IfFirebaseUnAuthed } from '@react-firebase/auth'

export default () => (
    <IfFirebaseUnAuthed>
        {() => (
            <>
                <button
                    onClick={() => {
                        const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
                        firebase.auth().signInWithPopup(googleAuthProvider)
                    }}>
                    Sign In with Google
                </button>
                <FirebaseAuthConsumer>
                    {({ isSignedIn, user, providerId }) => {
                        return (
                            <pre style={{ height: 300, overflow: 'auto' }}>
                                {JSON.stringify(
                                    { isSignedIn, user, providerId },
                                    null,
                                    2
                                )}
                            </pre>
                        )
                    }}
                </FirebaseAuthConsumer>
            </>
        )}
    </IfFirebaseUnAuthed>
)
