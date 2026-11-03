
# Playwright TypeScript Automation Framework

A scalable end-to-end automation framework built using **Playwright with TypeScript**, covering UI automation, REST API testing, Page Object Model (POM), reusable fixtures, Allure reporting, and GitHub Actions CI/CD.

## Project Overview

This project demonstrates practical automation testing for web applications and REST APIs using industry-standard QA practices.

The framework focuses on maintainability, reusability, test coverage, and continuous integration.

## Technology Stack

| Technology | Purpose |
|---|---|
| Playwright | UI and API automation |
| TypeScript | Programming language |
| Node.js | Runtime environment |
| Page Object Model | Maintainable UI automation |
| Allure | Test execution reporting |
| GitHub Actions | CI/CD pipeline |
| SauceDemo | UI automation application |
| Restful Booker | REST API testing |

## Project Structure

```text
playwrite-typescript/
├── .github/
│   └── workflows/
│       └── playwright.yml
├── fixtures/
│   └── test-fixtures.ts
├── pages/
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
├── test-data/
│   ├── users.ts
│   ├── loginTestData.ts
│   └── bookingTestData.ts
├── utils/
│   └── ApiHelper.ts
├── tests/
│   ├── ui/
│   │   ├── login.spec.ts
│   │   ├── login-data-driven.spec.ts
│   │   ├── inventory.spec.ts
│   │   ├── cart.spec.ts
│   │   └── checkout.spec.ts
│   └── api/
│       ├── booking.api.spec.ts
│       ├── auth.api.spec.ts
│       ├── booking-update.api.spec.ts
│       └── booking-delete.api.spec.ts
├── playwright.config.ts
└── package.json
```

## UI Automation Coverage

Application: [SauceDemo](https://www.saucedemo.com/)

- Valid and invalid login scenarios
- Locked-out user validation
- Data-driven login testing
- Product listing and inventory validation
- Product price sorting
- Add and remove products from cart
- Cart details validation
- Checkout workflow
- Order confirmation

## API Automation Coverage

Application: [Restful Booker](https://restful-booker.herokuapp.com/)

- GET booking IDs
- GET booking details
- POST create booking
- Authentication token generation
- PUT complete booking update
- PATCH partial booking update
- DELETE booking
- Verify deleted booking returns HTTP 404

## Reporting

The framework uses Allure Reports to provide:

- Test execution summaries
- Feature and story classifications
- Test severity levels
- Step-by-step execution details
- Passed and failed test visibility

Generate and open the report:

```bash
npm run allure:generate
npm run allure:open
```

## Installation and Setup

### Prerequisites

- Node.js
- npm
- Java (required for Allure CLI)

### Clone the repository

```bash
git clone https://github.com/namrakanwal-10p/playwright-typescript-automation.git
```

### Navigate to the project

```bash
cd playwright-typescript
```

### Install dependencies

```bash
npm install
```

### Install Playwright browsers

```bash
npx playwright install
```

## Execute Tests

Run all tests:

```bash
npx playwright test
```

Run UI tests:

```bash
npx playwright test tests/ui
```

Run API tests:

```bash
npx playwright test tests/api
```

Run tests in headed mode:

```bash
npx playwright test --headed
```

Run a specific test file:

```bash
npx playwright test tests/ui/login.spec.ts
```

## CI/CD Integration

GitHub Actions is configured to execute automated tests through a CI/CD workflow.

Workflow location:

```text
.github/workflows/playwright.yml
```

The pipeline helps validate UI and API automation during code changes.

## Quality Engineering Practices

- Page Object Model (POM)
- Reusable fixtures
- Data-driven testing
- API automation
- Positive and negative scenarios
- Assertions and response validation
- Allure reporting
- CI/CD integration
- Maintainable test organization

## Future Enhancements

- Cross-browser execution
- Advanced API test coverage
- AI-assisted test case generation
- AI-powered test maintenance
- Self-healing automation exploration
- Enhanced test analytics

## Author

**Namra Kanwal**

Senior Test Engineer | QA Automation | Playwright | TypeScript | API Testing | Quality Engineering

[LinkedIn](www.linkedin.com/in/namra-kanwal-qa) | [GitHub](https://github.com/namrakanwal-10p)
