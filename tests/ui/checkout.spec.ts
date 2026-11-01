
import { test } from '../../fixtures/test-fixtures';
import { users } from '../../test-data/users';

test.describe('SauceDemo End-to-End Checkout', () => {

  test('SD-UI-014: Complete successful product checkout', async ({
    loginPage,
    inventoryPage,
    cartPage,
    checkoutPage,
    page
  }) => {

    // Step 1: Login
    await loginPage.login(
      users.standardUser.username,
      users.standardUser.password
    );
    await page.waitForTimeout(2000);

    // Step 2: Add product to cart
    await inventoryPage.addBackpackToCart();
    await page.waitForTimeout(2000);

    // Step 3: Open cart
    await inventoryPage.openCart();
    await page.waitForTimeout(2000);

    // Step 4: Verify cart
    await cartPage.verifyCartItemCount(1);
    await cartPage.verifyBackpackInCart();
    await page.waitForTimeout(2000);

    // Step 5: Proceed to checkout
    await cartPage.proceedToCheckout();
    await page.waitForTimeout(2000);

    // Step 6: Enter customer information
    await checkoutPage.enterCustomerInformation(
      users.checkoutUser.firstName,
      users.checkoutUser.lastName,
      users.checkoutUser.postalCode
    );
    await page.waitForTimeout(2000);

    // Step 7: Verify checkout overview
    await checkoutPage.verifyCheckoutOverview();
    await page.waitForTimeout(2000);

    // Step 8: Verify order total
    await checkoutPage.verifyTotal();
    await page.waitForTimeout(2000);

    // Step 9: Finish checkout
    await checkoutPage.finishCheckout();
    await page.waitForTimeout(2000);

    // Step 10: Verify order confirmation
    await checkoutPage.verifyOrderConfirmation();
    await page.waitForTimeout(2000);

  });

});
