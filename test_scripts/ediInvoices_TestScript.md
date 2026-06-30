# Test Script: EDI Invoices

| Field              | Value                                              |
|--------------------|----------------------------------------------------|
| **Module**         | Invoice Processing                                 |
| **Test Suite**     | EDI Invoices                                       |
| **Spec File**      | `tests/invoiceProcessing/ediInvoices.spec.ts`      |
| **Page Object**    | `pages/vendor/CentralVendorPage.ts`                |
| **Execution Mode** | Serial                                             |
| **Tenant**         | Wasabi Tysons                                      |
| **Environment**    | DEV (`https://me-63384.dev.marginedge.com`)        |

---

## Prerequisites

- Access to the DEV environment
- The central vendor **JFC** must exist in the system
- The tenant **Wasabi Tysons** must be available

---

## Results Tracker

| Stage                    | Result   |
|--------------------------|----------|
| Setup EDI Vendor Format  | passed   |

---

## Test Steps

### Stage 1: Navigate to Central Vendors

| Step | Action                                                        | Expected Result                            |
|------|---------------------------------------------------------------|--------------------------------------------|
| 1.1  | Navigate to the base URL                                     | Dashboard loads                            |
| 1.2  | Wait for the Central nav link (`#navbar_central`) to appear   | Central button is visible in left nav      |
| 1.3  | Click on the Central button                                  | Central sub-menu expands                   |
| 1.4  | Scroll down the left nav panel to reveal Vendors link         | Vendors link becomes visible               |
| 1.5  | Click on the Vendors link (`a[href="#/central/vendor"]`)      | Central Vendors page loads                 |

### Stage 2: Search and Open Central Vendor JFC

| Step | Action                                                        | Expected Result                            |
|------|---------------------------------------------------------------|--------------------------------------------|
| 2.1  | Wait for the search input to appear                           | Search textbox is visible                  |
| 2.2  | Clear the search input and type `JFC`                         | Search results filter to JFC vendor        |
| 2.3  | Wait for the grid row to appear                               | JFC row is visible in the grid             |
| 2.4  | Click on the first grid row                                   | Vendor edit page loads (`#/central/vendor/6/edit`) |

### Stage 3: Setup EDI Vendor Format

| Step | Action                                                        | Expected Result                            |
|------|---------------------------------------------------------------|--------------------------------------------|
| 3.1  | Wait for the EDI format grid (`.grid-on-form`) to load        | EDI Format (Inbound Email) grid is visible |
| 3.2  | Check if a row with `marginedge.com` already exists           | Returns true or false                      |
| 3.3a | **If row does NOT exist:** Click `+ Add Inbound EDI Format`   | A new empty row appears in the EDI grid    |
| 3.3b | Double-click the new row's cell to enter edit mode            | An input field appears inside the cell     |
| 3.3c | Fill the input with `marginedge.com`                          | Input shows `marginedge.com`               |
| 3.4  | **If row DOES exist:** Skip steps 3.3a–3.3c                   | Existing row is preserved                  |
| 3.5  | Scroll to the bottom of the page                              | Save button is visible                     |
| 3.6  | Click the Save button                                         | Vendor is saved, page redirects to list    |

---

## Notes

- The EDI format grid uses Angular UI Grid which requires a `dblclick` event to enter cell edit mode. The `page.evaluate` approach with `dispatchEvent(new MouseEvent('dblclick'))` is used instead of Playwright's `.dblclick()` for reliable triggering.
- The input that appears after double-clicking is a sibling of `.ui-grid-cell-contents` inside the parent `.ui-grid-cell`, not a child of the cell contents div.
- The test is idempotent — it checks for existing `marginedge.com` row before adding, so it can be run multiple times without creating duplicates.
- The EDI grid is scoped using `.grid-on-form` to avoid matching rows in other grids on the page (Used in Units, etc.).
