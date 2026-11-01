
import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
  }

  async verifyCartItemCount(count: number) {
    await expect(this.cartItems).toHaveCount(count);
  }

  async verifyBackpackInCart() {
    await expect(this.page.locator('.inventory_item_name'))
      .toHaveText('Sauce Labs Backpack');
  }

  async removeBackpack() {
    await this.page.locator('[data-test="remove-sauce-labs-backpack"]').click();
  }

  async checkout() {
    await this.checkoutButton.click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  async verifyBackpackPrice() {
    await expect(
      this.page.locator('.inventory_item_price')
    ).toHaveText('$29.99');
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

}
