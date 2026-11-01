
import { test, expect } from '@playwright/test';

const API_URL = 'https://restful-booker.herokuapp.com';

test.describe('Booking DELETE API Tests', () => {

  test('API-007: Delete an existing booking successfully', async ({ request }) => {

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

    console.log('Created Booking ID:', bookingId);


    // STEP 2: Generate authentication token
    const authResponse = await request.post(`${API_URL}/auth`, {
      data: {
        username: 'admin',
        password: 'password123'
      }
    });

    expect(authResponse.status()).toBe(200);

    const authData = await authResponse.json();
    const token = authData.token;

    expect(token).toBeTruthy();


    // STEP 3: Delete the booking
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

    // Validate successful deletion
    expect(deleteResponse.status()).toBe(201);

  });


  test('API-008: Verify deleted booking returns 404', async ({ request }) => {

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

    console.log('Created Booking ID:', bookingId);


    // STEP 2: Generate authentication token
    const authResponse = await request.post(`${API_URL}/auth`, {
      data: {
        username: 'admin',
        password: 'password123'
      }
    });

    expect(authResponse.status()).toBe(200);

    const authData = await authResponse.json();
    const token = authData.token;

    expect(token).toBeTruthy();


    // STEP 3: Delete the booking
    const deleteResponse = await request.delete(
      `${API_URL}/booking/${bookingId}`,
      {
        headers: {
          Cookie: `token=${token}`
        }
      }
    );

    expect(deleteResponse.status()).toBe(201);


    // STEP 4: Try to retrieve the deleted booking
    const getResponse = await request.get(
      `${API_URL}/booking/${bookingId}`
    );

    const getResponseBody = await getResponse.text();

    console.log('\n========== DELETED BOOKING VERIFICATION ==========');
    console.log('Booking ID:', bookingId);
    console.log('GET HTTP Status:', getResponse.status());
    console.log('Response Body:', getResponseBody);
    console.log('==================================================\n');

    // Validate that the booking no longer exists
    expect(getResponse.status()).toBe(404);

  });

});
