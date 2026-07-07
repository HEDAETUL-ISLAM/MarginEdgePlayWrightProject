# Test Script: EDI Invoices

| Field              | Value                                              |
|--------------------|----------------------------------------------------|
| **Module**         | Invoice Processing                                 |
| **Test Suite**     | EDI Invoices                                       |
| **Spec File**      | `tests/invoiceProcessing/ediInvoices.spec.ts`      |
| **Execution Mode** | Serial                                             |
| **Tenant**         | Wasabi Tysons                                      |
| **Environment**    | DEV (`https://me-63384.dev.marginedge.com`)        |

---

## Prerequisites

- Access to the DEV environment with the following user accounts:
  - `accountmanager` (admin-level user)
  - `developer` (developer user with integrations access)
  - `analyst2` (second analyst)
  - `leadanalyst` (lead analyst / CS lead)
- All accounts share the same password
- The central vendor **JFC** must exist in the system
- The tenant **Wasabi Tysons** must be available
- A mock SQS event JSON file at `fixtures/files/mockSqsEvent.json`

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

### Stage 3: Central Vendor EDI Config

> **Logged in as:** `accountmanager`

| Step | Action | Expected Result |
|------|--------|-----------------|
| 3.1 | Navigate to the base URL | Dashboard loads |
| 3.2 | Wait for the Central nav link (`#navbar_central`) to appear | Central button is visible in left nav |
| 3.3 | Click on the Central button | Central sub-menu expands |
| 3.4 | Scroll down the left nav panel to reveal Vendors link | Vendors link becomes visible |
| 3.5 | Click on the Vendors link (`a[href="#/central/vendor"]`) | Central Vendors page loads |
| 3.6 | Wait for the search input, clear and type `JFC` | Search results filter to JFC vendor |
| 3.7 | Click on the first grid row | Vendor edit page loads |
| 3.8 | Wait for the EDI format grid (`.grid-on-form`) to load | EDI Format (Inbound Email) grid is visible |
| 3.9 | Check if a row with `marginedge.com` already exists | Returns true or false |
| 3.10a | **If row does NOT exist:** Click `+ Add Inbound EDI Format` | A new empty row appears in the EDI grid |
| 3.10b | Double-click the new row's cell to enter edit mode | An input field appears inside the cell |
| 3.10c | Fill the input with `marginedge.com` | Input shows `marginedge.com` |
| 3.11 | **If row DOES exist:** Skip steps 3.10a–3.10c | Existing row is preserved |
| 3.12 | Scroll to the bottom of the page and click **Save** | Vendor is saved |

---

### Stage 4: Local Vendor EDI Config

> **Logged in as:** `accountmanager`

| Step | Action | Expected Result |
|------|--------|-----------------|
| 4.1 | Navigate to **Vendors** via the left navigation | Vendors list page loads |
| 4.2 | Search for **"JFC"** | JFC vendor appears in the search results |
| 4.3 | Click on the JFC search result | Vendor detail page opens |
| 4.4 | Click **Edit Vendor** | Vendor edit form opens |
| 4.5 | Enter **"99999"** in the vendor account number field | Account number is filled |
| 4.6 | Select **"EDI-first Processing"** in the EDI mode dropdown | EDI mode is set |
| 4.7 | Click **Save** | Vendor is saved with EDI configuration |

---

### Stage 5: Submit Mock SQS Event

> **User switch required:** Logout `accountmanager`, login as `developer`

| Step | Action | Expected Result |
|------|--------|-----------------|
| 5.1 | Logout the current accountmanager user | Login page appears |
| 5.2 | Log in as **`developer`** with the shared password | Login succeeds; home page loads |
| 5.3 | Navigate to **Integrations** page | Integrations page loads |
| 5.4 | Select queue suffix **"inboundemail-marginedge-com"** from the dropdown | Queue is selected |
| 5.5 | Load the mock SQS event JSON file (`fixtures/files/mockSqsEvent.json`) into the packet field | JSON content is filled |
| 5.6 | Click **Send** | Mock SQS event is submitted; EDI invoice is created in the system |

---

### Stage 6: Reconciliation

> **User switch required:** Logout `developer`, login as `analyst2`

| Step | Action | Expected Result |
|------|--------|-----------------|
| 6.1 | Logout the current developer user | Login page appears |
| 6.2 | Log in as **`analyst2`** with the shared password | Login succeeds |
| 6.3 | Navigate to Orders page (`/#/order/v2`) | Orders list loads |
| 6.4 | Search for **"IMPORTED2"** in the orders list | EDI invoice row appears |
| 6.5 | Verify the invoice status shows **"In Reconciliation"** | Status cell displays "In Reconciliation" |
| 6.6 | Navigate to **Setup** > **Priority Report** | Priority Report page loads |
| 6.7 | Click the **Start** button in the Reconciliation section | "How Many" modal appears |
| 6.8 | Click **OK** | Order opens for reconciliation |
| 6.9 | Wait for the order page to fully load | Page is ready for input |
| 6.10 | Search for line item **"Ajino"** using the search input (`ng-model="filterValue"`) | Filtered results show the Ajino line item |
| 6.11 | Click the yellow **envelope icon** (`glyphicon-envelope` with title "imported from email") | Imported item modal opens |
| 6.12 | In the imported item modal, enter **"11"** in the ratio input (`ng-model="vpu.ratioDisplay"`) | Ratio is set to 11 |
| 6.13 | Click **Save** in the imported item modal | Ratio is saved; modal closes |
| 6.14 | Scroll to the handwriting section | Handwriting dropdown is visible |
| 6.15 | Set the handwriting dropdown to **"No"** | Handwriting is set to No |
| 6.16 | Click the checkbox: **"The reconciliation for this order is complete"** | Checkbox is checked |
| 6.17 | Click **Save and Complete** | Order is saved |
| 6.18 | Click the **Verified** button in the modal | Verification is confirmed |

---

### Stage 7: Verify Status & Determine Next Review

> **Logged in as:** `analyst2`

| Step | Action | Expected Result |
|------|--------|-----------------|
| 7.1 | Navigate to Orders page | Orders list loads |
| 7.2 | Search for **"IMPORTED2"** | EDI invoice row appears |
| 7.3 | Check the invoice status | Status is either **"Final Review"** or **"AM Review"** |
| 7.4 | Store the status to determine the next workflow path | Status is stored (`final_review` or `am_review`) |

---

### Stage 8: Login for Next Review

> **User switch required:** Logout `analyst2`

| Step | Action | Expected Result |
|------|--------|-----------------|
| 8.1 | Logout the current analyst2 user | Login page appears |
| 8.2a | **If status is Final Review:** Log in as **`leadanalyst`** | Lead analyst login succeeds |
| 8.2b | **If status is AM Review:** Log in as **`accountmanager`** | Account manager login succeeds |

---

### Stage 9: Final Review (Conditional)

> **Skipped if status is not "Final Review"**
> **Logged in as:** `leadanalyst`

| Step | Action | Expected Result |
|------|--------|-----------------|
| 9.1 | Navigate to **Setup** > **Priority Report** | Priority Report page loads |
| 9.2 | Click the **Start** button in the Final Review (FR) section | "How Many" modal appears |
| 9.3 | Click **OK** | Order opens for final review |
| 9.4 | Click the checkbox: **"This order has been reviewed and should be reviewed by a client services lead"** | Checkbox is checked |
| 9.5 | Click **Save** | Order is saved |
| 9.6 | Click the **Verified** button in the modal | Verification is confirmed |

---

### Stage 10: New Vendor Item Approval (Conditional)

> **Skipped if status is not "AM Review"**
> **Logged in as:** `accountmanager`

| Step | Action | Expected Result |
|------|--------|-----------------|
| 10.1 | Click the **bell/notification icon** (NotificationsNoneIcon) | Notification dropdown opens |
| 10.2 | Click **New Vendor Items** menu item | New Vendor Items task page loads with a table of pending items |
| 10.3 | Select the **first row** checkbox | Row is selected (highlighted) |
| 10.4 | Click **Assign Product** button | Assign Product modal opens |
| 10.5 | Select **"Create new product"** radio button | Form switches to new product creation mode |
| 10.6 | Select category **"Baked Goods"** (via radio or dropdown search) | Category is set |
| 10.7 | Scroll down in the modal, set quantity to **1** | Quantity is entered |
| 10.8 | In the **Report Unit** dropdown, search and select **"Case"** | Report unit is set to Case |
| 10.9 | Scroll to the **"How many Case?"** grid, double-click the cell, and enter **1** | Case quantity is filled |
| 10.10 | Click **Save and Close** | Product is assigned; modal closes |
| 10.11 | Wait for network idle and the table row checkbox to be fully visible and interactive | Table is reloaded and ready |
| 10.12 | Click the **first row** checkbox | Row is clicked |
| 10.13 | Verify the row has the **selected** state (`.ui-grid-row-selected` is visible) | Row selection is confirmed |
| 10.14 | Click **Approve Selected** | Approval spinner runs; "Approved!" modal appears |
| 10.15 | Click **OK** in the Approved modal | Approval is confirmed |

---

### Stage 11: Invoice Status Verification

> **Logged in as:** `leadanalyst` or `accountmanager` (depending on path)

| Step | Action | Expected Result |
|------|--------|-----------------|
| 11.1 | Navigate to Orders page (`/#/order/v2`) | Orders list loads |
| 11.2 | Search for **"IMPORTED2"** | EDI invoice row appears |
| 11.3 | Verify the invoice status column shows **"Closed"** | Invoice has been fully processed and closed |

---

## Results Tracker

The automated test tracks the following stages. Each defaults to **failed** and is set to **passed** upon successful completion:

| # | Stage | Status |
|---|-------|--------|
| 1 | Assign Lead Analyst to The Analyst | passed |
| 2 | Assign Lead Analyst to Second Analyst | passed |
| 3 | Set Office for Analyst 1 | passed |
| 4 | Set Office for Analyst 2 | passed |
| 5 | Set Office for Analyst 3 | passed |
| 6 | Central Vendor EDI Config | passed |
| 7 | Local Vendor EDI Config | passed |
| 8 | Reconciliation | passed |
| 9 | Final Review | passed |
| 10 | Assign New Vendor Item Product | passed |
| 11 | Approve New Vendor Item | passed |
| 12 | Invoice Closed | passed |

---

## User Roles & Login Flow

```
accountmanager ──> Team Assignments, User Office Setup, Central Vendor EDI Config, Local Vendor EDI Config
       │
       ▼ (logout)
   developer ──────> Submit Mock SQS Event (Integrations)
       │
       ▼ (logout)
   analyst2 ───────> Reconciliation (via Priority Report), Verify Status
       │
       ▼ (logout)
 leadanalyst ──────> Final Review (if status = Final Review)
       OR
accountmanager ────> New Vendor Item Approval (if status = AM Review)
       │
       ▼
     Both ─────────> Invoice Status Verification (Closed)
```

---

## Notes

- All tests run in **serial mode** because each stage depends on the prior stage's completion.
- A persistent browser context is used to maintain session state within each login session.
- The `createResultsTracker` utility logs a summary table of all stage outcomes in the `afterAll` hook.
- Photo viewer tabs that open during Priority Report actions are automatically closed via a BasePage context listener.
- The EDI format grid uses Angular UI Grid which requires a `dblclick` event to enter cell edit mode.
- The test is idempotent for the central vendor EDI config — it checks for an existing `marginedge.com` row before adding.
- After reconciliation, the invoice status can be either **"Final Review"** or **"AM Review"**. The test dynamically determines which path to follow:
  - **Final Review path:** Login as `leadanalyst`, complete final review via Priority Report.
  - **AM Review path:** Login as `accountmanager`, assign product and approve new vendor items.
- The imported line item ratio fix flow searches for a specific line item ("Ajino"), clicks the envelope icon to open the imported item modal, and sets the ratio value before proceeding with reconciliation.
- The handwriting dropdown uses `.first()` to disambiguate between the main form select and the EDI confirm modal select.
- The "Approve New Vendor Item" step uses `selectFirstRowAndApprove()` which waits for network idle, selects the row, verifies the row is in a selected state (`.ui-grid-row-selected`), and only then clicks Approve.
