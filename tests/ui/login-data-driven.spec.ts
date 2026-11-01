
import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { loginTestCases } from '../../test-data/loginTestData';

for (const testCase of loginTestCases) {

  test(`${testCase.testId}: ${testCase.description}`, async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.open();

    await loginPage.login(
      testCase.username,
      testCase.password
    );

    await loginPage.verifyLoginError(testCase.expectedMessage);

  });

}
