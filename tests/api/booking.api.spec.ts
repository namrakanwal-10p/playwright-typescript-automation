
import { test, expect } from '@playwright/test';
import { bookingTestData } from '../../test-data/bookingTestData';
import * as allure from 'allure-js-commons';

const API_URL = 'https://restful-booker.herokuapp.com';

test.describe('Restful Booker API Tests', () => {

  // API-001: Get all booking IDs
  test('API-001: Verify GET all bookings', async ({ request }) => {

    await allure.feature('API Testing');
    await allure.story('GET All Bookings');
    await allure.severity('critical');
    await allure.description(
      'Verify that the API returns a list of booking IDs with a successful HTTP response.'
    );

    let responseBody: any;

    await allure.step('Send GET request to retrieve all bookings', async () => {
      const response = await request.get(`${API_URL}/booking`);
      responseBody = await response.json();

      console.log('\n========== API-001 RESPONSE ==========');
      console.log('HTTP Status:', response.status());
      console.log('Response Headers:', response.headers());
      console.log('Response Body:');
      console.log(JSON.stringify(responseBody, null, 2));
      console.log('======================================\n');

      expect(response.status()).toBe(200);
    });

    await allure.step('Validate booking IDs in response', async () => {
      expect(Array.isArray(responseBody)).toBeTruthy();
      expect(responseBody.length).toBeGreaterThan(0);
      expect(responseBody[0]).toHaveProperty('bookingid');
    });
  });


  // API-002: Get booking details
  test('API-002: Verify GET booking details', async ({ request }) => {

    await allure.feature('API Testing');
    await allure.story('GET Booking Details');
    await allure.severity('critical');
    await allure.description(
      'Verify that the API returns booking details for an existing booking ID.'
    );

    let responseBody: any;
    let bookingId: number;

    await allure.step('Retrieve available booking IDs', async () => {
      const listResponse = await request.get(`${API_URL}/booking`);
      const bookings = await listResponse.json();

      expect(listResponse.status()).toBe(200);
      expect(bookings.length).toBeGreaterThan(0);

      bookingId = bookings[0].bookingid;
    });

    await allure.step('Send GET request using booking ID', async () => {
      const response = await request.get(
        `${API_URL}/booking/${bookingId}`
      );

      responseBody = await response.json();

      console.log('\n========== API-002 RESPONSE ==========');
      console.log('Booking ID:', bookingId);
      console.log('HTTP Status:', response.status());
      console.log('Response Headers:', response.headers());
      console.log('Response Body:');
      console.log(JSON.stringify(responseBody, null, 2));
      console.log('======================================\n');

      expect(response.status()).toBe(200);
    });

    await allure.step('Validate booking details in response', async () => {
      expect(responseBody).toHaveProperty('firstname');
      expect(responseBody).toHaveProperty('lastname');
      expect(responseBody).toHaveProperty('bookingdates');
    });
  });


  // API-003: Create a new booking using POST
  test('API-003: Create a new booking', async ({ request }) => {

    await allure.feature('API Testing');
    await allure.story('POST Create Booking');
    await allure.severity('critical');
    await allure.description(
      'Verify that a new booking can be created and the API returns the correct booking details.'
    );

    const requestPayload = bookingTestData.validBooking;
    let responseBody: any;

    await allure.step('Send POST request with booking payload', async () => {
      const response = await request.post(`${API_URL}/booking`, {
        data: requestPayload
      });

      responseBody = await response.json();

      console.log('\n========== API-003 POST REQUEST ==========');
      console.log('Request URL:', `${API_URL}/booking`);
      console.log('Request Method: POST');
      console.log('Request Payload:');
      console.log(JSON.stringify(requestPayload, null, 2));
      console.log('\nHTTP Status:', response.status());
      console.log('Response Headers:', response.headers());
      console.log('Response Body:');
      console.log(JSON.stringify(responseBody, null, 2));
      console.log('==========================================\n');

      expect(response.status()).toBe(200);
    });

    await allure.step('Validate newly created booking details', async () => {
      expect(responseBody).toHaveProperty('bookingid');
      expect(responseBody.bookingid).toBeGreaterThan(0);

      expect(responseBody.booking.firstname)
        .toBe(requestPayload.firstname);

      expect(responseBody.booking.lastname)
        .toBe(requestPayload.lastname);

      expect(responseBody.booking.totalprice)
        .toBe(requestPayload.totalprice);

      expect(responseBody.booking.depositpaid)
        .toBe(requestPayload.depositpaid);
    });
  });


  // API-004: Create booking and retrieve it using booking ID
  test('API-004: Verify created booking using GET', async ({ request }) => {

    await allure.feature('API Testing');
    await allure.story('POST and GET Booking Verification');
    await allure.severity('critical');
    await allure.description(
      'Verify that a newly created booking can be retrieved using its booking ID and that the returned data matches the original request.'
    );

    const requestPayload = bookingTestData.validBooking;
    let bookingId: number;

    await allure.step('Create a new booking using POST', async () => {
      const postResponse = await request.post(`${API_URL}/booking`, {
        data: requestPayload
      });

      expect(postResponse.status()).toBe(200);

      const postResponseBody = await postResponse.json();
      bookingId = postResponseBody.bookingid;

      console.log('\n========== API-004 CREATED BOOKING ==========');
      console.log('New Booking ID:', bookingId);
      console.log(JSON.stringify(postResponseBody, null, 2));
    });

    let getResponseBody: any;

    await allure.step('Retrieve the newly created booking using GET', async () => {
      const getResponse = await request.get(
        `${API_URL}/booking/${bookingId}`
      );

      getResponseBody = await getResponse.json();

      console.log('\n========== API-004 GET RESPONSE ==========');
      console.log('HTTP Status:', getResponse.status());
      console.log('Response Body:');
      console.log(JSON.stringify(getResponseBody, null, 2));
      console.log('============================================\n');

      expect(getResponse.status()).toBe(200);
    });

    await allure.step('Compare retrieved booking with original request data', async () => {
      expect(getResponseBody.firstname)
        .toBe(requestPayload.firstname);

      expect(getResponseBody.lastname)
        .toBe(requestPayload.lastname);

      expect(getResponseBody.totalprice)
        .toBe(requestPayload.totalprice);

      expect(getResponseBody.depositpaid)
        .toBe(requestPayload.depositpaid);

      expect(getResponseBody.bookingdates.checkin)
        .toBe(requestPayload.bookingdates.checkin);

      expect(getResponseBody.bookingdates.checkout)
        .toBe(requestPayload.bookingdates.checkout);
    });
  });

});
