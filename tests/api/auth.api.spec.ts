
import { test, expect } from '@playwright/test';
import { ApiHelper } from '../../utils/ApiHelper';

test.describe('Restful Booker Authentication Tests', () => {

  test('API-AUTH-001: Generate authentication token', async ({ request }) => {

    const token = await ApiHelper.generateAuthToken(request);

    expect(token).toBeTruthy();

    console.log('Authentication successful!');
    console.log('Token available for authenticated API requests.');

  });

});
