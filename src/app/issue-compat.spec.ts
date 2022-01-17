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
  USE_EMULATOR,
  AngularFirestoreDocument,
  AngularFirestoreCollection,
  DocumentData,
} from '@angular/fire/compat/firestore';
import 'firebase/compat/firestore';

const randomString = () => (Math.random() + 1).toString(36).split('.')[1];

const rando = () => [randomString(), randomString(), randomString()].join('');

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

// Based on https://github.com/angular/angularfire/blob/master/src/compat/firestore/firestore.spec.ts
describe('(compat)AngularFirestore', () => {
  let app: FirebaseApp;
  let firestore: AngularFirestore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(COMMON_CONFIG),
        AngularFirestoreModule,
      ],
      providers: [{ provide: USE_EMULATOR, useValue: ['localhost', 8080] }],
      teardown: { destroyAfterEach: false },
    });
    app = TestBed.inject(FirebaseApp);
    firestore = TestBed.inject(AngularFirestore);
  });

  afterEach(() => {
    app.delete().catch(() => undefined);
  });

  it('should be the properly initialized type', () => {
    expect(firestore instanceof AngularFirestore).toBe(true);
  });

  it('should have an initialized Firebase app', () => {
    expect(firestore.firestore.app).toBeDefined();
  });

  it('should create an AngularFirestoreDocument from a string path', () => {
    const doc = firestore.doc('a/doc');
    expect(doc instanceof AngularFirestoreDocument).toBe(true);
  });

  it('should create an AngularFirestoreDocument from a reference', () => {
    const reference = firestore.doc<DocumentData>('a/doc').ref;
    const doc = firestore.doc(reference);
    expect(doc instanceof AngularFirestoreDocument).toBe(true);
  });

  it('should create an AngularFirestoreCollection from a string path', () => {
    const collection = firestore.collection('stuffs');
    expect(collection instanceof AngularFirestoreCollection).toBe(true);
  });

  it('should create an AngularFirestoreCollection from a reference', () => {
    const reference = firestore.collection<DocumentData>('stuffs').ref;
    const collection = firestore.collection(reference);
    expect(collection instanceof AngularFirestoreCollection).toBe(true);
  });

  it('should throw on an invalid document path', () => {
    const singleWrapper = () => firestore.doc('collection');
    const tripleWrapper = () => firestore.doc('collection/doc/subcollection');
    expect(singleWrapper).toThrowError();
    expect(tripleWrapper).toThrowError();
  });

  it('should throw on an invalid collection path', () => {
    const singleWrapper = () => firestore.collection('collection/doc');
    const quadWrapper = () =>
      firestore.collection('collection/doc/subcollection/doc');
    expect(singleWrapper).toThrowError();
    expect(quadWrapper).toThrowError();
  });
});

describe('(compat)AngularFirestore with different app', () => {
  let app: FirebaseApp;
  let afs: AngularFirestore;
  let firebaseAppName: string;

  beforeEach(() => {
    firebaseAppName = rando();
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(COMMON_CONFIG, firebaseAppName),
        AngularFirestoreModule,
      ],
      providers: [
        { provide: FIREBASE_APP_NAME, useValue: firebaseAppName },
        { provide: FIREBASE_OPTIONS, useValue: COMMON_CONFIG },
        { provide: USE_EMULATOR, useValue: ['localhost', 8080] },
      ],
      teardown: { destroyAfterEach: false },
    });

    app = TestBed.inject(FirebaseApp);
    afs = TestBed.inject(AngularFirestore);
  });

  afterEach(() => {
    app.delete().catch(() => undefined);
  });

  it('should be an AngularFirestore type', () => {
    expect(afs instanceof AngularFirestore).toEqual(true);
  });

  it('should have an initialized Firebase app', () => {
    expect(afs.firestore.app).toBeDefined();
  });

  it('should have an initialized Firebase app instance member', () => {
    expect(afs.firestore.app.name).toEqual(firebaseAppName);
  });
});
