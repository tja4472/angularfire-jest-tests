/**
 * @jest-environment node
 */
import { TestBed } from '@angular/core/testing';
import {
  AngularFireModule,
  FirebaseApp,
  FIREBASE_APP_NAME,
  FIREBASE_OPTIONS,
} from '@angular/fire/compat';
import {
  AngularFirestoreModule,
  AngularFirestore,
  SETTINGS as FIRESTORE_SETTINGS,
  USE_EMULATOR as USE_FIRESTORE_EMULATOR,
  AngularFirestoreDocument,
  AngularFirestoreCollection,
  DocumentData,
} from '@angular/fire/compat/firestore';
import 'firebase/compat/firestore';
import {
  AngularFireAuth,
  AngularFireAuthModule,
  SETTINGS as AUTH_SETTINGS,
  USE_EMULATOR as USE_AUTH_EMULATOR,
} from '@angular/fire/compat/auth';

const COMMON_CONFIG = {
  apiKey: 'AIzaSyBVSy3YpkVGiKXbbxeK0qBnu3-MNZ9UIjA',
  // authDomain: 'angularfire2-test.firebaseapp.com',
  // databaseURL: 'https://angularfire2-test.firebaseio.com',
  projectId: 'demo-1',
  // storageBucket: 'angularfire2-test.appspot.com',
  // messagingSenderId: '920323787688',
  // appId: '1:920323787688:web:2253a0e5eb5b9a8b',
  // databaseName: 'angularfire2-test',
  // measurementId: 'G-W20QDV5CZP',
};

const emulators = {
  auth: ['http://localhost:9099'],
  firestore: ['localhost', 8080],
};

function setup(firebaseAppName?: string) {
  let firebaseApp: FirebaseApp;
  let angularFireAuth: AngularFireAuth;
  let angularFirestore: AngularFirestore;

  TestBed.configureTestingModule({
    imports: [
      AngularFireModule.initializeApp(COMMON_CONFIG, firebaseAppName),
      AngularFirestoreModule,
      AngularFireAuthModule,
    ],
    providers: [
/*      
      {
        provide: FIRESTORE_SETTINGS,
        useValue: { experimentalAutoDetectLongPolling: true },
      },
      {
        provide: USE_FIRESTORE_EMULATOR,
        useValue: emulators.firestore,
      },
*/      
      {
        provide: AUTH_SETTINGS,
        useValue: { appVerificationDisabledForTesting: true },
      },
/*      
      {
        provide: USE_AUTH_EMULATOR,
        useValue: emulators.auth,
      },      
*/      
    ],
    teardown: { destroyAfterEach: false },
  });

  firebaseApp = TestBed.inject(FirebaseApp);
  angularFireAuth = TestBed.inject(AngularFireAuth);
  angularFirestore = TestBed.inject(AngularFirestore);

  return { firebaseApp, angularFireAuth, angularFirestore };
}

describe('AngularFirestore(1)', () => {
  it('should exist', () => {
    const { angularFirestore } = setup();
    expect(angularFirestore instanceof AngularFirestore).toBe(true);
  });

  it('should be an AngularFirestore type', () => {
    const { firebaseApp, angularFirestore } = setup('aa');
    expect(angularFirestore instanceof AngularFirestore).toEqual(true);
  });

  it('should have an initialized Firebase app', () => {
    const { firebaseApp, angularFirestore } = setup('aa');
    expect(angularFirestore.firestore.app).toBeDefined();
  });

  it('should have an initialized Firebase app instance member', () => {
    const firebaseAppName = 'testy';
    const { firebaseApp, angularFirestore } = setup(firebaseAppName);
    expect(angularFirestore.firestore.app.name).toEqual(firebaseAppName);
  });

  it('xshould have an initialized Firebase app instance member', () => {
    const firebaseAppName = '[DEFAULT]';
    const { firebaseApp, angularFirestore } = setup();
    expect(angularFirestore.firestore.app.name).toEqual(firebaseAppName);
  });
});

describe('AngularFireAuth(Default)', () => {
  it('should be an AngularFireAuth type', () => {
    const { angularFireAuth } = setup();
    expect(angularFireAuth instanceof AngularFireAuth).toEqual(true);
  });

  it('should have an initialized Firebase app', () => {
    const { angularFireAuth } = setup();
    expect(angularFireAuth.app).toBeDefined();
  });

  it('should have an initialized Firebase app instance member', async () => {
    const firebaseAppName = '[DEFAULT]';
    const { firebaseApp, angularFireAuth } = setup();
    const app = await angularFireAuth.app;
    expect(app).toEqual(firebaseApp);
    expect(app.name).toEqual(firebaseAppName);
  });

  it('should have disabled app verification for testing', async () => {
    const { angularFireAuth } = setup();
    const app = await angularFireAuth.app;
    expect(app.auth().settings.appVerificationDisabledForTesting).toBe(true);
  });
});

describe('AngularFireAuth(firebaseAppName)', () => {
  const firebaseAppName = 'xxxxx';

  it('should be an AngularFireAuth type', () => {
    const { angularFireAuth } = setup(firebaseAppName);
    expect(angularFireAuth instanceof AngularFireAuth).toEqual(true);
  });

  it('should have an initialized Firebase app', () => {
    const { angularFireAuth } = setup(firebaseAppName);
    expect(angularFireAuth.app).toBeDefined();
  });

  it('should have an initialized Firebase app instance member', async () => {
    const { firebaseApp, angularFireAuth } = setup(firebaseAppName);
    const app = await angularFireAuth.app;
    expect(app).toEqual(firebaseApp);
    expect(app.name).toEqual(firebaseAppName);
  });

  it('should have disabled app verification for testing', async () => {
    const { angularFireAuth } = setup(firebaseAppName);
    const app = await angularFireAuth.app;
    expect(app.auth().settings.appVerificationDisabledForTesting).toBe(true);
  });
});
