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
│       ├── testing_image.png             # Sample image for upload tests
│       └── recipeMethod/                 # Recipe method step images
│           ├── method1.jpg – method5.jpg # Supported image attachments
│           └── unsupported.avif          # Unsupported format for modal test
├── pages/                                # Page Object Model classes
│   ├── BasePage.ts                       # Base class (navigation, waits, tenant switching)
│   ├── LogInOutPage.ts                   # Login/logout
│   ├── inventory&CountSheet/
│   │   ├── CountSheet.ts                 # Count sheet management
│   │   └── Inventory.ts                  # Inventory counts & closing
│   ├── product/
│   │   └── ProductPage.ts               # Product creation, editing, unit & price changes
│   ├── recipe/
│   │   ├── MenuItemsPage.ts             # Menu items, recipes, ingredients, method steps
│   │   └── RecipeSetupPage.ts           # Recipe type management
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
│   ├── invoiceProcessing/
│   │   ├── ediInvoices.spec.ts           # EDI invoice processing workflow
│   │   └── legacyReconciliationProcess.spec.ts  # Legacy invoice lifecycle
│   └── recipes/
│       ├── recipeTestSuite1.spec.ts      # Recipe methods, plate cost, duplicate recipes
│       ├── recipeTestSuite2.spec.ts      # Invoice pricing, UoM conversions, ingredient unit editing
│       └── recipeTestSuite3.spec.ts      # Inventory lifecycle, recipe deactivation protection
├── test_scripts/                         # Test script documentation (manual test steps)
│   ├── recipeTestSuite1_TestScript.md
│   ├── recipeTestSuite2_TestScript.md
│   ├── recipeTestSuite3_TestScript.md
│   ├── ediInvoices_TestScript.md
│   └── legacyReconciliationProcess_TestScript.md
├── commands.md                           # Quick-reference run commands
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

# Run individual recipe suites
npm run test:recipe1
npm run test:recipe2
npm run test:recipe3

# Run all recipe suites sequentially
npx playwright test tests/recipes/recipeTestSuite1.spec.ts tests/recipes/recipeTestSuite2.spec.ts tests/recipes/recipeTestSuite3.spec.ts --workers=1 --timeout 600000

# Run invoice processing tests
npm run test:legacy-recon
npm run test:edi-invoices

# Open the HTML test report
npm run test:report
```

See `commands.md` for the full list of run commands.

## Test Coverage

| Suite | Test File | Stages | Description |
|-------|-----------|--------|-------------|
| Recipe Suite 1 | `recipes/recipeTestSuite1.spec.ts` | 23 | Recipe creation with method steps & attachments, plate cost calculations, duplicate recipes, cross-tenant verification |
| Recipe Suite 2 | `recipes/recipeTestSuite2.spec.ts` | 47 | Invoice processing price updates, UoM product unit conversions (kg→lb), recipe ingredient unit editing with price recalculation, cross-tenant verification |
| Recipe Suite 3 | `recipes/recipeTestSuite3.spec.ts` | 26 | Inventory lifecycle (create, close, reopen, delete), recipe deactivation protection across same-tenant, same-company, and cross-company boundaries |
| EDI Invoices | `invoiceProcessing/ediInvoices.spec.ts` | 12 | EDI invoice workflow: team assignments, EDI configuration, SQS event submission, reconciliation, vendor item approval |
| Legacy Reconciliation | `invoiceProcessing/legacyReconciliationProcess.spec.ts` | 15 | Full invoice lifecycle: product/vendor item creation, invoice upload, preprocessing, initial review, reconciliation, final review, vendor item approval |

## Architecture

- **Page Object Model (POM):** All page classes extend `BasePage`, encapsulating locators and interaction methods.
- **Persistent Browser Context:** Tests reuse a single browser session via `basePersistentContext` fixture to maintain authentication state.
- **Serial Execution:** Test suites run in serial mode (`test.describe.configure({ mode: 'serial' })`) since workflows are multi-step and order-dependent.
- **Dynamic Test Data:** Entity names include a `TEST_RUN_ID` timestamp for test isolation across parallel runs.
- **Results Tracking:** Custom `createResultsTracker()` utility reports pass/fail status per stage in `afterAll` hooks.
- **Cross-Tenant Testing:** Tests verify data consistency across tenants (Wasabi Tysons, Wasabi Natick) and across company boundaries.

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
