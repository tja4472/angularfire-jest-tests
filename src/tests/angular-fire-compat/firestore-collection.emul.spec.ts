/**
 * @jest-environment node
 *
 * @group emulator-required/node*
 */
import { clearDatabase } from '../../emulator/emulator-helpers';
import { setupEmul } from './setup-emul';
import { FAKE_STOCK_DATA, rando, Stock } from './utils';

import {
  AngularFirestoreCollection,
  CollectionReference,
  QueryFn,
} from '@angular/fire/compat/firestore';
import { firstValueFrom } from 'rxjs';

describe('angularFirestore collection', () => {
  beforeEach(async () => {
    // await clearUserAccounts('demo-1');
    return clearDatabase('demo-1');
  });

  it('should set data(1)', async () => {
    const { angularFirestore } = await setupEmul(rando());
    const reference = <CollectionReference<Stock>>(
      angularFirestore.firestore.collection('Collection-a')
    );
    const queryFn: QueryFn<Stock> = (ref) => ref;
    const stocks = new AngularFirestoreCollection<Stock>(
      reference,
      queryFn(reference),
      angularFirestore
    );
    await stocks.doc('path-a').set(FAKE_STOCK_DATA);
    const documentSnapshot = await firstValueFrom(stocks.doc('path-a').get());

    try {
      expect(documentSnapshot.data()).toEqual(FAKE_STOCK_DATA);
    } finally {
      angularFirestore.firestore.terminate();
    }
  });

  it('should set data(2)', async () => {
    const { angularFirestore } = await setupEmul(rando());
    const stocks = angularFirestore.collection<Stock>('Collection-b');
    await stocks.doc('path-a').set(FAKE_STOCK_DATA);
    angularFirestore.firestore.terminate();
    //expect(angularFirestore instanceof AngularFirestore).toBe(true);
  });

  it('valueChanges(1)', (done) => {
    (async () => {
      const { angularFirestore } = await setupEmul(rando());
      const stocks = angularFirestore.collection<Stock>('Collection-b');

      await stocks.doc('path-a').set(FAKE_STOCK_DATA);

      const sub = stocks.valueChanges().subscribe((data) => {
        sub.unsubscribe();
        try {
          expect(data.length).toEqual(1);
          expect(data).toEqual([FAKE_STOCK_DATA]);
          done();
        } catch (error) {
          done(error);
        } finally {
          angularFirestore.firestore.terminate();
        }
      });
    })();
  });

  it('valueChanges with idField', (done) => {
    (async function () {
      const { angularFirestore } = await setupEmul(rando());
      const stocks = angularFirestore.collection<Stock>('Collection-b');

      await stocks.doc('path-a').set(FAKE_STOCK_DATA);

      const EXPECTED_DATA: Stock & { customID: string } = {
        customID: 'path-a',
        name: 'FAKE',
        price: 1,
      };

      const sub = stocks
        .valueChanges({ idField: 'customID' })
        .subscribe((data) => {
          sub.unsubscribe();
          try {
            expect(data.length).toEqual(1);
            expect(data).toEqual([EXPECTED_DATA]);
            done();
          } catch (error) {
            done(error);
          } finally {
            angularFirestore.firestore.terminate();
          }
        });
    })();
  });
});
