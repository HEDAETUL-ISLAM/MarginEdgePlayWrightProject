# Test Script: Recipe Test Suite 1

| Field              | Value                                              |
|--------------------|----------------------------------------------------|
| **Module**         | Recipes                                            |
| **Test Suite**     | Recipe Test Suite 1                                |
| **Spec File**      | `tests/recipes/recipeTestSuite1.spec.ts`           |
| **Run Command**    | `npm run test:recipe1`                             |
| **Execution Mode** | Serial                                             |
| **Tenant**         | Wasabi Tysons                                      |
| **Environment**    | DEV (configurable via `TEST_ENV`, default: `me-63384.dev.marginedge.com`) |

---

## Prerequisites

- Access to the DEV environment with the `accountmanager` user account
- Recipe method image files available at `fixtures/files/recipeMethod/method1.jpg` through `method5.jpg`
- An unsupported image file available at `fixtures/files/recipeMethod/unsupported.avif`
- The tenants **Wasabi Tysons** and **Wasabi Natick** must be available

---

## Test Data

| Entity                   | Naming Convention                              |
|--------------------------|------------------------------------------------|
| Recipe Type Menu         | `Menu Type <TEST_RUN_ID>`                      |
| Recipe                   | `Automated Recipe <TEST_RUN_ID>`               |
| Plate Cost Product 1     | `PlateCost Product1 <TEST_RUN_ID>`             |
| Plate Cost Product 2     | `PlateCost Product2 <TEST_RUN_ID>`             |
| Plate Cost Recipe        | `PlateCost Recipe <TEST_RUN_ID>`               |
| Plate Cost Sub-Recipe    | `PlateCost SubRecipe <TEST_RUN_ID>`            |
| Duplicate Recipe Product | `DupRecipe Product <TEST_RUN_ID>`              |
| Duplicate Recipe         | `DupRecipe <TEST_RUN_ID>`                      |

> `TEST_RUN_ID` is a shared timestamp generated during global setup to ensure test isolation.

---

## Test Steps

### Stage 1: Add Menu Recipe Type

> **Logged in as:** `accountmanager` | **Tenant:** Wasabi Tysons

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1.1 | Navigate to Recipe Setup page (`/#/recipeSetup`) | Recipe Setup page loads |
| 1.2 | Click **Manage Recipe Types** | Recipe Types management page loads |
| 1.3 | Click **Add a new Recipe Type** | Add Recipe Type form opens |
| 1.4 | Enter the name `Menu Type <RUN_ID>` in the name input | Name is filled |
| 1.5 | Click the **Category** dropdown and select **"Menu Items"** | Category is set |
| 1.6 | Click **Save** | Recipe type is saved |

---

### Stage 2: Add Menu Item with Method Steps

> **Logged in as:** `accountmanager` | **Tenant:** Wasabi Tysons

| Step | Action | Expected Result |
|------|--------|-----------------|
| 2.1 | Navigate to **Recipes** > **Menu Items** | Menu Items list loads |
| 2.2 | Verify Menu Items page is loaded | Page is ready |
| 2.3 | Click **Add Menu Item** | Add Menu Item form opens |
| 2.4 | Fill details: Name = `Automated Recipe <RUN_ID>`, Type = `Menu Type <RUN_ID>`, Quantity = **1**, Unit = **case** | Fields are filled |
| 2.5 | Enter method step 1 text: "Step 1: Prepare all ingredients and mise en place" | Text is entered |
| 2.6 | Upload attachment `method1.jpg` for step 1 | Image is uploaded |
| 2.7 | Click **Add Step**, enter step 2 text and upload `method2.jpg` | Step 2 is added |
| 2.8 | Repeat for steps 3-5 with corresponding text and `method3.jpg` through `method5.jpg` | All 5 steps are added |
| 2.9 | Click **Save** | Menu item is saved |
| 2.10 | Verify redirect to Menu Items list (`/#/menuItem`) | Redirect confirmed |

---

### Stage 3: Verify Recipe Method Steps

> **Logged in as:** `accountmanager` | **Tenant:** Wasabi Tysons

| Step | Action | Expected Result |
|------|--------|-----------------|
| 3.1 | Search for `Automated Recipe <RUN_ID>` in the Menu Items list | Recipe appears |
| 3.2 | Click on the recipe to open detail page | Recipe detail page opens |
| 3.3 | Scroll to the **Method** section | Method section is visible |
| 3.4 | Verify step numbers (1-5) are displayed | Step numbers are visible |
| 3.5 | Verify each step text matches the entered text | Step texts match |
| 3.6 | Verify each step has a **Recipe Method Media** image | Images are visible |

---

### Stage 4: Verify Unsupported Image Format Modal

> **Logged in as:** `accountmanager` | **Tenant:** Wasabi Tysons

| Step | Action | Expected Result |
|------|--------|-----------------|
| 4.1 | Navigate to **Recipes** > **Menu Items** | Menu Items list loads |
| 4.2 | Verify Menu Items page is loaded | Page is ready |
| 4.3 | Click **Add Menu Item** | Add Menu Item form opens |
| 4.4 | Fill details: Name = `Automated Recipe <RUN_ID>`, Type = `Menu Type <RUN_ID>`, Quantity = **1**, Unit = **case** | Fields are filled |
| 4.5 | Scroll to the **Method** section | Method section is visible |
| 4.6 | Click the file upload button for step 1 | File chooser dialog opens |
| 4.7 | Select the unsupported file `unsupported.avif` | File is uploaded |
| 4.8 | Verify a modal appears with title **"Unsupported Image Format Detected"** | Modal is visible |
| 4.9 | Verify the modal contains the message: "The image you uploaded is not in a supported format (PNG, JPG, or JPEG). Please select an image in a supported format and try again." | Message is correct |
| 4.10 | Dismiss the modal by clicking the close button | Modal closes |

---

### Stage 5: Add Plate Cost Product 1

> **Logged in as:** `accountmanager` | **Tenant:** Wasabi Tysons

| Step | Action | Expected Result |
|------|--------|-----------------|
| 5.1 | Navigate to Products via left nav | Products list loads |
| 5.2 | Click **Add Product** | Add Product form opens |
| 5.3 | Enter product name `PlateCost Product1 <RUN_ID>` | Name is filled |
| 5.4 | Select category **"Cleaning Supplies"** | Category is set |
| 5.5 | Select unit **"Each"** | Unit is set |
| 5.6 | Set product price to **10** | Price is set |
| 5.7 | Click **Save** | Product is saved |
| 5.8 | Verify product appears in the product list | Product 1 is created with price $10 |

---

### Stage 6: Add Plate Cost Product 2

> **Logged in as:** `accountmanager` | **Tenant:** Wasabi Tysons

| Step | Action | Expected Result |
|------|--------|-----------------|
| 6.1 | Navigate to Products via left nav | Products list loads |
| 6.2 | Click **Add Product** | Add Product form opens |
| 6.3 | Enter product name `PlateCost Product2 <RUN_ID>` | Name is filled |
| 6.4 | Select category **"Cleaning Supplies"** | Category is set |
| 6.5 | Select unit **"Each"** | Unit is set |
| 6.6 | Set product price to **15** | Price is set |
| 6.7 | Click **Save** | Product is saved |
| 6.8 | Verify product appears in the product list | Product 2 is created with price $15 |

---

### Stage 7: Create Plate Cost Recipe and Verify Cost

> **Logged in as:** `accountmanager` | **Tenant:** Wasabi Tysons

| Step | Action | Expected Result |
|------|--------|-----------------|
| 7.1 | Navigate to **Recipes** > **Menu Items** | Menu Items list loads |
| 7.2 | Click **Add Menu Item** | Add form opens |
| 7.3 | Fill details: Name = `PlateCost Recipe <RUN_ID>`, Type = `Menu Type <RUN_ID>`, Quantity = **1**, Unit = **each** | Fields are filled |
| 7.4 | Add ingredient: `PlateCost Product1 <RUN_ID>`, Quantity = **1**, Unit = **each** | Ingredient 1 added |
| 7.5 | Click **Add ingredient** | New ingredient row appears |
| 7.6 | Add ingredient: `PlateCost Product2 <RUN_ID>`, Quantity = **1**, Unit = **each** | Ingredient 2 added |
| 7.7 | Set **Global Menu Price** to **100** | Menu price is set |
| 7.8 | Click **Save** | Recipe is saved |
| 7.9 | Search for `PlateCost Recipe <RUN_ID>` in the list | Recipe row appears |
| 7.10 | Verify the cost column shows **$25.00** ($10 + $15) | Cost is correct |
| 7.11 | Verify the plate cost % shows **25.0%** ($25 / $100) | Plate cost % is correct |

---

### Stage 8: Create Sub-Recipe Using Plate Cost Recipe as Ingredient

> **Logged in as:** `accountmanager` | **Tenant:** Wasabi Tysons

| Step | Action | Expected Result |
|------|--------|-----------------|
| 8.1 | Navigate to **Recipes** > **Menu Items** | Menu Items list loads |
| 8.2 | Click **Add Menu Item** | Add form opens |
| 8.3 | Fill details: Name = `PlateCost SubRecipe <RUN_ID>`, Type = `Menu Type <RUN_ID>`, Quantity = **1**, Unit = **each** | Fields are filled |
| 8.4 | Add ingredient: `PlateCost Recipe <RUN_ID>`, Quantity = **1**, Unit = **each** | Recipe is added as ingredient |
| 8.5 | Set **Global Menu Price** to **100** | Menu price is set |
| 8.6 | Click **Save** | Sub-recipe is saved |
| 8.7 | Search for `PlateCost SubRecipe <RUN_ID>` in the list | Sub-recipe row appears |
| 8.8 | Verify the cost column shows **$25.00** | Cost is correct |
| 8.9 | Verify the plate cost % shows **25.0%** | Plate cost % is correct |

---

### Stage 9: Verify Plate Cost on Detail Pages

> **Logged in as:** `accountmanager` | **Tenant:** Wasabi Tysons

| Step | Action | Expected Result |
|------|--------|-----------------|
| 9.1 | Navigate to Menu Items, search for `PlateCost Recipe <RUN_ID>` | Recipe row appears |
| 9.2 | Click on the recipe to open detail page | Detail page opens |
| 9.3 | Scroll to **Plate Cost** input field | Field is visible |
| 9.4 | Verify plate cost value is **25** | Plate cost matches |
| 9.5 | Navigate to Menu Items, search for `PlateCost SubRecipe <RUN_ID>` | Sub-recipe row appears |
| 9.6 | Click on the sub-recipe to open detail page | Detail page opens |
| 9.7 | Verify plate cost value is **25** | Plate cost matches |

---

### Stage 10: Edit Product Prices (Using "Edit Unit and Name" Modal)

> **Logged in as:** `accountmanager` | **Tenant:** Wasabi Tysons
> **Note:** Products in use by recipes require the "Edit Unit and Name" modal to change prices.

| Step | Action | Expected Result |
|------|--------|-----------------|
| 10.1 | Navigate to Products, search for `PlateCost Product1 <RUN_ID>` | Product row appears |
| 10.2 | Click on the product, then click **Edit Product** | Edit form opens |
| 10.3 | Click **Edit Unit and Name** button | Modal opens with price input |
| 10.4 | Clear the price field and enter **20** | Price is changed from $10 to $20 |
| 10.5 | Click **Save** in the modal | Modal closes |
| 10.6 | Scroll to bottom and click **Save** on the product page | Product is saved |
| 10.7 | Repeat steps 10.1-10.6 for `PlateCost Product2 <RUN_ID>`, changing price to **30** | Product 2 price changed from $15 to $30 |

---

### Stage 11: Verify Updated Plate Cost on List Page

> **Logged in as:** `accountmanager` | **Tenant:** Wasabi Tysons

| Step | Action | Expected Result |
|------|--------|-----------------|
| 11.1 | Navigate to Menu Items, search for `PlateCost Recipe <RUN_ID>` | Recipe row appears |
| 11.2 | Verify the cost column shows **$50.00** ($20 + $30) | Cost updated |
| 11.3 | Verify the plate cost % shows **50.0%** ($50 / $100) | Plate cost % updated |
| 11.4 | Search for `PlateCost SubRecipe <RUN_ID>` | Sub-recipe row appears |
| 11.5 | Verify the cost column shows **$50.00** | Cost updated |
| 11.6 | Verify the plate cost % shows **50.0%** | Plate cost % updated |

---

### Stage 12: Verify Updated Plate Cost on Detail Pages

> **Logged in as:** `accountmanager` | **Tenant:** Wasabi Tysons

| Step | Action | Expected Result |
|------|--------|-----------------|
| 12.1 | Navigate to Menu Items, search for `PlateCost Recipe <RUN_ID>` | Recipe row appears |
| 12.2 | Click on the recipe, wait 2 seconds for page to load | Detail page opens |
| 12.3 | Verify plate cost value is **50** | Plate cost updated |
| 12.4 | Navigate to Menu Items, search for `PlateCost SubRecipe <RUN_ID>` | Sub-recipe row appears |
| 12.5 | Click on the sub-recipe, wait 2 seconds for page to load | Detail page opens |
| 12.6 | Verify plate cost value is **50** | Plate cost updated |

---

### Stage 13: Add Product for Duplicate Recipe

> **Logged in as:** `accountmanager` | **Tenant:** Wasabi Tysons

| Step | Action | Expected Result |
|------|--------|-----------------|
| 13.1 | Navigate to Products via left nav | Products list loads |
| 13.2 | Click **Add Product** | Add Product form opens |
| 13.3 | Enter product name `DupRecipe Product <RUN_ID>` | Name is filled |
| 13.4 | Select category **"Cleaning Supplies"** | Category is set |
| 13.5 | Select unit **"Each"** | Unit is set |
| 13.6 | Set product price to **10** | Price is set |
| 13.7 | Click **Save** | Product is saved |
| 13.8 | Verify product appears in the product list | Product is created |

---

### Stage 14: Create Recipe for Duplication

> **Logged in as:** `accountmanager` | **Tenant:** Wasabi Tysons

| Step | Action | Expected Result |
|------|--------|-----------------|
| 14.1 | Navigate to **Recipes** > **Menu Items** | Menu Items list loads |
| 14.2 | Click **Add Menu Item** | Add form opens |
| 14.3 | Fill details: Name = `DupRecipe <RUN_ID>`, Type = `Menu Type <RUN_ID>`, Quantity = **1**, Unit = **each** | Fields are filled |
| 14.4 | Add ingredient: `DupRecipe Product <RUN_ID>`, Quantity = **1**, Unit = **each** | Ingredient added |
| 14.5 | Click **Save** | Recipe is saved |
| 14.6 | Verify redirect to Menu Items list | Recipe is created |

---

### Stage 15: Create Duplicate Recipe

> **Logged in as:** `accountmanager` | **Tenant:** Wasabi Tysons

| Step | Action | Expected Result |
|------|--------|-----------------|
| 15.1 | Navigate to Menu Items, search for `DupRecipe <RUN_ID>` | Recipe appears |
| 15.2 | Click on the recipe to open detail page | Detail page opens |
| 15.3 | Click **More Options** button (exact match) | Dropdown menu opens |
| 15.4 | Click **Create Duplicate Recipe** | Edit page opens for the duplicate recipe |
| 15.5 | Verify URL contains `/recipe/<id>/edit` | Edit page loaded |
| 15.6 | Verify the recipe name field contains `Copy1-DupRecipe <RUN_ID>` | Name has "Copy1-" prefix |
| 15.7 | Scroll to bottom and click **Save** | Duplicate recipe is saved |

---

### Stage 16: Verify Duplicate Recipe Name

> **Logged in as:** `accountmanager` | **Tenant:** Wasabi Tysons

| Step | Action | Expected Result |
|------|--------|-----------------|
| 16.1 | Wait 2 seconds for the detail page to load | Page is ready |
| 16.2 | Read the recipe name heading on the detail page | Name is retrieved |
| 16.3 | Verify the name contains `Copy1-DupRecipe <RUN_ID>` | Duplicate name is correct |

---

### Stage 17: Verify Duplicate Recipe in Wasabi Natick

> **Logged in as:** `accountmanager`

| Step | Action | Expected Result |
|------|--------|-----------------|
| 17.1 | Switch tenant to **Wasabi Natick** via tenant dropdown | Tenant switches |
| 17.2 | Navigate to **Recipes** > **Menu Items** | Menu Items list loads |
| 17.3 | Search for `Copy1-DupRecipe <RUN_ID>` | Duplicate recipe row appears |
| 17.4 | Verify the row is visible | Duplicate recipe exists in Wasabi Natick |
| 17.5 | Switch tenant back to **Wasabi Tysons** | Tenant switches back |

---

## Results Tracker

The automated test tracks the following stages. Each defaults to **failed** and is set to **passed** upon successful completion:

| # | Stage | Status |
|---|-------|--------|
| 1 | Add Menu Recipe Type | pending |
| 2 | Add Menu Item With Methods | pending |
| 3 | Verify Recipe Methods | pending |
| 4 | Unsupported Image Format Modal | pending |
| 5 | Add Plate Cost Product 1 | pending |
| 6 | Add Plate Cost Product 2 | pending |
| 7 | Add Plate Cost Recipe | pending |
| 8 | Add Plate Cost Recipe As Ingredient | pending |
| 9 | Verify Plate Cost Detail Page Recipe | pending |
| 10 | Verify Plate Cost Detail Page SubRecipe | pending |
| 11 | Edit Plate Cost Product 1 Price | pending |
| 12 | Edit Plate Cost Product 2 Price | pending |
| 13 | Verify Updated Plate Cost Recipe | pending |
| 14 | Verify Updated Plate Cost SubRecipe | pending |
| 15 | Verify Updated Plate Cost Detail Page Recipe | pending |
| 16 | Verify Updated Plate Cost Detail Page SubRecipe | pending |
| 17 | Add Duplicate Recipe Product | pending |
| 18 | Create Duplicate Recipe Source | pending |
| 19 | Create Duplicate Recipe | pending |
| 20 | Verify Duplicate Recipe Name | pending |
| 21 | Switch Tenant To Natick For Duplicate | pending |
| 22 | Verify Duplicate Recipe In Natick | pending |
| 23 | Switch Tenant Back After Duplicate | pending |

---

## Workflow Overview

```
accountmanager ──> Recipe Types, Products, Menu Items, Tenant Management
       │
       ├──> Recipe Type Setup (Stage 1)
       │       Add Menu Recipe Type
       │
       ├──> Recipe Method Steps (Stages 2-3)
       │       Add Menu Item with 5 method steps + attachments
       │       ──> Verify method steps and images on view page
       │
       ├──> Unsupported Image Format Check (Stage 4)
       │       Upload unsupported .avif file to method step
       │       ──> Verify "Unsupported Image Format Detected" modal
       │       ──> Dismiss modal
       │
       ├──> Plate Cost Tests (Stages 5-12)
       │       Add Product 1 ($10) ──> Add Product 2 ($15)
       │       ──> Create Recipe (cost $25, plate cost 25%)
       │       ──> Create Sub-Recipe using recipe as ingredient
       │       ──> Verify plate cost on detail pages
       │       ──> Edit Product 1 ($10 → $20) ──> Edit Product 2 ($15 → $30)
       │       ──> Verify updated cost ($50, plate cost 50%)
       │       ──> Verify updated plate cost on detail pages
       │
       └──> Duplicate Recipe Tests (Stages 13-17)
               Add Product ($10) ──> Create Recipe
               ──> More Options ──> Create Duplicate Recipe
               ──> Verify "Copy1-" prefix on detail page
               ──> Switch to Wasabi Natick
               ──> Verify duplicate exists in Natick
               ──> Switch back to Wasabi Tysons
```

---

## Notes

- All tests run in **serial mode** because each stage depends on prior stages.
- The entire suite runs under a single `accountmanager` session.
- Products in use by recipes cannot have their price edited normally; the **"Edit Unit and Name"** modal must be used instead.
- The `createResultsTracker` utility logs a summary table of all 23 stage outcomes in the `afterAll` hook.
- The test generates a unique `TEST_RUN_ID` timestamp to prevent name collisions.
- A 2-second wait is added after opening menu item detail pages to allow plate cost values to load.
