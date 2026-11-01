
import { test, expect } from '@playwright/test';
import { ApiHelper } from '../../utils/ApiHelper';
import { bookingTestData } from '../../test-data/bookingTestData';

const API_URL = 'https://restful-booker.herokuapp.com';

test.describe('Restful Booker PUT and PATCH API Tests', () => {

  // API-005: Update complete booking using PUT
  test('API-005: Update complete booking using PUT', async ({ request }) => {

    // Step 1: Generate authentication token
    const token = await ApiHelper.generateAuthToken(request);

    // Step 2: Create a booking
    const createResponse = await request.post(`${API_URL}/booking`, {
      data: bookingTestData.validBooking
    });

    expect(createResponse.status()).toBe(200);

    const createdBooking = await createResponse.json();
    const bookingId = createdBooking.bookingid;

    console.log('\nCreated Booking ID:', bookingId);

    // Step 3: Prepare complete updated booking
    const updatedBooking = {
      firstname: 'Namra Updated',
      lastname: 'Kanwal Updated',
      totalprice: 2500,
      depositpaid: true,
      bookingdates: {
        checkin: '2026-11-10',
        checkout: '2026-11-15'
      },
      additionalneeds: 'Lunch'
    };

    // Step 4: Send PUT request
    const response = await request.put(
      `${API_URL}/booking/${bookingId}`,
      {
        headers: {
          Cookie: `token=${token}`,
          Accept: 'application/json'
        },
        data: updatedBooking
      }
    );

    const responseBody = await response.json();

    // Step 5: Print response
    console.log('\n========== API-005 PUT RESPONSE ==========');
    console.log('Booking ID:', bookingId);
    console.log('HTTP Status:', response.status());
    console.log('Updated Request Payload:');
    console.log(JSON.stringify(updatedBooking, null, 2));
    console.log('Response Body:');
    console.log(JSON.stringify(responseBody, null, 2));
    console.log('==========================================\n');

    // Step 6: Validate updated booking
    expect(response.status()).toBe(200);
    expect(responseBody.firstname).toBe(updatedBooking.firstname);
    expect(responseBody.lastname).toBe(updatedBooking.lastname);
    expect(responseBody.totalprice).toBe(updatedBooking.totalprice);
    expect(responseBody.additionalneeds).toBe(updatedBooking.additionalneeds);

  });


  // API-006: Update selected booking fields using PATCH
  test('API-006: Update selected booking fields using PATCH', async ({ request }) => {

    // Step 1: Generate authentication token
    const token = await ApiHelper.generateAuthToken(request);

    // Step 2: Create a booking
    const createResponse = await request.post(`${API_URL}/booking`, {
      data: bookingTestData.validBooking
    });

    expect(createResponse.status()).toBe(200);

    const createdBooking = await createResponse.json();
    const bookingId = createdBooking.bookingid;

    console.log('\nCreated Booking ID:', bookingId);

    // Step 3: Prepare partial update payload
    const partialUpdate = {
      firstname: 'Namra PATCH Updated',
      totalprice: 3000
    };

    // Step 4: Send PATCH request
    const response = await request.patch(
      `${API_URL}/booking/${bookingId}`,
      {
        headers: {
          Cookie: `token=${token}`,
          Accept: 'application/json'
        },
        data: partialUpdate
      }
    );

    const responseBody = await response.json();

    // Step 5: Print response
    console.log('\n========== API-006 PATCH RESPONSE ==========');
    console.log('Booking ID:', bookingId);
    console.log('HTTP Status:', response.status());
    console.log('Partial Update Payload:');
    console.log(JSON.stringify(partialUpdate, null, 2));
    console.log('Response Body:');
    console.log(JSON.stringify(responseBody, null, 2));
    console.log('============================================\n');

    // Step 6: Validate updated fields
    expect(response.status()).toBe(200);
    expect(responseBody.firstname).toBe(partialUpdate.firstname);
    expect(responseBody.totalprice).toBe(partialUpdate.totalprice);

    // Verify fields not included in PATCH remain unchanged
    expect(responseBody.lastname).toBe(
      bookingTestData.validBooking.lastname
    );

    expect(responseBody.additionalneeds).toBe(
      bookingTestData.validBooking.additionalneeds
    );

  });

});
