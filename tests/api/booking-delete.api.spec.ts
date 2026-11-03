
import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';

const API_URL = 'https://restful-booker.herokuapp.com';

const bookingPayload = {
  firstname: 'Namra',
  lastname: 'Kanwal',
  totalprice: 1500,
  depositpaid: true,
  bookingdates: {
    checkin: '2026-11-01',
    checkout: '2026-11-05'
  },
  additionalneeds: 'Breakfast'
};

test.describe('Booking DELETE API Tests', () => {

  test('API-007: Delete an existing booking successfully', async ({ request }) => {

    await allure.feature('API Testing');
    await allure.story('DELETE Booking');
    await allure.severity('critical');
    await allure.description(
      'Verify that an authenticated user can successfully delete an existing booking.'
    );

    let bookingId: number;
    let token: string;

    await allure.step('Create a booking for deletion', async () => {
      const createResponse = await request.post(`${API_URL}/booking`, {
        data: bookingPayload
      });

      expect(createResponse.status()).toBe(200);

      const createData = await createResponse.json();
      bookingId = createData.bookingid;

      console.log('Created Booking ID:', bookingId);
    });

    await allure.step('Generate authentication token', async () => {
      const authResponse = await request.post(`${API_URL}/auth`, {
        data: {
          username: 'admin',
          password: 'password123'
        }
      });

      expect(authResponse.status()).toBe(200);

      const authData = await authResponse.json();
      token = authData.token;

      expect(token).toBeTruthy();
    });

    await allure.step('Send DELETE request for the booking', async () => {
      const deleteResponse = await request.delete(
        `${API_URL}/booking/${bookingId}`,
        {
          headers: {
            Cookie: `token=${token}`
          }
        }
      );

      const deleteResponseBody = await deleteResponse.text();

      console.log('\n========== DELETE API RESPONSE ==========');
      console.log('Booking ID:', bookingId);
      console.log('HTTP Status:', deleteResponse.status());
      console.log('Response Body:', deleteResponseBody);
      console.log('=========================================\n');

      expect(deleteResponse.status()).toBe(201);
    });

  });


  test('API-008: Verify deleted booking returns 404', async ({ request }) => {

    await allure.feature('API Testing');
    await allure.story('DELETE Booking Verification');
    await allure.severity('critical');
    await allure.description(
      'Verify that a deleted booking can no longer be retrieved and returns HTTP 404.'
    );

    let bookingId: number;
    let token: string;

    await allure.step('Create a booking for deletion verification', async () => {
      const createResponse = await request.post(`${API_URL}/booking`, {
        data: bookingPayload
      });

      expect(createResponse.status()).toBe(200);

      const createData = await createResponse.json();
      bookingId = createData.bookingid;

      console.log('Created Booking ID:', bookingId);
    });

    await allure.step('Generate authentication token', async () => {
      const authResponse = await request.post(`${API_URL}/auth`, {
        data: {
          username: 'admin',
          password: 'password123'
        }
      });

      expect(authResponse.status()).toBe(200);

      const authData = await authResponse.json();
      token = authData.token;

      expect(token).toBeTruthy();
    });

    await allure.step('Delete the booking', async () => {
      const deleteResponse = await request.delete(
        `${API_URL}/booking/${bookingId}`,
        {
          headers: {
            Cookie: `token=${token}`
          }
        }
      );

      expect(deleteResponse.status()).toBe(201);
    });

    await allure.step('Verify deleted booking returns HTTP 404', async () => {
      const getResponse = await request.get(
        `${API_URL}/booking/${bookingId}`
      );

      const getResponseBody = await getResponse.text();

      console.log('\n========== DELETED BOOKING VERIFICATION ==========');
      console.log('Booking ID:', bookingId);
      console.log('GET HTTP Status:', getResponse.status());
      console.log('Response Body:', getResponseBody);
      console.log('==================================================\n');

      expect(getResponse.status()).toBe(404);
    });

  });

});
