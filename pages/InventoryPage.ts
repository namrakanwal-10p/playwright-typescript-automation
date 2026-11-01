
import { Page, Locator, expect } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly products: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;
  readonly sortDropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.products = page.locator('.inventory_item');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
  }

  async verifyProductsDisplayed() {
    await expect(this.products).toHaveCount(6);
  }

  async sortByPriceLowToHigh() {
    await this.sortDropdown.selectOption('lohi');
  }

  async addBackpackToCart() {
    await this.page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  }

  async verifyCartBadge(count: string) {
    await expect(this.cartBadge).toHaveText(count);
  }

  async openCart() {
    await this.cartLink.click();
  }
}
