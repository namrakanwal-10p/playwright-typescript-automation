# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui/checkout.spec.ts >> SauceDemo End-to-End Checkout >> SD-UI-014: Complete successful product checkout
- Location: tests/ui/checkout.spec.ts:7:7

# Error details

```
Error: page.goto: net::ERR_NAME_NOT_RESOLVED at https://www.saucedemo.com/
Call log:
  - navigating to "https://www.saucedemo.com/", waiting until "load"

```

# Test source

```ts
  1  | 
  2  | import { Page, Locator, expect } from '@playwright/test';
  3  | 
  4  | export class LoginPage {
  5  |   readonly page: Page;
  6  |   readonly usernameInput: Locator;
  7  |   readonly passwordInput: Locator;
  8  |   readonly loginButton: Locator;
  9  |   readonly errorMessage: Locator;
  10 | 
  11 |   constructor(page: Page) {
  12 |     this.page = page;
  13 | 
  14 |     this.usernameInput = page.locator('[data-test="username"]');
  15 |     this.passwordInput = page.locator('[data-test="password"]');
  16 |     this.loginButton = page.locator('[data-test="login-button"]');
  17 |     this.errorMessage = page.locator('[data-test="error"]');
  18 |   }
  19 | 
  20 |   async open() {
> 21 |     await this.page.goto('https://www.saucedemo.com/');
     |                     ^ Error: page.goto: net::ERR_NAME_NOT_RESOLVED at https://www.saucedemo.com/
  22 |   }
  23 | 
  24 |   async login(username: string, password: string) {
  25 |     await this.usernameInput.fill(username);
  26 |     await this.passwordInput.fill(password);
  27 |     await this.loginButton.click();
  28 |   }
  29 | 
  30 |   async verifySuccessfulLogin() {
  31 |     await expect(this.page).toHaveURL(/inventory.html/);
  32 |   }
  33 | 
  34 |   async verifyLoginError(expectedMessage: string) {
  35 |     await expect(this.errorMessage).toContainText(expectedMessage);
  36 |   }
  37 | }
  38 | 
```