
import { APIRequestContext, expect } from '@playwright/test';

const API_URL = 'https://restful-booker.herokuapp.com';

export class ApiHelper {

  static async generateAuthToken(
    request: APIRequestContext
  ): Promise<string> {

    const response = await request.post(`${API_URL}/auth`, {
      data: {
        username: 'admin',
        password: 'password123'
      }
    });

    const responseBody = await response.json();

    console.log('\n========== AUTH API RESPONSE ==========');
    console.log('HTTP Status:', response.status());
    console.log('Token Generated:', Boolean(responseBody.token));
    console.log('Response Body:');
    console.log(JSON.stringify({
      token: responseBody.token ? '********' : null
    }, null, 2));
    console.log('=======================================\n');

    expect(response.status()).toBe(200);
    expect(responseBody).toHaveProperty('token');
    expect(responseBody.token).toBeTruthy();

    return responseBody.token;
  }
}
