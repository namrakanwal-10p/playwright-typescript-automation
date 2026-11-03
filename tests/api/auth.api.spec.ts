
import { test, expect } from '@playwright/test';
import { ApiHelper } from '../../utils/ApiHelper';
import * as allure from 'allure-js-commons';

test.describe('Restful Booker Authentication Tests', () => {

  test('API-AUTH-001: Generate authentication token', async ({ request }) => {

    await allure.feature('API Authentication');
    await allure.story('Generate Authentication Token');
    await allure.severity('critical');
    await allure.description(
      'Verify that valid API credentials generate an authentication token for authorized booking operations.'
    );

    let token: string;

    await allure.step('Send authentication request with valid credentials', async () => {
      token = await ApiHelper.generateAuthToken(request);
    });

    await allure.step('Verify authentication token is generated', async () => {
      expect(token).toBeTruthy();
      expect(typeof token).toBe('string');

      console.log('Authentication successful!');
      console.log('Token available for authenticated API requests.');
    });

  });

});
