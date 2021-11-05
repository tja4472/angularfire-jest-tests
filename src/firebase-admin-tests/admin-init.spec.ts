/**
 * @jest-environment node
 *
 */
import * as admin from 'firebase-admin';

describe('firebase admin init', () => {
  it('can initializeApp', async () => {
    const app = admin.initializeApp({ projectId: 'demo-1' });
    expect(app).toBeTruthy();
  });
});
