
import { Page, expect } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async enterCustomerInformation(
    firstName: string,
    lastName: string,
    postalCode: string
  ) {
    await this.page.locator('[data-test="firstName"]').fill(firstName);
    await this.page.locator('[data-test="lastName"]').fill(lastName);
    await this.page.locator('[data-test="postalCode"]').fill(postalCode);

    await this.page.locator('[data-test="continue"]').click();
  }

  async verifyCheckoutOverview() {
    await expect(this.page).toHaveURL(/checkout-step-two.html/);

    await expect(this.page.locator('.cart_item')).toHaveCount(1);

    await expect(this.page.locator('.inventory_item_name'))
      .toHaveText('Sauce Labs Backpack');
  }

  async verifyTotal() {
    await expect(this.page.locator('.summary_total_label'))
      .toContainText('Total:');
  }

  async finishCheckout() {
    await this.page.locator('[data-test="finish"]').click();
  }

  async verifyOrderConfirmation() {
    await expect(this.page).toHaveURL(/checkout-complete.html/);

    await expect(this.page.locator('.complete-header'))
      .toHaveText('Thank you for your order!');
  }
}
