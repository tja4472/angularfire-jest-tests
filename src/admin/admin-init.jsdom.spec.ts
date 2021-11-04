/**
 * @jest-environment jsdom
 *
 */
import * as admin from 'firebase-admin';

describe('firebase admin init using jsdom', () => {
  it('can initializeApp', async () => {
    const app = admin.initializeApp({ projectId: 'demo-1' });
    expect(app).toBeTruthy();
  });
});
