
import { test, expect } from '../../fixtures/test-fixtures';
import { users } from '../../test-data/users';

test.describe('SauceDemo Inventory and Cart Tests', () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.login(
      users.standardUser.username,
      users.standardUser.password
    );
  });

  test('SD-UI-008: Verify all inventory products', async ({ inventoryPage }) => {
    await inventoryPage.verifyProductsDisplayed();
  });

  test('SD-UI-009: Sort products by price low to high', async ({ inventoryPage }) => {
    await inventoryPage.sortByPriceLowToHigh();

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

  test('SD-UI-010: Add backpack to cart', async ({ inventoryPage }) => {
    await inventoryPage.addBackpackToCart();
    await inventoryPage.verifyCartBadge('1');
  });

});
