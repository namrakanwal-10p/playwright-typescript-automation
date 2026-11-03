
import { test, expect } from '../../fixtures/test-fixtures';
import { users } from '../../test-data/users';
import * as allure from 'allure-js-commons';

test.describe('SauceDemo Inventory and Cart Tests', () => {

  test.beforeEach(async ({ loginPage }) => {
    await allure.step('Login with valid user credentials', async () => {
      await loginPage.login(
        users.standardUser.username,
        users.standardUser.password
      );
    });
  });

  test('SD-UI-008: Verify all inventory products', async ({ inventoryPage }) => {

    await allure.feature('Inventory');
    await allure.story('Product Listing');
    await allure.severity('critical');
    await allure.description(
      'Verify that all six products are displayed on the SauceDemo inventory page.'
    );

    await allure.step('Verify all inventory products are displayed', async () => {
      await inventoryPage.verifyProductsDisplayed();
    });
  });

  test('SD-UI-009: Sort products by price low to high', async ({ inventoryPage }) => {

    await allure.feature('Inventory');
    await allure.story('Product Sorting');
    await allure.severity('normal');
    await allure.description(
      'Verify that products are sorted correctly from lowest to highest price.'
    );

    await allure.step('Sort products by price from low to high', async () => {
      await inventoryPage.sortByPriceLowToHigh();
    });

    await allure.step('Verify product prices are in ascending order', async () => {
      const prices = await inventoryPage.page
        .locator('.inventory_item_price')
        .allTextContents();

      const numericPrices = prices.map(price =>
        Number(price.replace('$', ''))
      );

      expect(numericPrices).toEqual(
        [...numericPrices].sort((a, b) => a - b)
      );
    });
  });

  test('SD-UI-010: Add backpack to cart', async ({ inventoryPage }) => {

    await allure.feature('Inventory');
    await allure.story('Add Product to Cart');
    await allure.severity('critical');
    await allure.description(
      'Verify that a user can add the Sauce Labs Backpack to the shopping cart.'
    );

    await allure.step('Add backpack to shopping cart', async () => {
      await inventoryPage.addBackpackToCart();
    });

    await allure.step('Verify shopping cart badge displays one item', async () => {
      await inventoryPage.verifyCartBadge('1');
    });
  });

});
