
import { test, expect } from '../../fixtures/test-fixtures';
import { users } from '../../test-data/users';
import * as allure from 'allure-js-commons';

test.describe('SauceDemo Login Tests - Custom Fixtures', () => {

  test('SD-UI-001: Verify successful login', async ({ page, loginPage }) => {

    await allure.feature('Login');
    await allure.story('Successful Login');
    await allure.severity('critical');
    await allure.description(
      'Verify that a valid user can log in and access the SauceDemo inventory page.'
    );

    await allure.step('Enter valid login credentials', async () => {
      await loginPage.login(
        users.standardUser.username,
        users.standardUser.password
      );
    });

    await allure.step('Verify successful login and inventory products', async () => {
      await loginPage.verifySuccessfulLogin();
      await expect(page.locator('.inventory_item')).toHaveCount(6);
    });
  });

  test('SD-UI-002: Verify invalid credentials', async ({ loginPage }) => {

    await allure.feature('Login');
    await allure.story('Invalid Login');
    await allure.severity('normal');
    await allure.description(
      'Verify that an error message is displayed when invalid credentials are entered.'
    );

    await allure.step('Enter invalid login credentials', async () => {
      await loginPage.login(
        users.invalidUser.username,
        users.invalidUser.password
      );
    });

    await allure.step('Verify the login error message', async () => {
      await loginPage.verifyLoginError(
        users.invalidUser.expectedResult
      );
    });
  });

  test('SD-UI-003: Verify locked-out user', async ({ loginPage }) => {

    await allure.feature('Login');
    await allure.story('Locked Out User');
    await allure.severity('normal');
    await allure.description(
      'Verify that a locked-out user cannot log in and receives the appropriate error message.'
    );

    await allure.step('Enter locked-out user credentials', async () => {
      await loginPage.login(
        users.lockedOutUser.username,
        users.lockedOutUser.password
      );
    });

    await allure.step('Verify the locked-out error message', async () => {
      await loginPage.verifyLoginError(
        users.lockedOutUser.expectedResult
      );
    });
  });

});
