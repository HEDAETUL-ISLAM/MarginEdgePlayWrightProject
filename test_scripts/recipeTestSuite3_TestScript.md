# Test Script: Recipe Test Suite 3

| Field              | Value                                              |
|--------------------|----------------------------------------------------|
| **Module**         | Recipes                                            |
| **Test Suite**     | Recipe Test Suite 3                                |
| **Spec File**      | `tests/recipes/recipeTestSuite3.spec.ts`           |
| **Run Command**    | `npm run test:recipe3`                             |
| **Execution Mode** | Serial                                             |
| **Tenant**         | Wasabi Tysons (primary), Wasabi Natick & new tenant (cross-tenant verification) |
| **Environment**    | DEV (configurable via `TEST_ENV`, default: `me-63384.dev.marginedge.com`) |

---

## Prerequisites

- Access to the DEV environment with the `accountmanager` user account
- The tenants **Wasabi Tysons** and **Wasabi Natick** must be available
- The concept **Wasabi** and company **Mid-States Management Group** must exist (for new tenant creation)
- Recipe Test Suite 1 and 2 do **not** need to run first; this suite creates its own recipe type, products, and recipes

---

## Test Data

| Entity           | Naming Convention                         | Unit | Price |
|------------------|-------------------------------------------|------|-------|
| Recipe Type Menu | `Menu Type <TEST_RUN_ID>`                 | —    | —     |
| Product 1        | `S3 Product <TEST_RUN_ID>`                | Case | $75   |
| Product 2        | `Automated Product2 <TEST_RUN_ID>`        | Case | $75   |
| Product 3        | `Automated Product3 <TEST_RUN_ID>`        | Case | $75   |
| Recipe 1         | `S3 Recipe <TEST_RUN_ID>`                 | Case | —     |
| Recipe 2         | `Automated Recipe2 <TEST_RUN_ID>`         | Case | —     |
| Recipe 3         | `Automated Recipe3 <TEST_RUN_ID>`         | Case | —     |
| Count Sheet 1    | `Automated Countsheet <TEST_RUN_ID>`      | —    | —     |
| Count Sheet 2    | `Automated Countsheet2 <TEST_RUN_ID>`     | —    | —     |
| Count Sheet 3    | `Automated Countsheet3 <TEST_RUN_ID>`     | —    | —     |
| New Tenant       | `Automated Tenant <TEST_RUN_ID>`          | —    | —     |

> `TEST_RUN_ID` is a shared timestamp generated during global setup to ensure test isolation.

---

## Test Steps

### Stage 1: Switch Tenant and Add Recipe Type

> **Logged in as:** `accountmanager` | **Tenant:** Wasabi Tysons

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1.1 | Navigate to Menu Items and switch tenant to **Wasabi Tysons** | Tenant is set to Wasabi Tysons |
| 1.2 | Navigate to Recipe Setup page (`/#/recipeSetup`) | Recipe Setup page loads |
| 1.3 | Click **Manage Recipe Types** | Recipe Types management page loads |
| 1.4 | Add a new Recipe Type with name `Menu Type <RUN_ID>` and category **"Menu Items"** | Recipe type is saved |

---

### Stage 2: Add Product and Recipe

> **Logged in as:** `accountmanager` | **Tenant:** Wasabi Tysons

| Step | Action | Expected Result |
|------|--------|-----------------|
| 2.1 | Navigate to Products via left nav | Products list loads |
| 2.2 | Click **Add Product** | Add Product form opens |
| 2.3 | Enter product name `S3 Product <RUN_ID>`, category **"Cleaning Supplies"**, unit **"Case"**, price **75** | Fields are filled |
| 2.4 | Click **Save** and verify product appears in the list | Product created with price $75 |
| 2.5 | Navigate to **Recipes** > **Menu Items** | Menu Items list loads |
| 2.6 | Click **Add Menu Item** | Add form opens |
| 2.7 | Fill details: Name = `S3 Recipe <RUN_ID>`, Type = `Menu Type <RUN_ID>`, Quantity = **1**, Unit = **case** | Fields are filled |
| 2.8 | Add ingredient: `S3 Product <RUN_ID>`, Quantity = **1**, Unit = **case** | Ingredient added |
| 2.9 | Click **Save** | Recipe is saved |
| 2.10 | Verify redirect to Menu Items list | Redirect confirmed |

---

### Stage 3: Create Count Sheet and Close Inventory

> **Logged in as:** `accountmanager` | **Tenant:** Wasabi Tysons

| Step | Action | Expected Result |
|------|--------|-----------------|
| 3.1 | Navigate to Inventory Setup page (`/#/inventorySetup`) | Inventory Setup page loads |
| 3.2 | Click **Add Count Sheet** | Count sheet creation form opens |
| 3.3 | Enter the count sheet name `Automated Countsheet <RUN_ID>` | Name is filled |
| 3.4 | Click **Add Recipe**, search and select `S3 Recipe <RUN_ID>` | Recipe is selected |
| 3.5 | Click **Add Recipe** button in the modal | Recipe is added to the count sheet |
| 3.6 | Scroll to the bottom and click **Save** | Count sheet is saved |
| 3.7 | Verify the count sheet appears in the **Enter a Count** dropdown | Count sheet was created |
| 3.8 | Navigate to Inventory Counts page (`/#/inventory`) | Inventory Counts page loads |
| 3.9 | Click the **My Store** tab | My Store inventory view loads |
| 3.10 | Select count sheet `Automated Countsheet <RUN_ID>` from the dropdown | Count entry form opens |
| 3.11 | Set the inventory date to today | Date is set |
| 3.12 | Enter **5** in the count input for `S3 Recipe <RUN_ID>` | Count is entered |
| 3.13 | Click **Save Options** > **Save and Close** | Inventory is saved and closed |
| 3.14 | Click **OK** in the confirmation dialog | Close is confirmed |
| 3.15 | Navigate back and verify the count sheet appears as closed | Inventory is closed |

---

### Stage 4: Update Count Sheet — Remove Recipe

> **Logged in as:** `accountmanager` | **Tenant:** Wasabi Tysons

| Step | Action | Expected Result |
|------|--------|-----------------|
| 4.1 | Navigate to Inventory Setup page | Inventory Setup loads |
| 4.2 | Click on the count sheet `Automated Countsheet <RUN_ID>` | Count sheet detail opens |
| 4.3 | Click the **delete** button for the recipe | Confirmation may appear |
| 4.4 | If confirmation appears, click **OK** | Deletion is confirmed |
| 4.5 | Scroll to the bottom and click **Save** | Count sheet is saved |
| 4.6 | Verify the recipe is no longer listed in the count sheet | Recipe was removed |

---

### Stage 5: Reopen Closed Inventory

> **Logged in as:** `accountmanager` | **Tenant:** Wasabi Tysons

| Step | Action | Expected Result |
|------|--------|-----------------|
| 5.1 | Navigate to Inventory Counts page | Inventory Counts loads |
| 5.2 | Click the **My Store** tab | My Store view loads |
| 5.3 | Click on the closed inventory for `Automated Countsheet <RUN_ID>` | Inventory detail opens |
| 5.4 | Click **Reopen** | Confirmation dialog appears |
| 5.5 | Click **OK/Confirm** | Inventory is reopened |
| 5.6 | Verify the count sheet shows status **"Saved"** | Inventory was reopened |

---

### Stage 6: Deactivate Recipe (Blocked by Active Inventory)

> **Logged in as:** `accountmanager` | **Tenant:** Wasabi Tysons

| Step | Action | Expected Result |
|------|--------|-----------------|
| 6.1 | Navigate to **Recipes** > **Menu Items** | Menu Items list loads |
| 6.2 | Search for `S3 Recipe <RUN_ID>` and open it | Recipe detail page opens |
| 6.3 | Click the **activation toggle** | Toggle is clicked |
| 6.4 | If a **"Recipe In Use"** modal appears, dismiss it | Deactivation may be blocked because of active inventory |

---

### Stage 7: Delete Saved Inventory

> **Logged in as:** `accountmanager` | **Tenant:** Wasabi Tysons

| Step | Action | Expected Result |
|------|--------|-----------------|
| 7.1 | Navigate to Inventory Counts page | Inventory Counts loads |
| 7.2 | Click the **My Store** tab | My Store view loads |
| 7.3 | Click on the saved inventory for `Automated Countsheet <RUN_ID>` | Inventory detail opens |
| 7.4 | Click **Edit** | Edit mode is enabled |
| 7.5 | Click the red **Delete** button | Delete confirmation appears |
| 7.6 | Click **Delete** in the confirmation modal | Inventory is deleted |
| 7.7 | Verify the count sheet row is no longer visible | Inventory was deleted |

---

### Stage 8: Deactivate Recipe After Inventory Delete (Succeeds)

> **Logged in as:** `accountmanager` | **Tenant:** Wasabi Tysons

| Step | Action | Expected Result |
|------|--------|-----------------|
| 8.1 | Navigate to **Recipes** > **Menu Items** | Menu Items list loads |
| 8.2 | Search for `S3 Recipe <RUN_ID>` and open it | Recipe detail page opens |
| 8.3 | Click the **activation toggle** | Recipe toggles off |
| 8.4 | Verify the toggle returns **"deactivated"** (no "Recipe In Use" modal) | Recipe is no longer referenced by any inventory |
| 8.5 | Verify the **"Recipe Is Disabled"** banner is visible | Recipe is confirmed disabled |

---

### Stage 9: Same Company Tenant Check — Setup

> **Logged in as:** `accountmanager` | **Tenant:** Wasabi Tysons

| Step | Action | Expected Result |
|------|--------|-----------------|
| 9.1 | Navigate to Products, add product `Automated Product2 <RUN_ID>` (category: Cleaning Supplies, unit: Case, price: $75) | Product 2 created |
| 9.2 | Navigate to Menu Items, add recipe `Automated Recipe2 <RUN_ID>` with `Automated Product2 <RUN_ID>` as ingredient (1 case) | Recipe 2 created |
| 9.3 | Navigate to Inventory Setup, create count sheet `Automated Countsheet2 <RUN_ID>` with recipe `Automated Recipe2 <RUN_ID>` | Count Sheet 2 created |
| 9.4 | Navigate to Inventory Counts > My Store, select `Automated Countsheet2 <RUN_ID>` | Count entry form opens |
| 9.5 | Set date to today, enter **5** for `Automated Recipe2 <RUN_ID>` | Count is entered |
| 9.6 | Click **Save and Exit** | Inventory is saved (not closed) |
| 9.7 | Verify inventory is created | Inventory row visible |

---

### Stage 10: Same Company Tenant Check — Deactivation Blocked

> **Logged in as:** `accountmanager`

| Step | Action | Expected Result |
|------|--------|-----------------|
| 10.1 | Switch tenant to **Wasabi Natick** | Tenant switches |
| 10.2 | Navigate to **Recipes** > **Menu Items** | Menu Items list loads |
| 10.3 | Search for `Automated Recipe2 <RUN_ID>` and open it | Recipe detail page opens |
| 10.4 | Click the **activation toggle** | **"Recipe In Use"** modal appears |
| 10.5 | Verify the toggle returns **"in_use"** | Recipe cannot be deactivated (used in active inventory at Wasabi Tysons, same company) |
| 10.6 | Dismiss the modal | Modal closes |
| 10.7 | Switch tenant back to **Wasabi Tysons** | Tenant switches back |

---

### Stage 11: Cross-Company Tenant Check — Create New Tenant

> **Logged in as:** `accountmanager` | **Tenant:** Wasabi Tysons

| Step | Action | Expected Result |
|------|--------|-----------------|
| 11.1 | Navigate to **Central** > **Restaurant Units** | Restaurant Units list loads |
| 11.2 | Click **Bulk Add Restaurant** | Bulk add form opens |
| 11.3 | Click **"Can't find your company?"** link | Advanced form loads |
| 11.4 | Select concept **"Wasabi"** | Concept is set |
| 11.5 | Select company **"Mid-States Management Group"** | Company is set (different company, same concept) |
| 11.6 | Check **Cross Unit Reporting** checkbox | Enabled |
| 11.7 | Enter name `Automated Tenant <RUN_ID>` | Name is filled |
| 11.8 | Select state **"Alabama"**, enter zip **12345** | Location set |
| 11.9 | Select POS **"-- None --"**, Accounting **"-- None --"** | Systems set |
| 11.10 | Enter subscription **12** | Subscription set |
| 11.11 | Scroll to bottom and click **Save**, confirm in modal | Tenant is created |

---

### Stage 12: Cross-Company Tenant Check — Setup

> **Logged in as:** `accountmanager` | **Tenant:** Wasabi Tysons

| Step | Action | Expected Result |
|------|--------|-----------------|
| 12.1 | Navigate to Products, add product `Automated Product3 <RUN_ID>` (category: Cleaning Supplies, unit: Case, price: $75) | Product 3 created |
| 12.2 | Navigate to Menu Items, add recipe `Automated Recipe3 <RUN_ID>` with `Automated Product3 <RUN_ID>` as ingredient (1 case) | Recipe 3 created |
| 12.3 | Navigate to Inventory Setup, create count sheet `Automated Countsheet3 <RUN_ID>` with recipe `Automated Recipe3 <RUN_ID>` | Count Sheet 3 created |
| 12.4 | Navigate to Inventory Counts > My Store, select `Automated Countsheet3 <RUN_ID>` | Count entry form opens |
| 12.5 | Set date to today, enter **5** for `Automated Recipe3 <RUN_ID>` | Count is entered |
| 12.6 | Click **Save and Exit** | Inventory is saved (not closed) |
| 12.7 | Verify inventory is created | Inventory row visible |

---

### Stage 13: Cross-Company Tenant Check — Deactivation Blocked

> **Logged in as:** `accountmanager`

| Step | Action | Expected Result |
|------|--------|-----------------|
| 13.1 | Switch tenant to `Automated Tenant <RUN_ID>` | Tenant switches to the new tenant (different company, same concept) |
| 13.2 | Navigate to **Recipes** > **Menu Items** | Menu Items list loads |
| 13.3 | Search for `Automated Recipe3 <RUN_ID>` and open it | Recipe detail page opens |
| 13.4 | Click the **activation toggle** | **"Recipe In Use"** modal appears |
| 13.5 | Verify the toggle returns **"in_use"** | Recipe cannot be deactivated (used in active inventory at Wasabi Tysons, cross-company) |
| 13.6 | Dismiss the modal | Modal closes |
| 13.7 | Switch tenant back to **Wasabi Tysons** | Tenant switches back |

---

## Results Tracker

The automated test tracks the following stages. Each defaults to **failed** and is set to **passed** upon successful completion:

| # | Stage | Status |
|---|-------|--------|
| 1 | Switch To Wasabi Tysons | pending |
| 2 | Add Menu Recipe Type | pending |
| 3 | Add Product | pending |
| 4 | Add Menu Item | pending |
| 5 | Create Count Sheet | pending |
| 6 | Close Inventory | pending |
| 7 | Update Inventory | pending |
| 8 | Reopen Inventory | pending |
| 9 | Deactivate Recipe | pending |
| 10 | Delete Inventory | pending |
| 11 | Deactivate Recipe After Delete Inventory | pending |
| 12 | Add Product 2 | pending |
| 13 | Add Menu Item 2 | pending |
| 14 | Create Count Sheet 2 | pending |
| 15 | Close Inventory 2 | pending |
| 16 | Switch Tenant | pending |
| 17 | Deactivate Recipe In Use | pending |
| 18 | Switch Tenant Back | pending |
| 19 | Add Tenant | pending |
| 20 | Add Product 3 | pending |
| 21 | Add Menu Item 3 | pending |
| 22 | Create Count Sheet 3 | pending |
| 23 | Save and Exit Inventory 3 | pending |
| 24 | Switch Tenant To New | pending |
| 25 | Deactivate Recipe In Use 2 | pending |
| 26 | Switch Tenant Back 2 | pending |

---

## Workflow Overview

```
accountmanager ──> Recipe Types, Products, Menu Items, Inventory Management,
                   Tenant Management
       │
       ├──> Prerequisites (Stages 1-2)
       │       Switch to Wasabi Tysons
       │       Add Menu Recipe Type
       │       Add Product 1 ($75/case) ──> Add Recipe 1
       │
       ├──> Inventory Lifecycle & Recipe Deactivation (Stages 3-8)
       │       Create Count Sheet 1 ──> Close Inventory (count=5)
       │       ──> Update Count Sheet (remove recipe)
       │       ──> Reopen Inventory
       │       ──> Deactivate Recipe (blocked — active inventory)
       │       ──> Delete Inventory
       │       ──> Deactivate Recipe (succeeds — no active inventory)
       │       ──> Verify "Recipe Is Disabled" banner
       │
       ├──> Same Company Concept Check (Stages 9-10)
       │       Add Product 2 ──> Add Recipe 2
       │       ──> Create Count Sheet 2 ──> Save & Exit Inventory (count=5)
       │       ──> Switch to Wasabi Natick (same company)
       │       ──> Try Deactivate Recipe 2 ──> BLOCKED (in_use)
       │       ──> Switch Back to Wasabi Tysons
       │
       └──> Cross-Company Concept Check (Stages 11-13)
               Create New Tenant (Wasabi concept, Mid-States company)
               ──> Add Product 3 ──> Add Recipe 3
               ──> Create Count Sheet 3 ──> Save & Exit Inventory (count=5)
               ──> Switch to New Tenant (different company, same concept)
               ──> Try Deactivate Recipe 3 ──> BLOCKED (in_use)
               ──> Switch Back to Wasabi Tysons
```

---

## Notes

- All tests run in **serial mode** because each stage depends on prior stages.
- The entire suite runs under a single `accountmanager` session.
- This suite focuses on **recipe activation/deactivation protection** across three scenarios:
  1. **Same tenant** — a recipe used in an active inventory at the same tenant cannot be deactivated until the inventory is deleted
  2. **Same company, different tenant** — a recipe used in an active inventory at Wasabi Tysons cannot be deactivated from Wasabi Natick (same company)
  3. **Different company, same concept** — a recipe used in an active inventory at Wasabi Tysons cannot be deactivated from a tenant under a different company (Mid-States Management Group) but the same concept (Wasabi)
- The `toggleRecipeOff()` method returns `"deactivated"` on success or `"in_use"` when the "Recipe In Use" modal appears.
- Count Sheet 1 goes through the full lifecycle: create → close → update (remove recipe) → reopen → deactivate recipe attempt → delete inventory → deactivate recipe (success).
- Count Sheets 2 and 3 use **Save and Exit** (not Save and Close) to keep the inventory in a "Saved" state, which still blocks recipe deactivation.
- The `createResultsTracker` utility logs a summary table of all 26 stage outcomes in the `afterAll` hook.
- The test generates a unique `TEST_RUN_ID` timestamp to prevent name collisions.
