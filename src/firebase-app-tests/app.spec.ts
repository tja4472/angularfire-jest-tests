import { initializeApp } from 'firebase/app';

describe('firebase app init', () => {
  it('can initializeApp', async () => {
    const app = initializeApp({ projectId: 'demo-1' });
    expect(app).toBeTruthy();
  });
});
