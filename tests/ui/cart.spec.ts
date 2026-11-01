
import { test, expect } from '../../fixtures/test-fixtures';
import { users } from '../../test-data/users';

test.describe('SauceDemo Cart Tests', () => {

  test.beforeEach(async ({ loginPage, inventoryPage }) => {
    await loginPage.login(
      users.standardUser.username,
      users.standardUser.password
    );

    await inventoryPage.addBackpackToCart();
    await inventoryPage.openCart();
  });

  test('SD-UI-011: Verify backpack details in cart', async ({ cartPage }) => {
    await cartPage.verifyCartItemCount(1);
    await cartPage.verifyBackpackInCart();
    await cartPage.verifyBackpackPrice();
  });

  test('SD-UI-012: Remove backpack from cart', async ({ cartPage }) => {
    await cartPage.removeBackpack();
    await cartPage.verifyCartItemCount(0);
  });

  test('SD-UI-013: Proceed to checkout', async ({ cartPage, page }) => {
    await cartPage.proceedToCheckout();

    await expect(page).toHaveURL(/checkout-step-one.html/);
    await expect(page.locator('[data-test="firstName"]')).toBeVisible();
  });

});
