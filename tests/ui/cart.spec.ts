
import { test, expect } from '../../fixtures/test-fixtures';
import { users } from '../../test-data/users';
import * as allure from 'allure-js-commons';

test.describe('SauceDemo Cart Tests', () => {

  test.beforeEach(async ({ loginPage, inventoryPage }) => {
    await allure.step('Login with valid user credentials', async () => {
      await loginPage.login(
        users.standardUser.username,
        users.standardUser.password
      );
    });

    await allure.step('Add backpack to cart and open shopping cart', async () => {
      await inventoryPage.addBackpackToCart();
      await inventoryPage.openCart();
    });
  });

  test('SD-UI-011: Verify backpack details in cart', async ({ cartPage }) => {

    await allure.feature('Shopping Cart');
    await allure.story('Verify Cart Product Details');
    await allure.severity('critical');
    await allure.description(
      'Verify that the backpack is displayed in the shopping cart with the correct product details and price.'
    );

    await allure.step('Verify cart contains one item', async () => {
      await cartPage.verifyCartItemCount(1);
    });

    await allure.step('Verify backpack product details', async () => {
      await cartPage.verifyBackpackInCart();
    });

    await allure.step('Verify backpack price', async () => {
      await cartPage.verifyBackpackPrice();
    });
  });

  test('SD-UI-012: Remove backpack from cart', async ({ cartPage }) => {

    await allure.feature('Shopping Cart');
    await allure.story('Remove Product from Cart');
    await allure.severity('normal');
    await allure.description(
      'Verify that a user can remove the backpack from the shopping cart.'
    );

    await allure.step('Remove backpack from shopping cart', async () => {
      await cartPage.removeBackpack();
    });

    await allure.step('Verify shopping cart is empty', async () => {
      await cartPage.verifyCartItemCount(0);
    });
  });

  test('SD-UI-013: Proceed to checkout', async ({ cartPage, page }) => {

    await allure.feature('Shopping Cart');
    await allure.story('Proceed to Checkout');
    await allure.severity('critical');
    await allure.description(
      'Verify that a user can proceed from the shopping cart to the checkout information page.'
    );

    await allure.step('Click checkout button', async () => {
      await cartPage.proceedToCheckout();
    });

    await allure.step('Verify checkout information page is displayed', async () => {
      await expect(page).toHaveURL(/checkout-step-one.html/);
      await expect(page.locator('[data-test="firstName"]')).toBeVisible();
    });
  });

});
