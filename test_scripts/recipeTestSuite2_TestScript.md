# Test Script: Recipe Test Suite 2

| Field              | Value                                              |
|--------------------|----------------------------------------------------|
| **Module**         | Recipes                                            |
| **Test Suite**     | Recipe Test Suite 2                                |
| **Spec File**      | `tests/recipes/recipeTestSuite2.spec.ts`           |
| **Run Command**    | `npm run test:recipe2`                             |
| **Execution Mode** | Serial                                             |
| **Tenant**         | Wasabi Tysons (primary), Wasabi Natick (cross-tenant verification) |
| **Environment**    | DEV (`https://me-63384.dev.marginedge.com`)        |

---

## Prerequisites

- Access to the DEV environment with the `accountmanager` user account
- The tenants **Wasabi Tysons** and **Wasabi Natick** must be available
- Recipe Test Suite 1 does **not** need to run first; this suite creates its own recipe type, products, and vendor items

---

## Test Data

| Entity             | Naming Convention                  | Unit     | Price |
|--------------------|------------------------------------|----------|-------|
| Recipe Type Menu   | `Menu Type <TEST_RUN_ID>`          | —        | —     |
| Product            | `Automated Product <TEST_RUN_ID>`  | Case     | $75   |
| Vendor Item        | `Automated VendorItem <TEST_RUN_ID>` | Case   | $75   |
| Recipe             | `Automated Recipe <TEST_RUN_ID>`   | Case     | —     |
| UoM Product 1      | `UoM Product1 <TEST_RUN_ID>`      | Kilogram | $10   |
| UoM Product 2      | `UoM Product2 <TEST_RUN_ID>`      | Kilogram | $20   |
| UoM Product 3      | `UoM Product3 <TEST_RUN_ID>`      | Kilogram | $30   |
| UoM Recipe         | `UoM Recipe <TEST_RUN_ID>`        | Kilogram | —     |
| UoM Sub-Recipe     | `UoM SubRecipe <TEST_RUN_ID>`     | Kilogram | —     |

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

### Stage 2: Add Product and Vendor Item

> **Logged in as:** `accountmanager` | **Tenant:** Wasabi Tysons

| Step | Action | Expected Result |
|------|--------|-----------------|
| 2.1 | Navigate to Products via left nav | Products list loads |
| 2.2 | Click **Add Product** | Add Product form opens |
| 2.3 | Enter product name `Automated Product <RUN_ID>`, category **"Cleaning Supplies"**, unit **"Case"**, price **75** | Fields are filled |
| 2.4 | Click **Save** and verify product appears in the list | Product created with price $75 |
| 2.5 | Navigate to Vendor Items via left nav | Vendor Items list loads |
| 2.6 | Click **Add Vendor Item** | Add Vendor Item form opens |
| 2.7 | Select vendor **"Arrow"** | Vendor is set |
| 2.8 | Enter vendor item name `Automated VendorItem <RUN_ID>` | Name is filled |
| 2.9 | Select product `Automated Product <RUN_ID>` | Product is linked |
| 2.10 | Click **Add Packaging Option**, fill details: **1 Case**, qty **1**, unit **Case**, price **75** | Packaging is set |
| 2.11 | Click **Save** and verify vendor item appears in the list | Vendor item created |

---

### Stage 3: Add Recipe and Verify Price

> **Logged in as:** `accountmanager` | **Tenant:** Wasabi Tysons

| Step | Action | Expected Result |
|------|--------|-----------------|
| 3.1 | Navigate to **Recipes** > **Menu Items** | Menu Items list loads |
| 3.2 | Click **Add Menu Item** | Add form opens |
| 3.3 | Fill details: Name = `Automated Recipe <RUN_ID>`, Type = `Menu Type <RUN_ID>`, Quantity = **1**, Unit = **case** | Fields are filled |
| 3.4 | Add ingredient: `Automated Product <RUN_ID>`, Quantity = **1**, Unit = **case** | Ingredient added |
| 3.5 | Click **Save** | Recipe is saved |
| 3.6 | Verify redirect to Menu Items list | Redirect confirmed |
| 3.7 | Search for `Automated Recipe <RUN_ID>` in Menu Items | Recipe row appears |
| 3.8 | Verify the cost column shows **$75.00** | Initial cost is correct |

---

### Stage 4: Invoice Processing (Upload, Review, Reconciliation)

> **Logged in as:** `accountmanager` | **Tenant:** Wasabi Tysons
> **Purpose:** Update recipe price via invoice processing with a new price of $80.

| Step | Action | Expected Result |
|------|--------|-----------------|
| 4.1 | Navigate to Orders list | Orders list loads |
| 4.2 | Clear search input, upload invoice image | Invoice is uploaded |
| 4.3 | Dismiss upload status modal | Modal closes |
| 4.4 | End preprocessing | Preprocessing completes |
| 4.5 | Navigate to Orders list | Orders list loads |
| 4.6 | Verify invoice status is **"In Processing"** | Status is correct |
| 4.7 | Open the first In Processing order | Order detail opens |
| 4.8 | Select vendor **"Arrow"**, generate and fill invoice number | Vendor and invoice number set |
| 4.9 | Fill invoice date with today | Date is set |
| 4.10 | Dismiss remittance address if present | Address modal handled |
| 4.11 | Fill verified total with **80** | Total is set |
| 4.12 | Set handwriting to **No** | Handwriting flag set |
| 4.13 | Mark initial review complete, save and complete | Initial review done |
| 4.14 | Navigate to Orders, search and open the order by invoice number | Order reopens |
| 4.15 | Wait for lock and process invoice | Invoice is locked |
| 4.16 | Select vendor **"Arrow"**, fill existing invoice number | Fields set |
| 4.17 | Fill invoice date, dismiss remittance address if present | Date set |
| 4.18 | Add existing vendor line item `Automated VendorItem <RUN_ID>` | Line item added |
| 4.19 | Set handwriting to **No** | Handwriting flag set |
| 4.20 | Mark reconciliation complete, save and complete | Reconciliation done |
| 4.21 | Click **Verified** in the modal | Verified |

---

### Stage 5: Final Review and Verify Updated Price

> **Logged in as:** `accountmanager` | **Tenant:** Wasabi Tysons

| Step | Action | Expected Result |
|------|--------|-----------------|
| 5.1 | Navigate to Orders, search for the invoice | Order row appears |
| 5.2 | Check invoice status — if **"In Processing"**, proceed; if **"Closed"**, skip final review | Status determined |
| 5.3 | If In Processing: open order, mark reviewed for close, save and complete final review | Final review done |
| 5.4 | Click **Verified** in the modal | Verified |
| 5.5 | Navigate to Products, search for `Automated Product <RUN_ID>` | Product row appears |
| 5.6 | Open product, click **Edit Product**, scroll to bottom and **Save** | Product re-saved to trigger price update |
| 5.7 | Navigate to Menu Items, search for `Automated Recipe <RUN_ID>` | Recipe row appears |
| 5.8 | Verify the cost column contains **80** (retry up to 5 times with 15s waits) | Cost updated from $75 to $80 |

---

### Stage 6: Cross-Tenant Verification (Invoice Price)

> **Logged in as:** `accountmanager`

| Step | Action | Expected Result |
|------|--------|-----------------|
| 6.1 | Switch tenant to **Wasabi Natick** | Tenant switches |
| 6.2 | Navigate to Menu Items, search for `Automated Recipe <RUN_ID>` | Recipe row appears |
| 6.3 | Verify the cost column shows **$75.00** (old price — invoice price is tenant-specific) | Old price in Natick |
| 6.4 | Switch tenant back to **Wasabi Tysons** | Tenant switches back |

---

### Stage 7: Add UoM Products (Kilogram)

> **Logged in as:** `accountmanager` | **Tenant:** Wasabi Tysons

| Step | Action | Expected Result |
|------|--------|-----------------|
| 7.1 | Navigate to Products via left nav | Products list loads |
| 7.2 | Click **Add Product** | Add Product form opens |
| 7.3 | Enter product name `UoM Product1 <RUN_ID>`, category **"Cleaning Supplies"**, unit **"Kilogram"**, price **10** | Fields are filled |
| 7.4 | Click **Save** and verify product appears in the list | Product 1 created with price $10/kg |
| 7.5 | Repeat steps 7.1–7.4 for `UoM Product2 <RUN_ID>` with price **20** | Product 2 created with price $20/kg |
| 7.6 | Repeat steps 7.1–7.4 for `UoM Product3 <RUN_ID>` with price **30** | Product 3 created with price $30/kg |

---

### Stage 8: Create UoM Recipe

> **Logged in as:** `accountmanager` | **Tenant:** Wasabi Tysons

| Step | Action | Expected Result |
|------|--------|-----------------|
| 8.1 | Navigate to **Recipes** > **Menu Items** | Menu Items list loads |
| 8.2 | Click **Add Menu Item** | Add form opens |
| 8.3 | Fill details: Name = `UoM Recipe <RUN_ID>`, Type = `Menu Type <RUN_ID>`, Quantity = **1**, Unit = **kilogram** | Fields are filled |
| 8.4 | Add ingredient: `UoM Product1 <RUN_ID>`, Quantity = **1**, Unit = **kilogram** | Ingredient 1 added |
| 8.5 | Click **Add ingredient**, add `UoM Product2 <RUN_ID>`, Quantity = **1**, Unit = **kilogram** | Ingredient 2 added |
| 8.6 | Click **Add ingredient**, add `UoM Product3 <RUN_ID>`, Quantity = **1**, Unit = **kilogram** | Ingredient 3 added |
| 8.7 | Click **Save** | Recipe is saved |
| 8.8 | Verify redirect to Menu Items list | Redirect confirmed |

---

### Stage 9: Verify UoM Recipe Price and Ingredient Total

> **Logged in as:** `accountmanager` | **Tenant:** Wasabi Tysons

| Step | Action | Expected Result |
|------|--------|-----------------|
| 9.1 | Navigate to Menu Items, search for `UoM Recipe <RUN_ID>` | Recipe row appears |
| 9.2 | Verify the cost column shows **$60.00** ($10 + $20 + $30) | Cost is correct |
| 9.3 | Click on the recipe to open detail page | Detail page opens |
| 9.4 | Scroll to the bottom of the page | Bottom section is visible |
| 9.5 | Verify the **Ingredient Total** field shows **60.00** | Ingredient total matches |

---

### Stage 10: Create UoM Sub-Recipe (Using Recipe as Ingredient)

> **Logged in as:** `accountmanager` | **Tenant:** Wasabi Tysons

| Step | Action | Expected Result |
|------|--------|-----------------|
| 10.1 | Navigate to **Recipes** > **Menu Items** | Menu Items list loads |
| 10.2 | Click **Add Menu Item** | Add form opens |
| 10.3 | Fill details: Name = `UoM SubRecipe <RUN_ID>`, Type = `Menu Type <RUN_ID>`, Quantity = **1**, Unit = **kilogram** | Fields are filled |
| 10.4 | Add ingredient: `UoM Recipe <RUN_ID>`, Quantity = **1**, Unit = **kilogram** | Recipe is added as ingredient |
| 10.5 | Click **Save** | Sub-recipe is saved |
| 10.6 | Verify redirect to Menu Items list | Redirect confirmed |

---

### Stage 11: Verify UoM Sub-Recipe Price and Ingredient Total

> **Logged in as:** `accountmanager` | **Tenant:** Wasabi Tysons

| Step | Action | Expected Result |
|------|--------|-----------------|
| 11.1 | Navigate to Menu Items, search for `UoM SubRecipe <RUN_ID>` | Sub-recipe row appears |
| 11.2 | Verify the cost column shows **$60.00** | Cost is correct |
| 11.3 | Click on the sub-recipe to open detail page | Detail page opens |
| 11.4 | Scroll to the bottom of the page | Bottom section is visible |
| 11.5 | Verify the **Ingredient Total** field shows **60.00** | Ingredient total matches |

---

### Stage 12: Cross-Tenant Verification (Natick — Before Unit Change)

> **Logged in as:** `accountmanager`

| Step | Action | Expected Result |
|------|--------|-----------------|
| 12.1 | Switch tenant to **Wasabi Natick** | Tenant switches |
| 12.2 | Navigate to Menu Items, search for `UoM Recipe <RUN_ID>` | Recipe row appears |
| 12.3 | Verify the cost column shows **$60.00** | Price is same across tenants |
| 12.4 | Click on the recipe to open detail page | Detail page opens |
| 12.5 | Scroll to the bottom and verify **Ingredient Total** is **60.00** | Ingredient total matches Tysons |
| 12.6 | Switch tenant back to **Wasabi Tysons** | Tenant switches back |

---

### Stage 13: Change UoM Product 1 Unit from Kilogram to Pound

> **Logged in as:** `accountmanager` | **Tenant:** Wasabi Tysons
> **Note:** Products in use by recipes require the "Edit Unit and Name" modal to change unit.

| Step | Action | Expected Result |
|------|--------|-----------------|
| 13.1 | Navigate to Products, search for `UoM Product1 <RUN_ID>` | Product row appears |
| 13.2 | Click on the product to open detail page | Detail page opens |
| 13.3 | Click **Edit Product** | Edit form opens |
| 13.4 | Click **Edit Unit and Name** button | Modal opens titled "How do you want to see this product on reports?" |
| 13.5 | Change the **Unit** dropdown from **Kilogram** to **Pound** | Unit is changed |
| 13.6 | Click **Save** in the modal | Modal closes |
| 13.7 | Scroll to bottom and click **Save** on the product page | Product is saved (handles "Affected Recipes" modal if it appears) |

---

### Stage 14: Verify Recipe Prices After Unit Change (Tysons)

> **Logged in as:** `accountmanager` | **Tenant:** Wasabi Tysons

| Step | Action | Expected Result |
|------|--------|-----------------|
| 14.1 | Navigate to Menu Items, search for `UoM Recipe <RUN_ID>` | Recipe row appears |
| 14.2 | Verify the cost column shows **$72.05** (changed from $60.00 due to kg→lb conversion on Product 1) | Cost updated |
| 14.3 | Navigate to Menu Items, search for `UoM SubRecipe <RUN_ID>` | Sub-recipe row appears |
| 14.4 | Verify the cost column shows **$72.05** | Sub-recipe cost also updated |

---

### Stage 15: Cross-Tenant Verification (Natick — After Unit Change)

> **Logged in as:** `accountmanager`

| Step | Action | Expected Result |
|------|--------|-----------------|
| 15.1 | Switch tenant to **Wasabi Natick** | Tenant switches |
| 15.2 | Navigate to Menu Items, search for `UoM Recipe <RUN_ID>` | Recipe row appears |
| 15.3 | Verify the cost column shows **$72.05** | Updated price reflected in Natick |
| 15.4 | Navigate to Menu Items, search for `UoM SubRecipe <RUN_ID>` | Sub-recipe row appears |
| 15.5 | Verify the cost column shows **$72.05** | Updated sub-recipe price reflected in Natick |
| 15.6 | Switch tenant back to **Wasabi Tysons** | Tenant switches back |

---

## Results Tracker

The automated test tracks the following stages. Each defaults to **failed** and is set to **passed** upon successful completion:

| # | Stage | Status |
|---|-------|--------|
| 1 | Switch To Wasabi Tysons | pending |
| 2 | Add Menu Recipe Type | pending |
| 3 | Add Product | pending |
| 4 | Add Vendor Item | pending |
| 5 | Add Menu Item | pending |
| 6 | Verify Recipe Price | pending |
| 7 | File Uploaded | pending |
| 8 | End Preprocessing | pending |
| 9 | Initial Review | pending |
| 10 | Reconciliation | pending |
| 11 | Final Review | pending |
| 12 | Edit Product | pending |
| 13 | Verify Recipe Cost | pending |
| 14 | Switch Tenant To Natick For Price Check | pending |
| 15 | Verify Old Price In Natick | pending |
| 16 | Switch Tenant Back After Price Check | pending |
| 17 | Add UoM Product 1 | pending |
| 18 | Add UoM Product 2 | pending |
| 19 | Add UoM Product 3 | pending |
| 20 | Add UoM Recipe | pending |
| 21 | Verify UoM Recipe Price List | pending |
| 22 | Verify UoM Recipe Ingredient Total | pending |
| 23 | Add UoM SubRecipe | pending |
| 24 | Verify UoM SubRecipe Price List | pending |
| 25 | Verify UoM SubRecipe Ingredient Total | pending |
| 26 | Switch To Wasabi Natick | pending |
| 27 | Verify UoM Recipe Price In Natick | pending |
| 28 | Verify UoM Recipe Ingredient Total In Natick | pending |
| 29 | Switch Back To Wasabi Tysons | pending |
| 30 | Change UoM Product 1 Unit To Pound | pending |
| 31 | Verify UoM Recipe Price After Unit Change | pending |
| 32 | Verify UoM SubRecipe Price After Unit Change | pending |
| 33 | Switch To Natick After Unit Change | pending |
| 34 | Verify UoM Recipe Price In Natick After Unit Change | pending |
| 35 | Verify UoM SubRecipe Price In Natick After Unit Change | pending |
| 36 | Switch Back To Tysons After Unit Change | pending |

---

## Workflow Overview

```
accountmanager ──> Recipe Types, Products, Vendor Items, Menu Items,
                   Invoice Processing, Tenant Management
       │
       ├──> Tenant & Recipe Type Setup (Stage 1)
       │       Switch to Wasabi Tysons
       │       Add Menu Recipe Type
       │
       ├──> Product, Vendor Item & Recipe Setup (Stages 2-3)
       │       Add Product ($75/case)
       │       Add Vendor Item (Arrow, $75/case)
       │       Add Recipe with product as ingredient
       │       ──> Verify list price = $75.00
       │
       ├──> Invoice Processing — Price Update (Stages 4-5)
       │       Upload invoice image
       │       ──> End Preprocessing
       │       ──> Initial Review (verified total = $80)
       │       ──> Reconciliation (add vendor line item)
       │       ──> Final Review (if status is In Processing)
       │       ──> Edit Product (trigger price recalculation)
       │       ──> Verify recipe cost updated to $80
       │
       ├──> Cross-Tenant Verification — Invoice Price (Stage 6)
       │       Switch to Wasabi Natick
       │       ──> Verify recipe still shows old price $75.00
       │       Switch back to Wasabi Tysons
       │
       ├──> UoM Products Setup (Stage 7)
       │       Add Product 1 ($10/kg)
       │       Add Product 2 ($20/kg)
       │       Add Product 3 ($30/kg)
       │
       ├──> UoM Recipe Creation & Verification (Stages 8-9)
       │       Create Recipe with 3 kg ingredients
       │       ──> Verify list price = $60.00
       │       ──> Verify detail page Ingredient Total = 60.00
       │
       ├──> UoM Sub-Recipe Creation & Verification (Stages 10-11)
       │       Create Sub-Recipe using UoM Recipe as ingredient
       │       ──> Verify list price = $60.00
       │       ──> Verify detail page Ingredient Total = 60.00
       │
       ├──> Cross-Tenant Verification Before Unit Change (Stage 12)
       │       Switch to Wasabi Natick
       │       ──> Verify UoM Recipe price = $60.00
       │       ──> Verify Ingredient Total = 60.00
       │       Switch back to Wasabi Tysons
       │
       ├──> UoM Unit Change (Stage 13)
       │       Edit UoM Product 1: Kilogram → Pound
       │       (via "Edit Unit and Name" modal)
       │
       ├──> Verify Updated Prices in Tysons (Stage 14)
       │       ──> UoM Recipe price = $72.05
       │       ──> UoM SubRecipe price = $72.05
       │
       └──> Cross-Tenant Verification After Unit Change (Stage 15)
               Switch to Wasabi Natick
               ──> UoM Recipe price = $72.05
               ──> UoM SubRecipe price = $72.05
               Switch back to Wasabi Tysons
```

---

## Notes

- All tests run in **serial mode** because each stage depends on prior stages.
- The entire suite runs under a single `accountmanager` session.
- The suite covers two main areas:
  1. **Invoice Processing Price Update** — creating a product/vendor item/recipe, processing an invoice to change the product price from $75 to $80, and verifying the recipe cost updates. Cross-tenant check confirms Natick still shows the old $75 price.
  2. **UoM Unit Change Price Update** — creating products with kilogram units, building recipes, changing a product's unit from kilogram to pound via the "Edit Unit and Name" modal, and verifying the recipe cost changes from $60.00 to $72.05 across both tenants.
- The invoice status check after reconciliation handles two possible states: if the invoice auto-closes, the final review step is skipped.
- The recipe cost verification after order close uses a retry loop (up to 5 attempts with 15s waits) to account for async price propagation.
- Products in use by recipes cannot have their unit edited normally; the **"Edit Unit and Name"** modal must be used instead. This modal contains a `<select name="reportUnit">` dropdown.
- The **Ingredient Total** field on the recipe detail page is accessed via `getByRole('textbox', { name: 'Ingredient Total' })`.
- The `createResultsTracker` utility logs a summary table of all 36 stage outcomes in the `afterAll` hook.
- The test generates a unique `TEST_RUN_ID` timestamp to prevent name collisions.
