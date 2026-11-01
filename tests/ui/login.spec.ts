
import { test, expect } from '../../fixtures/test-fixtures';
import { users } from '../../test-data/users';

test.describe('SauceDemo Login Tests - Custom Fixtures', () => {

  test('SD-UI-001: Verify successful login', async ({ page, loginPage }) => {

    await loginPage.login(
      users.standardUser.username,
      users.standardUser.password
    );

    await loginPage.verifySuccessfulLogin();

    await expect(page.locator('.inventory_item')).toHaveCount(6);
  });

  test('SD-UI-002: Verify invalid credentials', async ({ loginPage }) => {

    await loginPage.login(
      users.invalidUser.username,
      users.invalidUser.password
    );

    await loginPage.verifyLoginError(
      users.invalidUser.expectedResult
    );
  });

  test('SD-UI-003: Verify locked-out user', async ({ loginPage }) => {

    await loginPage.login(
      users.lockedOutUser.username,
      users.lockedOutUser.password
    );

    await loginPage.verifyLoginError(
      users.lockedOutUser.expectedResult
    );
  });

});
