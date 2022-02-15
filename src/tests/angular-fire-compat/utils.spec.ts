import {
  AngularFirestoreCollection,
  CollectionReference,
  QueryFn,
} from '@angular/fire/compat/firestore';
import { clearDatabase } from '../../emulator/emulator-helpers';
import { setupEmul } from './setup.emul.spec';
import { FAKE_STOCK_DATA, randomName, Stock } from './utils';

describe('utils', () => {
  beforeEach(async () => {
    // await clearUserAccounts('demo-1');
    return clearDatabase('demo-1');
  });

  it('should create random name', async () => {
    const { angularFirestore } = await setupEmul();
    const name1 = randomName(angularFirestore.firestore);
    const name2 = randomName(angularFirestore.firestore);

    expect(name1.length).toBeGreaterThan(0);
    expect(name2.length).toBeGreaterThan(0);
    expect(name1).not.toEqual(name2);
  });


});
