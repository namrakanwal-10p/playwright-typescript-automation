
import { test, expect } from '@playwright/test';

const API_URL = 'https://restful-booker.herokuapp.com';

test.describe('Booking Negative API Tests', () => {

  test('API-009: Delete booking without authentication', async ({ request }) => {

    // STEP 1: Create a booking
    const createResponse = await request.post(`${API_URL}/booking`, {
      data: {
        firstname: 'Namra',
        lastname: 'Kanwal',
        totalprice: 1500,
        depositpaid: true,
        bookingdates: {
          checkin: '2026-11-01',
          checkout: '2026-11-05'
        },
        additionalneeds: 'Breakfast'
      }
    });

    expect(createResponse.status()).toBe(200);

    const createData = await createResponse.json();
    const bookingId = createData.bookingid;

    // STEP 2: Attempt deletion without an authentication token
    const deleteResponse = await request.delete(
      `${API_URL}/booking/${bookingId}`
    );

    console.log('Unauthorized DELETE Status:', deleteResponse.status());

    // STEP 3: Validate access is forbidden
    expect(deleteResponse.status()).toBe(403);

  });


  test('API-010: Get booking using an invalid booking ID', async ({ request }) => {

    // STEP 1: Send GET request with a non-existent booking ID
    const response = await request.get(`${API_URL}/booking/99999999`);

    const responseBody = await response.text();

    console.log('Invalid Booking ID Status:', response.status());
    console.log('Response Body:', responseBody);

    // STEP 2: Validate booking is not found
    expect(response.status()).toBe(404);

  });

});
