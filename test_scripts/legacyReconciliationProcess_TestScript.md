# Test Script: Legacy Reconciliation Process

| Field              | Value                                              |
|--------------------|----------------------------------------------------|
| **Module**         | Invoice Processing                                 |
| **Test Suite**     | Legacy Reconciliation Process                       |
| **Spec File**      | `tests/invoiceProcessing/legacyReconciliationProcess.spec.ts` |
| **Execution Mode** | Serial                                             |
| **Tenant**         | Wasabi Tysons                                      |
| **Environment**    | DEV (`https://me-63384.dev.marginedge.com`)        |

---

## Prerequisites

- Access to the DEV environment with the following user accounts:
  - `accountmanager` (admin-level user)
  - `analyst` (first analyst)
  - `analyst2` (second analyst)
  - `leadanalyst` (lead analyst / CS lead)
- All accounts share the same password
- A test invoice image file available at the configured path
- The vendor **Arrow** must exist in the system
- The tenant **Wasabi Tysons** must be available

---

## Test Data

| Entity          | Naming Convention                        |
|-----------------|------------------------------------------|
| Product         | `Automated Product <TEST_RUN_ID>`        |
| Vendor Item     | `Automated Item <TEST_RUN_ID>`           |
| New Vendor Item | `Automated New Item <TEST_RUN_ID>`       |
| Invoice Number  | Random 6-digit number (auto-generated)   |

> `TEST_RUN_ID` is a shared timestamp generated during global setup to ensure test isolation.

---

## Test Steps

### Stage 1: Team Assignments

> **Logged in as:** `accountmanager`

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1.1 | Navigate to base URL | Home page loads |
| 1.2 | Click **Central** in the left navigation | Central menu expands |
| 1.3 | Click **Users** | Users section opens |
| 1.4 | Click **Team Assignments** tab | Team Assignments page loads with search input and analyst list |
| 1.5 | Search for **"The Analyst"** in the search input | Analyst row appears in the filtered list |
| 1.6 | Click the Lead Analyst autocomplete dropdown, type **"Lead Analyst"**, and select the option | Lead Analyst is assigned to The Analyst |
| 1.7 | Click **Save Changes** | Changes are saved successfully |
| 1.8 | Clear the search input | Search is cleared, full list reappears |
| 1.9 | Search for **"Second Analyst"** | Second Analyst row appears |
| 1.10 | Assign **Lead Analyst** via the autocomplete dropdown | Lead Analyst is assigned to Second Analyst |
| 1.11 | Click **Save Changes** | Changes are saved successfully |

---

### Stage 2: User Office Setup

> **Logged in as:** `accountmanager`

| Step | Action | Expected Result |
|------|--------|-----------------|
| 2.1 | Navigate to base URL | Home page loads |
| 2.2 | Click **Setup** in the left navigation | Setup menu expands |
| 2.3 | Click **Users** | Setup Users page loads |
| 2.4 | Click the **Show** dropdown and select **MarginEdge Staff** | User list filters to MarginEdge staff members |
| 2.5 | Search for **"the"** | The Analyst user appears in the list |
| 2.6 | Double-click the **1st row** to open user details | User detail form opens |
| 2.7 | In the **Office** dropdown, select **"Dhaka"** | Office is set to Dhaka |
| 2.8 | Scroll to the bottom of the page and click **Save** | User record is saved |
| 2.9 | Select **MarginEdge Staff** again, search **"second"** | Second Analyst appears in the list |
| 2.10 | Double-click the **1st row** | Second analyst's detail form opens |
| 2.11 | Select **"Dhaka"** as office and save | Second analyst's office is set |
| 2.12 | Select **MarginEdge Staff** again, search **"lead"** | Lead analyst appears in the list |
| 2.13 | Double-click the **1st row** | Lead analyst's detail form opens |
| 2.14 | Select **"Dhaka"** as office and save | Lead analyst's office is set to Dhaka |

---

### Stage 3: Product Creation

> **Logged in as:** `accountmanager`

| Step | Action | Expected Result |
|------|--------|-----------------|
| 3.1 | Navigate to base URL | Home page loads |
| 3.2 | Click **Products** in the left navigation | Products submenu expands |
| 3.3 | Click **View All Products** | Products list page loads |
| 3.4 | Verify the URL contains `/product` | URL is correct |
| 3.5 | Click **Add Product** | Add Product form opens with a product name selector |
| 3.6 | Click the product name selector, type the product name (e.g., `Automated Product <RUN_ID>`), and select the matching option | Product name is entered |
| 3.7 | Click the **Category** autocomplete, type **"Cleaning Supplies"**, and select the option | Category is set to Cleaning Supplies |
| 3.8 | In the **Report Unit** dropdown, select **"Case"** | Unit is set to Case |
| 3.9 | Click **Save** | Product is saved; page waits for network idle |
| 3.10 | Navigate back to Products list, click **All stores** tab, and search for the created product name | Product appears in the list, confirming successful creation |

---

### Stage 4: Vendor Item Creation

> **Logged in as:** `accountmanager`

| Step | Action | Expected Result |
|------|--------|-----------------|
| 4.1 | Navigate to base URL | Home page loads |
| 4.2 | Click **Vendors** in the left navigation | Vendors submenu expands |
| 4.3 | Click **Vendor Items** | Vendor Items list page loads |
| 4.4 | Verify the URL contains `/vendorProduct` | URL is correct |
| 4.5 | Click **Add a new Vendor Item** | Vendor Item creation form opens |
| 4.6 | In the vendor selector, search and select **"Arrow"** | Vendor is set to Arrow |
| 4.7 | Enter the vendor item name (e.g., `Automated Item <RUN_ID>`) | Name is filled |
| 4.8 | In the product selector, search and select the previously created product | Product is linked |
| 4.9 | Click **Add Packaging Option** | A new packaging row is added to the grid |
| 4.10 | Fill packaging details: Packaging = `1 Case`, Quantity = `1`, Unit = `Case`, Price = `80` | Packaging row is populated |
| 4.11 | Click **Save** | Vendor item is saved |
| 4.12 | Navigate back to Vendor Items list and search for the created item name | Vendor item appears in the list, confirming successful creation |

---

### Stage 5: Invoice Upload & Preprocessing

> **Logged in as:** `accountmanager`

| Step | Action | Expected Result |
|------|--------|-----------------|
| 5.1 | Navigate to Orders page (`/#/order/v2`) | Orders list loads |
| 5.2 | Clear the search input | Search field is cleared |
| 5.3 | Click **Add Invoice** dropdown, then click **Upload Invoice** | File chooser dialog opens |
| 5.4 | Select the test invoice image file | File uploads; Upload Status modal appears |
| 5.5 | Dismiss the Upload Status modal by clicking **Close/Done/OK** | Modal closes; invoice is now in the system |
| 5.6 | Scroll to the bottom of the page | Page scrolls down |
| 5.7 | Click **End Preprocessing** | Confirmation dialog appears |
| 5.8 | Click **OK/Confirm** | Preprocessing ends |
| 5.9 | Navigate back to Orders list | Orders list reloads |
| 5.10 | Verify the invoice status shows **"In Processing"** | Status cell displays "In Processing" |

---

### Stage 6: Initial Review

> **User switch required:** Logout `accountmanager`, login as `analyst`

| Step | Action | Expected Result |
|------|--------|-----------------|
| 6.1 | Click the username dropdown in the top-right corner | Dropdown menu appears |
| 6.2 | Click **Sign Out** | User is logged out; login page appears |
| 6.3 | Log in as **`analyst`** with the shared password | Login succeeds; home page loads |
| 6.4 | Switch tenant to **Wasabi Tysons** via the tenant dropdown | Tenant is switched; page reloads with Wasabi Tysons context |
| 6.5 | Navigate to base URL, click **Setup** > **Priority Report** | Priority Report page loads |
| 6.6 | Click the **Start** button in the Initial Review (IR) section | "How Many" modal appears |
| 6.7 | Click **OK** in the modal | Order opens for initial review; photo viewer tab may open (auto-closed) |
| 6.8 | Wait for the vendor dropdown to become visible | Order form is fully loaded and ready for input |
| 6.9 | In the vendor selector, search and select **"Arrow"** | Vendor is set |
| 6.10 | Generate a random 6-digit invoice number and enter it in the invoice number field | Invoice number is filled (this number is stored for later steps) |
| 6.11 | Click the invoice date field, then click **Today** (or enter today's date) | Date is set to today |
| 6.12 | If **Vendor Remittance Address** section appears: click "No address is provided on the invoice." and "No Phone number is provided on the invoice." | Remittance section is dismissed |
| 6.13 | Enter **80** in the verified total (spinbutton) field | Total is set to 80 |
| 6.14 | In the handwriting dropdown, select **"No"** | Handwriting is set to No |
| 6.15 | Click the checkbox: **"The initial review for this order is complete"** | Checkbox is checked |
| 6.16 | Click **Save and Complete** (or **Save**) | Order is saved; Verified modal may appear |
| 6.17 | If a **Verified** button appears, click it | Verification is confirmed |

---

### Stage 7: Reconciliation

> **User switch required:** Logout `analyst`, login as `analyst2`

| Step | Action | Expected Result |
|------|--------|-----------------|
| 7.1 | Logout the current analyst user | Login page appears |
| 7.2 | Log in as **`analyst2`** with the shared password | Login succeeds |
| 7.3 | Switch tenant to **Wasabi Tysons** | Tenant context is switched |
| 7.4 | Navigate to Orders page (`/#/order/v2`) | Orders list loads |
| 7.5 | Search for the invoice number (from Step 6.10) and click the matching row | Order detail page opens |
| 7.6 | If the order shows **"This invoice is currently locked for automation processes"**: click **Process Invoice** > **OK/Confirm** | Order is unlocked |
| 7.7 | Verify the **"Reconcile Order"** heading is visible | Reconciliation form is loaded and ready |
| 7.8 | Navigate to **Setup** > **Priority Report** | Priority Report page loads |
| 7.9 | Click the **Start** button in the Reconciliation section | "How Many" modal appears |
| 7.10 | Click **OK** | Order opens for reconciliation; photo viewer tab is auto-closed |
| 7.11 | In the vendor selector, search and select **"Arrow"** | Vendor is set |
| 7.12 | Enter the same invoice number from Step 6.10 | Invoice number matches the original |
| 7.13 | Set the invoice date to today | Date is filled |
| 7.14 | Dismiss remittance address section if present | Section is handled |
| 7.15 | Click **Add Line Item** | Add Line Item modal opens |
| 7.16 | Ensure **"Existing Vendor Item"** radio is selected | Radio button is active |
| 7.17 | Search for the vendor item name created in Stage 4 and select it | Item is selected |
| 7.18 | Enter quantity = `1`, unit price = `80` | Line item values are filled |
| 7.19 | Click **OK**, select a packaging option if prompted, then **Save** | Existing vendor item line is added |
| 7.20 | Click **Add Line Item** again | Modal reopens |
| 7.21 | Select **"New Vendor Item"** radio button | Form switches to new vendor item mode |
| 7.22 | Clear the item code field | Field is cleared |
| 7.23 | Enter the new vendor item name (e.g., `Automated New Item <RUN_ID>`) | Name is entered |
| 7.24 | Fill packaging: Packaging = `1 Case`, Quantity = `1`, Unit = `Case`, Price = `20` | Packaging details are populated |
| 7.25 | Click **Save** in the modal | New vendor item line is added to the order |
| 7.26 | Set the handwriting dropdown to **"No"** | Handwriting is set |
| 7.27 | Click the checkbox: **"The reconciliation for this order is complete"** | Checkbox is checked |
| 7.28 | Click **Save and Complete** | Order is saved |
| 7.29 | Click the **Verified** button in the modal | Verification is confirmed; navigates back to orders list |

---

### Stage 8: Final Review

> **User switch required:** Logout `analyst2`, login as `leadanalyst`

| Step | Action | Expected Result |
|------|--------|-----------------|
| 8.1 | Logout the current analyst2 user | Login page appears |
| 8.2 | Log in as **`leadanalyst`** with the shared password | Login succeeds |
| 8.3 | Switch tenant to **Wasabi Tysons** | Tenant context is switched |
| 8.4 | Navigate to **Setup** > **Priority Report** | Priority Report page loads |
| 8.5 | Click the **Start** button in the Final Review (FR) section | "How Many" modal appears |
| 8.6 | Click **OK** | Order opens for final review; photo viewer tab is auto-closed |
| 8.7 | Scroll to the bottom of the page | Page scrolls to reveal the review checkbox |
| 8.8 | Click the checkbox: **"This order has been reviewed and should be reviewed by a client services lead"** | Checkbox is checked via the iCheck helper |
| 8.9 | Click **Save** | Order is saved |
| 8.10 | Click the **Verified** button in the modal | Verification is confirmed; navigates back to orders list |

---

### Stage 9: New Vendor Item Approval

> **User switch required:** Logout `leadanalyst`, login as `accountmanager`

| Step | Action | Expected Result |
|------|--------|-----------------|
| 9.1 | Logout the current leadanalyst user | Login page appears |
| 9.2 | Log in as **`accountmanager`** with the shared password | Login succeeds |
| 9.3 | Click the **bell/notification icon** (NotificationsNoneIcon) | Notification dropdown opens |
| 9.4 | Click **New Vendor Items** menu item | New Vendor Items task page loads with a table of pending items |
| 9.5 | Select the **first row** checkbox | Row is selected (highlighted) |
| 9.6 | Click **Assign Product** button | Assign Product modal opens |
| 9.7 | Select **"Create new product"** radio button | Form switches to new product creation mode |
| 9.8 | Select category **"Baked Goods"** (via radio or dropdown search) | Category is set |
| 9.9 | Scroll down in the modal, set quantity to **1** | Quantity is entered |
| 9.10 | In the **Report Unit** dropdown, search and select **"Case"** | Report unit is set to Case |
| 9.11 | Scroll to the **"How many Case?"** grid, double-click the cell, and enter **1** | Case quantity is filled |
| 9.12 | Click **Save and Close** | Product is assigned; modal closes |
| 9.13 | Wait for network idle and the table row checkbox to be fully visible and interactive | Table is reloaded and ready |
| 9.14 | Click the **first row** checkbox | Row is clicked |
| 9.15 | Verify the row has the **selected** state (`.ui-grid-row-selected` is visible) | Row selection is confirmed before proceeding |
| 9.16 | Click **Approve Selected** | Approval spinner runs; "Approved!" modal appears |
| 9.17 | Click **OK** in the Approved modal | Approval is confirmed |

---

### Stage 10: Invoice Status Verification

> **Logged in as:** `accountmanager`

| Step | Action | Expected Result |
|------|--------|-----------------|
| 10.1 | Navigate to Orders page (`/#/order/v2`) | Orders list loads |
| 10.2 | Clear the search input | Search field is cleared |
| 10.3 | Search for the invoice number (from Step 6.10) | Matching order row appears |
| 10.4 | Verify the invoice status column shows **"Closed"** | Invoice has been fully processed and closed |

---

## Results Tracker

The automated test tracks the following stages. Each defaults to **failed** and is set to **passed** upon successful completion:

| # | Stage | Status |
|---|-------|--------|
| 1 | Assign Lead Analyst to The Analyst | passed |
| 2 | Assign Lead Analyst to Second Analyst | passed |
| 3 | Set Office for Analyst 1 | passed |
| 4 | Set Office for Analyst 2 | passed |
| 5 | Set Office for Lead Analyst | passed |
| 6 | Add Product | passed |
| 7 | Add Vendor Item | passed |
| 8 | File Uploaded | passed |
| 9 | End Preprocessing | passed |
| 10 | Initial Review | passed |
| 11 | Reconciliation | passed |
| 12 | Final Review | passed |
| 13 | Assign New Vendor Item Product | passed |
| 14 | Approve New Vendor Item | passed |
| 15 | Invoice Closed | passed |

---

## User Roles & Login Flow

```
accountmanager ──> Team Assignments, User Office Setup, Product, Vendor Item, Invoice Upload
       │
       ▼ (logout)
    analyst ──────> Initial Review (via Priority Report)
       │
       ▼ (logout)
   analyst2 ──────> Reconciliation (unlock order + Priority Report)
       │
       ▼ (logout)
 leadanalyst ─────> Final Review (via Priority Report)
       │
       ▼ (logout)
accountmanager ──> New Vendor Item Approval, Invoice Status Verification
```

---

## Notes

- All tests run in **serial mode** because each stage depends on the prior stage's completion.
- A persistent browser context is used to maintain session state within each login session.
- The `createResultsTracker` utility logs a summary table of all stage outcomes in the `afterAll` hook.
- The test generates a unique `TEST_RUN_ID` timestamp to prevent name collisions across parallel runs.
- Photo viewer tabs that open during Priority Report actions are automatically closed.
- Invoice lock warnings during reconciliation are handled by clicking **Process Invoice** to unlock.
- The "Approve New Vendor Item" step uses `selectFirstRowAndApprove()` which waits for network idle, selects the row, verifies the row is in a selected state (`.ui-grid-row-selected`), and only then clicks Approve. This prevents the approve action from firing before the row is actually selected.
