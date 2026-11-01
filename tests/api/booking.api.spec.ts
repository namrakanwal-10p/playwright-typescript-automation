
import { test, expect } from '@playwright/test';
import { bookingTestData } from '../../test-data/bookingTestData';

const API_URL = 'https://restful-booker.herokuapp.com';

test.describe('Restful Booker API Tests', () => {

  // API-001: Get all booking IDs
  test('API-001: Verify GET all bookings', async ({ request }) => {

    const response = await request.get(`${API_URL}/booking`);
    const responseBody = await response.json();

    console.log('\n========== API-001 RESPONSE ==========');
    console.log('HTTP Status:', response.status());
    console.log('Response Headers:', response.headers());
    console.log('Response Body:');
    console.log(JSON.stringify(responseBody, null, 2));
    console.log('======================================\n');

    expect(response.status()).toBe(200);
    expect(Array.isArray(responseBody)).toBeTruthy();
    expect(responseBody.length).toBeGreaterThan(0);
    expect(responseBody[0]).toHaveProperty('bookingid');
  });


  // API-002: Get booking details
  test('API-002: Verify GET booking details', async ({ request }) => {

    const listResponse = await request.get(`${API_URL}/booking`);
    const bookings = await listResponse.json();

    expect(listResponse.status()).toBe(200);
    expect(bookings.length).toBeGreaterThan(0);

    const bookingId = bookings[0].bookingid;

    const response = await request.get(
      `${API_URL}/booking/${bookingId}`
    );

    const responseBody = await response.json();

    console.log('\n========== API-002 RESPONSE ==========');
    console.log('Booking ID:', bookingId);
    console.log('HTTP Status:', response.status());
    console.log('Response Headers:', response.headers());
    console.log('Response Body:');
    console.log(JSON.stringify(responseBody, null, 2));
    console.log('======================================\n');

    expect(response.status()).toBe(200);
    expect(responseBody).toHaveProperty('firstname');
    expect(responseBody).toHaveProperty('lastname');
    expect(responseBody).toHaveProperty('bookingdates');
  });


  // API-003: Create a new booking using POST
  test('API-003: Create a new booking', async ({ request }) => {

    const requestPayload = bookingTestData.validBooking;

    const response = await request.post(`${API_URL}/booking`, {
      data: requestPayload
    });

    const responseBody = await response.json();

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

    // Validate response
    expect(response.status()).toBe(200);
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


  // API-004: Create booking and retrieve it using booking ID
  test('API-004: Verify created booking using GET', async ({ request }) => {

    const requestPayload = bookingTestData.validBooking;

    // Create booking
    const postResponse = await request.post(`${API_URL}/booking`, {
      data: requestPayload
    });

    expect(postResponse.status()).toBe(200);

    const postResponseBody = await postResponse.json();
    const bookingId = postResponseBody.bookingid;

    console.log('\n========== API-004 CREATED BOOKING ==========');
    console.log('New Booking ID:', bookingId);
    console.log(JSON.stringify(postResponseBody, null, 2));

    // Retrieve newly created booking
    const getResponse = await request.get(
      `${API_URL}/booking/${bookingId}`
    );

    const getResponseBody = await getResponse.json();

    console.log('\n========== API-004 GET RESPONSE ==========');
    console.log('HTTP Status:', getResponse.status());
    console.log('Response Body:');
    console.log(JSON.stringify(getResponseBody, null, 2));
    console.log('============================================\n');

    // Validate retrieved booking
    expect(getResponse.status()).toBe(200);

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
