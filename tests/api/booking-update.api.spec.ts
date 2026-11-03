
import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';

const API_URL = 'https://restful-booker.herokuapp.com';

test.describe('Booking PUT API Tests', () => {

  test('API-005: Update complete booking using PUT', async ({ request }) => {

    await allure.feature('API Testing');
    await allure.story('PUT Complete Booking Update');
    await allure.severity('critical');
    await allure.description(
      'Verify that an authenticated user can completely update an existing booking.'
    );

    // Declare variables inside the test scope
    let bookingId = 0;
    let authToken = '';

    await allure.step('Generate authentication token', async () => {
      const authResponse = await request.post(`${API_URL}/auth`, {
        data: {
          username: 'admin',
          password: 'password123'
        }
      });

      expect(authResponse.status()).toBe(200);

      const authData = await authResponse.json();
      authToken = authData.token;

      expect(authToken).toBeTruthy();

      console.log('Authentication token generated successfully.');
    });

    await allure.step('Create a booking', async () => {
      const createResponse = await request.post(`${API_URL}/booking`, {
        data: {
          firstname: 'Namra',
          lastname: 'Kanwal',
          totalprice: 1500,
          depositpaid: true,
          bookingdates: {
            checkin: '2026-11-10',
            checkout: '2026-11-15'
          },
          additionalneeds: 'Breakfast'
        }
      });

      expect(createResponse.status()).toBe(200);

      const createData = await createResponse.json();
      bookingId = createData.bookingid;

      console.log('Created Booking ID:', bookingId);
    });

    await allure.step('Update complete booking using PUT', async () => {
      const updatedBooking = {
        firstname: 'Namra Updated',
        lastname: 'Kanwal Updated',
        totalprice: 2500,
        depositpaid: true,
        bookingdates: {
          checkin: '2026-11-20',
          checkout: '2026-11-25'
        },
        additionalneeds: 'Lunch'
      };

      const putResponse = await request.put(
        `${API_URL}/booking/${bookingId}`,
        {
          headers: {
            Cookie: `token=${authToken}`,
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          data: updatedBooking
        }
      );

      const responseBody = await putResponse.text();

      console.log('\n========== PUT API RESPONSE ==========');
      console.log('Booking ID:', bookingId);
      console.log('HTTP Status:', putResponse.status());
      console.log('Response Body:', responseBody);
      console.log('======================================\n');

      expect(putResponse.status()).toBe(200);

      const responseData = JSON.parse(responseBody);

      expect(responseData.firstname).toBe('Namra Updated');
      expect(responseData.lastname).toBe('Kanwal Updated');
      expect(responseData.totalprice).toBe(2500);
      expect(responseData.additionalneeds).toBe('Lunch');
      expect(responseData.bookingdates.checkin).toBe('2026-11-20');
      expect(responseData.bookingdates.checkout).toBe('2026-11-25');
    });

  });

});
