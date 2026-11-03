
import { test } from '../../fixtures/test-fixtures';
import { users } from '../../test-data/users';
import * as allure from 'allure-js-commons';

test.describe('SauceDemo End-to-End Checkout', () => {

  test('SD-UI-014: Complete successful product checkout', async ({
    loginPage,
    inventoryPage,
    cartPage,
    checkoutPage,
    page
  }) => {

    await allure.feature('Checkout');
    await allure.story('Complete End-to-End Purchase');
    await allure.severity('critical');
    await allure.description(
      'Verify that a customer can successfully log in, add a product to the cart, enter customer information, review the order, and complete checkout.'
    );

    // Step 1: Login
    await allure.step('Step 1: Login with valid credentials', async () => {
      await loginPage.login(
        users.standardUser.username,
        users.standardUser.password
      );
      await page.waitForTimeout(2000);
    });

    // Step 2: Add product to cart
    await allure.step('Step 2: Add backpack to shopping cart', async () => {
      await inventoryPage.addBackpackToCart();
      await page.waitForTimeout(2000);
    });

    // Step 3: Open cart
    await allure.step('Step 3: Open shopping cart', async () => {
      await inventoryPage.openCart();
      await page.waitForTimeout(2000);
    });

    // Step 4: Verify cart
    await allure.step('Step 4: Verify product in shopping cart', async () => {
      await cartPage.verifyCartItemCount(1);
      await cartPage.verifyBackpackInCart();
      await page.waitForTimeout(2000);
    });

    // Step 5: Proceed to checkout
    await allure.step('Step 5: Proceed to checkout', async () => {
      await cartPage.proceedToCheckout();
      await page.waitForTimeout(2000);
    });

    // Step 6: Enter customer information
    await allure.step('Step 6: Enter customer information', async () => {
      await checkoutPage.enterCustomerInformation(
        users.checkoutUser.firstName,
        users.checkoutUser.lastName,
        users.checkoutUser.postalCode
      );
      await page.waitForTimeout(2000);
    });

    // Step 7: Verify checkout overview
    await allure.step('Step 7: Verify checkout overview', async () => {
      await checkoutPage.verifyCheckoutOverview();
      await page.waitForTimeout(2000);
    });

    // Step 8: Verify order total
    await allure.step('Step 8: Verify order total', async () => {
      await checkoutPage.verifyTotal();
      await page.waitForTimeout(2000);
    });

    // Step 9: Finish checkout
    await allure.step('Step 9: Complete the purchase', async () => {
      await checkoutPage.finishCheckout();
      await page.waitForTimeout(2000);
    });

    // Step 10: Verify order confirmation
    await allure.step('Step 10: Verify successful order confirmation', async () => {
      await checkoutPage.verifyOrderConfirmation();
      await page.waitForTimeout(2000);
    });

  });

});
