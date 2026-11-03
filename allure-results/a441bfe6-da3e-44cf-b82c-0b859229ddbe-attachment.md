# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api/booking-update.api.spec.ts >> Restful Booker PUT and PATCH API Tests >> API-005: Update complete booking using PUT
- Location: tests/api/booking-update.api.spec.ts:12:7

# Error details

```
ReferenceError: authToken is not defined
```

# Test source

```ts
  1   | 
  2   | import { test, expect } from '@playwright/test';
  3   | import { ApiHelper } from '../../utils/ApiHelper';
  4   | import { bookingTestData } from '../../test-data/bookingTestData';
  5   | import * as allure from 'allure-js-commons';
  6   | 
  7   | const API_URL = 'https://restful-booker.herokuapp.com';
  8   | 
  9   | test.describe('Restful Booker PUT and PATCH API Tests', () => {
  10  | 
  11  |   // API-005: Update complete booking using PUT
  12  |   test('API-005: Update complete booking using PUT', async ({ request }) => {
  13  | 
  14  |     await allure.feature('API Testing');
  15  |     await allure.story('PUT Complete Booking Update');
  16  |     await allure.severity('critical');
  17  |     await allure.description(
  18  |       'Verify that an authenticated user can update all booking fields using the PUT method.'
  19  |     );
  20  | 
  21  |     let bookingId: number;
  22  |     let responseBody: any;
  23  | 
  24  |     const updatedBooking = {
  25  |       firstname: 'Namra Updated',
  26  |       lastname: 'Kanwal Updated',
  27  |       totalprice: 2500,
  28  |       depositpaid: true,
  29  |       bookingdates: {
  30  |         checkin: '2026-11-10',
  31  |         checkout: '2026-11-15'
  32  |       },
  33  |       additionalneeds: 'Lunch'
  34  |     };
  35  | 
  36  |     await allure.step('Generate authentication token', async () => {
  37  |       const token = await ApiHelper.generateAuthToken(request);
  38  |       expect(token).toBeTruthy();
  39  | 
  40  |       // Keep token available for the update request
> 41  |       authToken = token;
      |                ^ ReferenceError: authToken is not defined
  42  |     });
  43  | 
  44  |     await allure.step('Create a booking for PUT update', async () => {
  45  |       const createResponse = await request.post(`${API_URL}/booking`, {
  46  |         data: bookingTestData.validBooking
  47  |       });
  48  | 
  49  |       expect(createResponse.status()).toBe(200);
  50  | 
  51  |       const createdBooking = await createResponse.json();
  52  |       bookingId = createdBooking.bookingid;
  53  | 
  54  |       console.log('\nCreated Booking ID:', bookingId);
  55  |     });
  56  | 
  57  |     await allure.step('Send PUT request with complete updated booking', async () => {
  58  |       const response = await request.put(
  59  |         `${API_URL}/booking/${bookingId}`,
  60  |         {
  61  |           headers: {
  62  |             Cookie: `token=${authToken}`,
  63  |             Accept: 'application/json'
  64  |           },
  65  |           data: updatedBooking
  66  |         }
  67  |       );
  68  | 
  69  |       responseBody = await response.json();
  70  | 
  71  |       console.log('\n========== API-005 PUT RESPONSE ==========');
  72  |       console.log('Booking ID:', bookingId);
  73  |       console.log('HTTP Status:', response.status());
  74  |       console.log('Updated Request Payload:');
  75  |       console.log(JSON.stringify(updatedBooking, null, 2));
  76  |       console.log('Response Body:');
  77  |       console.log(JSON.stringify(responseBody, null, 2));
  78  |       console.log('==========================================\n');
  79  | 
  80  |       expect(response.status()).toBe(200);
  81  |     });
  82  | 
  83  |     await allure.step('Verify all updated booking fields', async () => {
  84  |       expect(responseBody.firstname).toBe(updatedBooking.firstname);
  85  |       expect(responseBody.lastname).toBe(updatedBooking.lastname);
  86  |       expect(responseBody.totalprice).toBe(updatedBooking.totalprice);
  87  |       expect(responseBody.additionalneeds).toBe(updatedBooking.additionalneeds);
  88  |     });
  89  | 
  90  |   });
  91  | 
  92  | 
  93  |   // API-006: Update selected booking fields using PATCH
  94  |   test('API-006: Update selected booking fields using PATCH', async ({ request }) => {
  95  | 
  96  |     await allure.feature('API Testing');
  97  |     await allure.story('PATCH Partial Booking Update');
  98  |     await allure.severity('critical');
  99  |     await allure.description(
  100 |       'Verify that an authenticated user can update selected booking fields using PATCH while other fields remain unchanged.'
  101 |     );
  102 | 
  103 |     let bookingId: number;
  104 |     let responseBody: any;
  105 | 
  106 |     const partialUpdate = {
  107 |       firstname: 'Namra PATCH Updated',
  108 |       totalprice: 3000
  109 |     };
  110 | 
  111 |     let authToken: string;
  112 | 
  113 |     await allure.step('Generate authentication token', async () => {
  114 |       authToken = await ApiHelper.generateAuthToken(request);
  115 |       expect(authToken).toBeTruthy();
  116 |     });
  117 | 
  118 |     await allure.step('Create a booking for PATCH update', async () => {
  119 |       const createResponse = await request.post(`${API_URL}/booking`, {
  120 |         data: bookingTestData.validBooking
  121 |       });
  122 | 
  123 |       expect(createResponse.status()).toBe(200);
  124 | 
  125 |       const createdBooking = await createResponse.json();
  126 |       bookingId = createdBooking.bookingid;
  127 | 
  128 |       console.log('\nCreated Booking ID:', bookingId);
  129 |     });
  130 | 
  131 |     await allure.step('Send PATCH request with selected fields', async () => {
  132 |       const response = await request.patch(
  133 |         `${API_URL}/booking/${bookingId}`,
  134 |         {
  135 |           headers: {
  136 |             Cookie: `token=${authToken}`,
  137 |             Accept: 'application/json'
  138 |           },
  139 |           data: partialUpdate
  140 |         }
  141 |       );
```