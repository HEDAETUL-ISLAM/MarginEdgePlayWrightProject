# MarginEdge Playwright Test Suite

End-to-end test automation framework for the [MarginEdge](https://me-63384.dev.marginedge.com) restaurant management application, built with Playwright and TypeScript.

## Project Structure

```
playWrightProject/
├── config/
│   └── dev.json                          # Environment config (URLs, credentials, timeouts)
├── fixtures/
│   ├── basePersistentContext.ts           # Custom fixture with persistent browser context
│   ├── testData.ts                       # Dynamic test data (run ID-based naming)
│   └── files/
│       └── testing_image.png             # Sample image for upload tests
├── pages/                                # Page Object Model classes
│   ├── BasePage.ts                       # Base class (navigation, waits, tenant switching)
│   ├── LogInOutPage.ts                   # Login/logout
│   ├── inventory&CountSheet/
│   │   ├── CountSheet.ts                 # Count sheet management
│   │   └── Inventory.ts                  # Inventory counts & closing
│   ├── product/
│   │   └── ProductPage.ts               # Product creation & management
│   ├── recipe/
│   │   └── MenuItemsPage.ts             # Menu items, recipes, ingredients
│   ├── reconciliation/
│   │   ├── OrderPage.ts                  # Invoice upload & reconciliation
│   │   ├── PriorityReportPage.ts         # Task assignment (IR, Recon, FR)
│   │   └── NewVendorItemsTaskPage.ts     # Vendor item task approval
│   ├── restaurantUnit/
│   │   └── RestaurantUnitPage.ts         # Tenant/restaurant unit management
│   ├── users/
│   │   ├── TeamAssignmentsPage.ts        # Lead analyst team assignments
│   │   └── UserPage.ts                   # User setup & office assignment
│   └── vendorItem/
│       └── VendorItemPage.ts             # Vendor items & packaging options
├── tests/
│   ├── componentBased/                   # Component-level regression tests
│   │   ├── recipeRegression.spec.ts
│   │   └── tenantRegression.spec.ts
│   ├── invoiceProcessing/                # Invoice reconciliation workflow
│   │   └── legacyReconciliationProcess.spec.ts
│   └── recipes/                          # End-to-end recipe workflow
│       └── recipeTestSuite.spec.ts
├── global-setup.ts                       # Global test initialization (login)
└── playwright.config.ts                  # Playwright configuration
```

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm

## Setup

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

## Running Tests

```bash
# Run all tests
npm run test

# Run tests with Playwright UI mode
npm run test:ui

# Run tests in headed mode (visible browser)
npm run test:headed

# Run the recipe test suite only
npm run test:recipe

# Open the HTML test report
npm run test:report
```

## Test Coverage

| Area | Test File | Description |
|------|-----------|-------------|
| Recipe Regression | `componentBased/recipeRegression.spec.ts` | Recipe creation and ingredient management |
| Tenant Regression | `componentBased/tenantRegression.spec.ts` | Restaurant unit (tenant) creation |
| Invoice Processing | `invoiceProcessing/legacyReconciliationProcess.spec.ts` | Full invoice lifecycle: team setup, upload, preprocessing, review, reconciliation, final review |
| Recipe Workflow | `recipes/recipeTestSuite.spec.ts` | Multi-stage workflow: products, vendor items, menu items, invoices, inventory |

## Architecture

- **Page Object Model (POM):** All page classes extend `BasePage`, encapsulating locators and interaction methods.
- **Persistent Browser Context:** Tests reuse a single browser session via `basePersistentContext` fixture to maintain authentication state.
- **Serial Execution:** Test suites run in serial mode (`test.describe.configure({ mode: 'serial' })`) since workflows are multi-step and order-dependent.
- **Dynamic Test Data:** Entity names include a `TEST_RUN_ID` timestamp for test isolation across parallel runs.
- **Results Tracking:** Custom `createResultsTracker()` utility reports pass/fail status per stage in `afterAll` hooks.

## Configuration

Environment settings are stored in `config/dev.json`:

- **baseUrl** — Target application URL
- **routes** — Application route mappings (orders, inventory, menu items, etc.)
- **credentials** — Login credentials
- **timeouts** — Short (5s), default (15s), long (30s), extended (60s), global (300s)
- **browser** — Chrome launch arguments and user data directory

## Tech Stack

- **[Playwright](https://playwright.dev/)** v1.60 — Browser automation and test runner
- **TypeScript** — Type-safe test authoring
- **HTML Reporter** — Built-in test report generation
