/**
 * @jest-environment jsdom
 *
 * @group emulator-required/jsdom
 */
import * as admin from 'firebase-admin';

import { initializeApp } from 'firebase/app';
import {
  getAuth,
  connectAuthEmulator,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import { clearDatabase, clearUserAccounts } from '../emulator/emulator-helpers';
import { EmulatorInfo } from '../emulator/emulator-info';

const COMMON_CONFIG = {
  apiKey: 'AIzaSyBVSy3YpkVGiKXbbxeK0qBnu3-MNZ9UIjA',
  authDomain: 'angularfire2-test.firebaseapp.com',
  databaseURL: 'https://angularfire2-test.firebaseio.com',
  projectId: 'demo-1',
  storageBucket: 'angularfire2-test.appspot.com',
  messagingSenderId: '920323787688',
  appId: '1:920323787688:web:2253a0e5eb5b9a8b',
  databaseName: 'angularfire2-test',
  measurementId: 'G-W20QDV5CZP',
};

describe('firebase auth', () => {
  beforeAll(async () => {
    // The Firebase Admin SDK automatically connects to the Authentication emulator when the FIREBASE_AUTH_EMULATOR_HOST environment variable is set.
    // https://firebase.google.com/docs/emulator-suite/connect_auth
    process.env['FIREBASE_AUTH_EMULATOR_HOST'] =
      EmulatorInfo.auth.firebaseAuthEmulatorHost;

    // The Firebase Admin SDKs automatically connect to the Cloud Firestore emulator when the FIRESTORE_EMULATOR_HOST environment variable is set.
    // https://firebase.google.com/docs/emulator-suite/connect_firestore
    process.env['FIRESTORE_EMULATOR_HOST'] = 'localhost:8080';

    admin.initializeApp({ projectId: 'demo-1' });

    const app = initializeApp({ apiKey: 'dummy-apiKey', projectId: 'demo-1' });

    const auth = getAuth(app);
    connectAuthEmulator(auth, EmulatorInfo.auth.useEmulatorUrl);
  });

  beforeEach(async () => {
    await clearUserAccounts('demo-1');
    await clearDatabase('demo-1');
  });

  it('can successfully sign in', async () => {
    const userRecord = await admin.auth().createUser({
      uid: 'uid1',
      email: 'test@test.example',
      password: 'password',
    });

    const auth = getAuth();

    const userCredential = await signInWithEmailAndPassword(
      auth,
      'test@test.example',
      'password'
    );

    expect(userCredential.user.email).toBe('test@test.example');
  });
});
