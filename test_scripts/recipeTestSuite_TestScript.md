# Test Script: Recipe Test Suite

| Field              | Value                                              |
|--------------------|----------------------------------------------------|
| **Module**         | Recipes                                            |
| **Test Suite**     | Recipe Test Suite                                  |
| **Spec File**      | `tests/recipes/recipeTestSuite.spec.ts`            |
| **Execution Mode** | Serial                                             |
| **Default Tenant** | Wasabi Tysons                                      |
| **Environment**    | DEV (`https://me-63384.dev.marginedge.com`)        |

---

## Prerequisites

- Access to the DEV environment with the `accountmanager` user account
- A test invoice image file available at the configured path
- The vendor **Arrow** must exist in the system
- The tenants **Wasabi Tysons** and **Wasabi Natick** must be available
- The concept **Wasabi** and company **Mid-States Management Group** must exist (for tenant creation)

---

## Test Data

| Entity           | Naming Convention                         |
|------------------|-------------------------------------------|
| Product 1        | `Automated Product <TEST_RUN_ID>`         |
| Product 2        | `Automated Product2 <TEST_RUN_ID>`        |
| Product 3        | `Automated Product3 <TEST_RUN_ID>`        |
| Vendor Item      | `Automated Item <TEST_RUN_ID>`            |
| Recipe 1         | `Automated Recipe <TEST_RUN_ID>`          |
| Recipe 2         | `Automated Recipe2 <TEST_RUN_ID>`         |
| Recipe 3         | `Automated Recipe3 <TEST_RUN_ID>`         |
| Count Sheet 1    | `Automated Countsheet <TEST_RUN_ID>`      |
| Count Sheet 2    | `Automated Countsheet2 <TEST_RUN_ID>`     |
| Count Sheet 3    | `Automated Countsheet3 <TEST_RUN_ID>`     |
| Tenant           | `Automated Tenant <TEST_RUN_ID>`          |
| Invoice Number   | Random 6-digit number (auto-generated)    |

> `TEST_RUN_ID` is a shared timestamp generated during global setup to ensure test isolation.

---

## Test Steps

### Stage 1: Add Product

> **Logged in as:** `accountmanager` | **Tenant:** Wasabi Tysons

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1.1 | Navigate to base URL | Home page loads |
| 1.2 | Click **Products** in the left navigation | Products submenu expands |
| 1.3 | Click **View All Products** | Products list page loads |
| 1.4 | Verify the URL contains `/product` and the search input is visible | Products page is confirmed loaded |
| 1.5 | Click **Add Product** | Add Product form opens |
| 1.6 | Click the product name selector, type `Automated Product <RUN_ID>`, and select the matching option | Product name is entered |
| 1.7 | Click the **Category** autocomplete, type **"Cleaning Supplies"**, and select the option | Category is set |
| 1.8 | In the **Report Unit** dropdown, select **"Case"** | Unit is set |
| 1.9 | Click **Save** | Product is saved |
| 1.10 | Navigate back to Products list, click **All stores** tab, and search for the created product | Product appears in the list |

---

### Stage 2: Add Vendor Item

> **Logged in as:** `accountmanager` | **Tenant:** Wasabi Tysons

| Step | Action | Expected Result |
|------|--------|-----------------|
| 2.1 | Navigate to base URL | Home page loads |
| 2.2 | Click **Vendors** in the left navigation | Vendors submenu expands |
| 2.3 | Click **Vendor Items** | Vendor Items list page loads |
| 2.4 | Verify the URL contains `/vendorProduct` | Page is confirmed loaded |
| 2.5 | Click **Add a new Vendor Item** | Vendor Item creation form opens |
| 2.6 | In the vendor selector, search and select **"Arrow"** | Vendor is set |
| 2.7 | Enter the vendor item name `Automated Item <RUN_ID>` | Name is filled |
| 2.8 | In the product selector, search and select the product created in Stage 1 | Product is linked |
| 2.9 | Click **Add Packaging Option** | A new packaging row appears |
| 2.10 | Fill packaging: Packaging = `1 Case`, Quantity = `1`, Unit = `Case`, Price = `80` | Packaging row is populated |
| 2.11 | Click **Save** | Vendor item is saved |
| 2.12 | Navigate back to Vendor Items list and search for the created item | Vendor item appears in the list |

---

### Stage 3: Add Menu Item (Recipe 1)

> **Logged in as:** `accountmanager` | **Tenant:** Wasabi Tysons

| Step | Action | Expected Result |
|------|--------|-----------------|
| 3.1 | Navigate to base URL | Home page loads |
| 3.2 | Click **Recipes** in the left navigation | Recipes submenu expands |
| 3.3 | Click **Menu Items** | Menu Items list page loads |
| 3.4 | Verify the URL contains `menuItem` and the **Menu Items** heading is visible | Page is confirmed loaded |
| 3.5 | Click **Add Menu Item** | Add Menu Item form opens |
| 3.6 | Enter the name `Automated Recipe <RUN_ID>` in the **Name** field | Name is filled |
| 3.7 | Click the **Recipe Type** dropdown, type **"test"**, and select the matching option | Recipe type is set |
| 3.8 | Enter **1** in the **Quantity** field | Quantity is set |
| 3.9 | Click the **Unit** dropdown, type **"case"**, and select the matching option | Unit is set |
| 3.10 | Click **Save** | Menu item is saved |
| 3.11 | Verify the page redirects to the Menu Items list (`/#/menuItem`) with title "Menu Items" | Redirect is confirmed |

---

### Stage 4: Edit Menu Item - Add Ingredient

> **Logged in as:** `accountmanager` | **Tenant:** Wasabi Tysons

| Step | Action | Expected Result |
|------|--------|-----------------|
| 4.1 | Verify Menu Items page is loaded | Page is ready |
| 4.2 | Click on the menu item cell matching `Automated Recipe <RUN_ID>` | Recipe detail page opens (URL contains `/recipe/<id>`) |
| 4.3 | Click **Edit Recipe** | Edit recipe form opens (URL contains `/recipe/<id>/edit`) |
| 4.4 | In the ingredient row, click the **"Type to see options"** input and type the product name from Stage 1 | Matching option appears |
| 4.5 | Select the product from the dropdown | Product is added as ingredient |
| 4.6 | Enter **1** in the ingredient **Quantity** field | Quantity is set |
| 4.7 | Click the **Unit** field, type **"case"**, and select the matching option | Unit is set |
| 4.8 | If a **"how many"** conversion modal appears: enter **1**, select a unit from the combobox, and click **Save** | Conversion is handled |
| 4.9 | Click **Save** | Recipe is saved |
| 4.10 | Verify the page shows the Recipe detail view (URL contains `/recipe/<id>?category=MENU`, title is "Recipe") | Recipe detail page is confirmed |

---

### Stage 5: Upload Invoice

> **Logged in as:** `accountmanager` | **Tenant:** Wasabi Tysons

| Step | Action | Expected Result |
|------|--------|-----------------|
| 5.1 | Navigate to Orders page (`/#/order/v2`) | Orders list loads |
| 5.2 | Clear the search input | Search field is cleared |
| 5.3 | Click **Add Invoice** dropdown, then click **Upload Invoice** | File chooser dialog opens |
| 5.4 | Select the test invoice image file | File uploads; Upload Status modal appears |
| 5.5 | Dismiss the Upload Status modal by clicking **Close/Done/OK** | Modal closes |

---

### Stage 6: End Preprocessing

> **Logged in as:** `accountmanager` | **Tenant:** Wasabi Tysons

| Step | Action | Expected Result |
|------|--------|-----------------|
| 6.1 | Scroll to the bottom of the page | Page scrolls down |
| 6.2 | Click **End Preprocessing** | Confirmation dialog appears |
| 6.3 | Click **OK/Confirm** | Preprocessing ends |

---

### Stage 7: Verify Invoice Status

> **Logged in as:** `accountmanager` | **Tenant:** Wasabi Tysons

| Step | Action | Expected Result |
|------|--------|-----------------|
| 7.1 | Navigate to Orders page (`/#/order/v2`) | Orders list reloads |
| 7.2 | Verify a status cell displays **"In Processing"** | Invoice is queued for processing |

---

### Stage 8: Complete Initial Review

> **Logged in as:** `accountmanager` | **Tenant:** Wasabi Tysons

| Step | Action | Expected Result |
|------|--------|-----------------|
| 8.1 | Navigate to Orders page | Orders list loads |
| 8.2 | Click the first row with status **"In Processing"** | Order detail page opens |
| 8.3 | In the vendor selector, search and select **"Arrow"** | Vendor is set |
| 8.4 | Generate a random 6-digit invoice number and enter it in the invoice number field (3rd textbox in the form) | Invoice number is filled and stored |
| 8.5 | Click the invoice date field, then click **Today** (or enter today's date) | Date is set |
| 8.6 | If **Vendor Remittance Address** section appears: click "No address is provided on the invoice." and "No Phone number is provided on the invoice." | Remittance section is dismissed |
| 8.7 | Enter **80** in the verified total (spinbutton) field | Total is set |
| 8.8 | In the handwriting dropdown, select **"No"** | Handwriting is set |
| 8.9 | Click the checkbox: **"The initial review for this order is complete"** | Checkbox is checked |
| 8.10 | Click **Save and Complete** (or **Save**) | Order is saved |
| 8.11 | If a **Verified** button appears, click it; if an **OK/Confirm** dialog appears, click it | All post-save modals are handled |

---

### Stage 9: Complete Reconciliation

> **Logged in as:** `accountmanager` | **Tenant:** Wasabi Tysons

| Step | Action | Expected Result |
|------|--------|-----------------|
| 9.1 | Navigate to Orders page | Orders list loads |
| 9.2 | Search for the invoice number (from Stage 8) and click the matching row | Order detail page opens |
| 9.3 | If the order shows **"This invoice is currently locked for automation processes"**: click **Process Invoice** > **OK/Confirm** | Order is unlocked |
| 9.4 | Verify the **"Reconcile Order"** heading is visible and the vendor dropdown is interactable | Reconciliation form is loaded |
| 9.5 | In the vendor selector, search and select **"Arrow"** | Vendor is set |
| 9.6 | Enter the same invoice number from Stage 8 | Invoice number matches |
| 9.7 | Set the invoice date to today | Date is filled |
| 9.8 | Dismiss remittance address section if present | Section is handled |
| 9.9 | Click **Add Line Item** | Add Line Item modal opens |
| 9.10 | Ensure **"Existing Vendor Item"** radio is selected | Radio is active |
| 9.11 | Search for the vendor item name (from Stage 2) and select it | Item is selected |
| 9.12 | Enter quantity = `1`, unit price = `80` | Line item values are filled |
| 9.13 | Click **OK**, select a packaging option if prompted, then **Save** | Line item is added |
| 9.14 | Set the handwriting dropdown to **"No"** | Handwriting is set |
| 9.15 | Click the checkbox: **"The reconciliation for this order is complete"** | Checkbox is checked |
| 9.16 | Click **Save and Complete** | Order is saved |
| 9.17 | Click the **Verified** button in the modal | Verification is confirmed; navigates back to orders list |

---

### Stage 10: Complete Final Review

> **Logged in as:** `accountmanager` | **Tenant:** Wasabi Tysons

| Step | Action | Expected Result |
|------|--------|-----------------|
| 10.1 | Navigate to Orders page | Orders list loads |
| 10.2 | Search for the invoice number and click the matching row | Order detail page opens |
| 10.3 | Click the checkbox: **"This order has been reviewed and should be closed"** | Checkbox is checked |
| 10.4 | Click **Save** | Order is saved |
| 10.5 | Click the **Verified** button in the modal | Verification is confirmed; navigates back to orders list |

---

### Stage 11: Edit Product

> **Logged in as:** `accountmanager` | **Tenant:** Wasabi Tysons

| Step | Action | Expected Result |
|------|--------|-----------------|
| 11.1 | Navigate to Products via left nav | Products list loads |
| 11.2 | Verify the Products page is loaded | Page is ready |
| 11.3 | Search for the product name (from Stage 1) | Product row appears |
| 11.4 | Click on the product row | Product detail page opens |
| 11.5 | Click **Edit Product** | Edit form opens |
| 11.6 | Scroll to the bottom and click **Save** | Product is saved (triggers recipe cost recalculation) |
| 11.7 | If an **"Affected Recipes"** modal appears: click the **Submit** button | Modal is handled |

---

### Stage 12: Verify Recipe Cost After Order Close

> **Logged in as:** `accountmanager` | **Tenant:** Wasabi Tysons

| Step | Action | Expected Result |
|------|--------|-----------------|
| 12.1 | Navigate to **Recipes** > **Menu Items** | Menu Items list loads |
| 12.2 | Verify the page is loaded | Page is ready |
| 12.3 | Locate the row for `Automated Recipe <RUN_ID>` and read the cost column | Cost value is retrieved |
| 12.4 | If the cost does not contain **"80"**: wait 15 seconds and retry (up to 5 attempts) | Server-side cost calculation may be delayed |
| 12.5 | Verify the cost contains **"80"** | Recipe cost reflects the $80 unit price from the closed invoice |

> **Note:** The server may take time to update the cost after the order is closed. The test retries up to 5 times with 15-second intervals.

---

### Stage 13: Create Count Sheet 1

> **Logged in as:** `accountmanager` | **Tenant:** Wasabi Tysons

| Step | Action | Expected Result |
|------|--------|-----------------|
| 13.1 | Navigate to Inventory Setup page (`/#/inventorySetup`) | Inventory Setup page loads |
| 13.2 | Click **Add Count Sheet** | Count sheet creation form opens |
| 13.3 | Enter the count sheet name `Automated Countsheet <RUN_ID>` | Name is filled |
| 13.4 | Click **Add Recipe** | Add Recipe modal opens |
| 13.5 | Click the recipe dropdown, type `Automated Recipe <RUN_ID>`, and select the matching option | Recipe is selected |
| 13.6 | Click **Add Recipe** button inside the modal | Recipe is added to the count sheet |
| 13.7 | Scroll to the bottom and click **Save** | Count sheet is saved |
| 13.8 | Navigate to Inventory page, click the **Enter a Count** dropdown, and verify the count sheet name appears | Count sheet was created successfully |

---

### Stage 14: Close Inventory Count

> **Logged in as:** `accountmanager` | **Tenant:** Wasabi Tysons

| Step | Action | Expected Result |
|------|--------|-----------------|
| 14.1 | Navigate to Inventory Counts page (`/#/inventory`) | Inventory Counts page loads |
| 14.2 | Click the **My Store** tab | My Store inventory view loads |
| 14.3 | Click the **Enter a Count** dropdown and select the count sheet `Automated Countsheet <RUN_ID>` | Count entry form opens |
| 14.4 | Click the inventory date field and set it to today | Date is set |
| 14.5 | Find the count input for `Automated Recipe <RUN_ID>` (via `data-testid="invCount-<recipe_name>"`) and enter **5** | Count is entered |
| 14.6 | Click **Save Options** dropdown, then click **Save and Close** | Inventory is saved and closed |
| 14.7 | Click **OK** in the confirmation dialog | Close is confirmed |
| 14.8 | Navigate back to Inventory Counts page and verify the count sheet name appears in the list | Inventory is closed successfully |

---

### Stage 15: Update Count Sheet - Remove Recipe

> **Logged in as:** `accountmanager` | **Tenant:** Wasabi Tysons

| Step | Action | Expected Result |
|------|--------|-----------------|
| 15.1 | Navigate to Inventory Setup page | Inventory Setup loads |
| 15.2 | Click on the count sheet `Automated Countsheet <RUN_ID>` | Count sheet detail opens |
| 15.3 | Scroll to the bottom and click the **delete** button for the recipe (via `data-testid="itemDeleteCS-<recipe_name>"`) | Confirmation dialog may appear |
| 15.4 | If a confirmation dialog appears, click **OK** | Recipe deletion is confirmed |
| 15.5 | Scroll to the bottom and click **Save** | Count sheet is saved |
| 15.6 | Verify the recipe's delete button is no longer visible | Recipe was successfully removed from the count sheet |

---

### Stage 16: Reopen Closed Inventory

> **Logged in as:** `accountmanager` | **Tenant:** Wasabi Tysons

| Step | Action | Expected Result |
|------|--------|-----------------|
| 16.1 | Navigate to Inventory Counts page | Inventory Counts loads |
| 16.2 | Click the **My Store** tab | My Store view loads |
| 16.3 | Click on the closed inventory row for `Automated Countsheet <RUN_ID>` | Inventory detail opens |
| 16.4 | Click **Reopen** | Confirmation dialog appears |
| 16.5 | Click **OK/Confirm/Yes** | Inventory is reopened |
| 16.6 | Navigate back to Inventory Counts, click **My Store** tab, and verify the count sheet row shows status **"Saved"** | Inventory was successfully reopened |

---

### Stage 17: Deactivate Recipe

> **Logged in as:** `accountmanager` | **Tenant:** Wasabi Tysons

| Step | Action | Expected Result |
|------|--------|-----------------|
| 17.1 | Navigate to **Recipes** > **Menu Items** | Menu Items list loads |
| 17.2 | Click on the menu item `Automated Recipe <RUN_ID>` | Recipe detail page opens |
| 17.3 | Click the **activation toggle** (`data-testid="activationButton"`) | Recipe is toggled off |
| 17.4 | If a **"Recipe In Use"** modal appears: dismiss it | Modal indicates the recipe is still referenced; deactivation may be blocked |
| 17.5 | If no modal appears: recipe is deactivated | Recipe is successfully deactivated |

---

### Stage 18: Delete Saved Inventory

> **Logged in as:** `accountmanager` | **Tenant:** Wasabi Tysons

| Step | Action | Expected Result |
|------|--------|-----------------|
| 18.1 | Navigate to Inventory Counts page | Inventory Counts loads |
| 18.2 | Click the **My Store** tab | My Store view loads |
| 18.3 | Click on the saved inventory row for `Automated Countsheet <RUN_ID>` | Inventory detail opens |
| 18.4 | Click **Edit** | Edit mode is enabled |
| 18.5 | Click the red **Delete** button (bottom-right) | Delete confirmation modal appears |
| 18.6 | Click the **Delete** button inside the confirmation modal (`#deleteInventoryConfirmation`) | Inventory is deleted |
| 18.7 | Navigate back to Inventory Counts, click **My Store** tab, and verify the count sheet row is no longer visible | Inventory was successfully deleted |

---

### Stage 19: Deactivate Recipe After Inventory Delete

> **Logged in as:** `accountmanager` | **Tenant:** Wasabi Tysons

| Step | Action | Expected Result |
|------|--------|-----------------|
| 19.1 | Navigate to **Recipes** > **Menu Items** | Menu Items list loads |
| 19.2 | Click on the menu item `Automated Recipe <RUN_ID>` | Recipe detail page opens |
| 19.3 | Click the **activation toggle** | Recipe toggles off |
| 19.4 | Verify the toggle returns **"deactivated"** (no "Recipe In Use" modal appears) | Recipe is no longer referenced by any inventory |
| 19.5 | Verify the **"Recipe Is Disabled"** banner is visible | Recipe is confirmed disabled |

---

### Stage 20: Add Product 2

> **Logged in as:** `accountmanager` | **Tenant:** Wasabi Tysons

| Step | Action | Expected Result |
|------|--------|-----------------|
| 20.1 | Navigate to Products via left nav | Products list loads |
| 20.2 | Click **Add Product** | Add Product form opens |
| 20.3 | Enter product name `Automated Product2 <RUN_ID>` | Name is filled |
| 20.4 | Select category **"Cleaning Supplies"** | Category is set |
| 20.5 | Select unit **"Case"** | Unit is set |
| 20.6 | Click **Save** | Product is saved |
| 20.7 | Verify the product appears in the **All stores** tab | Product 2 is created |

---

### Stage 21: Add Menu Item 2 (Recipe 2) with Ingredient

> **Logged in as:** `accountmanager` | **Tenant:** Wasabi Tysons

| Step | Action | Expected Result |
|------|--------|-----------------|
| 21.1 | Navigate to **Recipes** > **Menu Items** | Menu Items list loads |
| 21.2 | Click **Add Menu Item** | Add form opens |
| 21.3 | Fill details: Name = `Automated Recipe2 <RUN_ID>`, Type = **test**, Quantity = **1**, Unit = **case** | Fields are filled |
| 21.4 | Add ingredient: search and select `Automated Product2 <RUN_ID>`, Quantity = **1**, Unit = **case** | Ingredient is added |
| 21.5 | Handle conversion modal if it appears (enter **1**, select unit, save) | Conversion is handled |
| 21.6 | Click **Save** | Menu item is saved |
| 21.7 | Verify redirect to Menu Items list | Menu item 2 is created |

---

### Stage 22: Create Count Sheet 2

> **Logged in as:** `accountmanager` | **Tenant:** Wasabi Tysons

| Step | Action | Expected Result |
|------|--------|-----------------|
| 22.1 | Navigate to Inventory Setup page | Inventory Setup loads |
| 22.2 | Click **Add Count Sheet** | Count sheet form opens |
| 22.3 | Enter count sheet name `Automated Countsheet2 <RUN_ID>` | Name is filled |
| 22.4 | Click **Add Recipe**, search and select `Automated Recipe2 <RUN_ID>`, click **Add Recipe** in modal | Recipe is added |
| 22.5 | Scroll to the bottom and click **Save** | Count sheet is saved |
| 22.6 | Verify the count sheet appears in the **Enter a Count** dropdown on the Inventory page | Count sheet 2 is created |

---

### Stage 23: Save and Exit Inventory Count 2

> **Logged in as:** `accountmanager` | **Tenant:** Wasabi Tysons

| Step | Action | Expected Result |
|------|--------|-----------------|
| 23.1 | Navigate to Inventory Counts page | Inventory Counts loads |
| 23.2 | Click the **My Store** tab | My Store view loads |
| 23.3 | Click the **Enter a Count** dropdown and select `Automated Countsheet2 <RUN_ID>` | Count entry form opens |
| 23.4 | Set the inventory date to today | Date is set |
| 23.5 | Enter **5** in the count input for `Automated Recipe2 <RUN_ID>` | Count is entered |
| 23.6 | Click **Save Options** dropdown, then click **Save and Exit** | Inventory is saved (not closed) |
| 23.7 | Navigate back to Inventory Counts, click **My Store** tab, and verify the row shows status **"Saved"** | Inventory is saved but remains open |

---

### Stage 24: Switch Tenant to Wasabi Natick

> **Logged in as:** `accountmanager`

| Step | Action | Expected Result |
|------|--------|-----------------|
| 24.1 | Click the **tenant dropdown** (`#unitMenu_dd`) | Tenant menu opens |
| 24.2 | Select **"Wasabi Natick"** from the menu | Tenant switches; page reloads in Wasabi Natick context |

---

### Stage 25: Verify Recipe In Use Cannot Be Deactivated (Same Company)

> **Logged in as:** `accountmanager` | **Tenant:** Wasabi Natick

| Step | Action | Expected Result |
|------|--------|-----------------|
| 25.1 | Navigate to **Recipes** > **Menu Items** | Menu Items list loads |
| 25.2 | Click on the menu item `Automated Recipe2 <RUN_ID>` | Recipe detail page opens |
| 25.3 | Click the **activation toggle** | **"Recipe In Use"** modal appears |
| 25.4 | Verify the toggle returns **"in_use"** | Recipe cannot be deactivated because it's used in an active inventory at another tenant (Wasabi Tysons) under the same company concept |
| 25.5 | Dismiss the modal (click button or press Escape) | Modal closes |

---

### Stage 26: Switch Tenant Back to Wasabi Tysons

> **Logged in as:** `accountmanager`

| Step | Action | Expected Result |
|------|--------|-----------------|
| 26.1 | Click the **tenant dropdown** | Tenant menu opens |
| 26.2 | Select **"Wasabi Tysons"** from the menu | Tenant switches back |

---

### Stage 27: Add New Tenant (Cross-Company)

> **Logged in as:** `accountmanager` | **Tenant:** Wasabi Tysons

| Step | Action | Expected Result |
|------|--------|-----------------|
| 27.1 | Navigate to base URL | Home page loads |
| 27.2 | Click **Central** in the left navigation | Central menu expands |
| 27.3 | Click **Restaurant Units** | Restaurant Units list page loads |
| 27.4 | Verify the URL contains `/restaurantUnit` | Page is confirmed loaded |
| 27.5 | Click **Bulk Add Restaurant** | Bulk add form opens |
| 27.6 | Click **"Can't find your company?"** link | Advanced company selection form loads |
| 27.7 | In the **Concept** dropdown, search and select **"Wasabi"** | Concept is set |
| 27.8 | In the **Company** dropdown, search and select **"Mid-States Management Group"** | Company is set (different company, same concept) |
| 27.9 | Check the **Cross Unit Reporting** checkbox (if not already checked) | Cross-unit reporting is enabled |
| 27.10 | Enter the restaurant unit name `Automated Tenant <RUN_ID>` | Name is filled |
| 27.11 | In the **State** dropdown, search and select **"Alabama"** | State is set |
| 27.12 | Enter zip code **12345** | Zip code is filled |
| 27.13 | In the **POS** dropdown, select **"-- None --"** | POS is set |
| 27.14 | In the **Accounting** dropdown, select **"-- None --"** | Accounting is set |
| 27.15 | Enter **12** in the **Subscription** field | Subscription value is set |
| 27.16 | Scroll to the bottom and click **Save** | Confirmation modal appears |
| 27.17 | Click **Save** in the confirmation modal | Tenant is created |
| 27.18 | Verify the page redirects away from `/restaurantUnit/bulkAdd` back to `/restaurantUnit` | Tenant creation is confirmed |

---

### Stage 28: Add Product 3

> **Logged in as:** `accountmanager` | **Tenant:** Wasabi Tysons

| Step | Action | Expected Result |
|------|--------|-----------------|
| 28.1 | Navigate to Products via left nav | Products list loads |
| 28.2 | Click **Add Product** | Add Product form opens |
| 28.3 | Enter product name `Automated Product3 <RUN_ID>` | Name is filled |
| 28.4 | Select category **"Cleaning Supplies"** | Category is set |
| 28.5 | Select unit **"Case"** | Unit is set |
| 28.6 | Click **Save** | Product is saved |
| 28.7 | Verify the product appears in the **All stores** tab | Product 3 is created |

---

### Stage 29: Add Menu Item 3 (Recipe 3) with Ingredient

> **Logged in as:** `accountmanager` | **Tenant:** Wasabi Tysons

| Step | Action | Expected Result |
|------|--------|-----------------|
| 29.1 | Navigate to **Recipes** > **Menu Items** | Menu Items list loads |
| 29.2 | Click **Add Menu Item** | Add form opens |
| 29.3 | Fill details: Name = `Automated Recipe3 <RUN_ID>`, Type = **test**, Quantity = **1**, Unit = **case** | Fields are filled |
| 29.4 | Add ingredient: search and select `Automated Product3 <RUN_ID>`, Quantity = **1**, Unit = **case** | Ingredient is added |
| 29.5 | Handle conversion modal if it appears | Conversion is handled |
| 29.6 | Click **Save** | Menu item is saved |
| 29.7 | Verify redirect to Menu Items list | Menu item 3 is created |

---

### Stage 30: Create Count Sheet 3

> **Logged in as:** `accountmanager` | **Tenant:** Wasabi Tysons

| Step | Action | Expected Result |
|------|--------|-----------------|
| 30.1 | Navigate to Inventory Setup page | Inventory Setup loads |
| 30.2 | Click **Add Count Sheet** | Count sheet form opens |
| 30.3 | Enter count sheet name `Automated Countsheet3 <RUN_ID>` | Name is filled |
| 30.4 | Click **Add Recipe**, search and select `Automated Recipe3 <RUN_ID>`, click **Add Recipe** in modal | Recipe is added |
| 30.5 | Scroll to the bottom and click **Save** | Count sheet is saved |
| 30.6 | Verify the count sheet appears in the **Enter a Count** dropdown on the Inventory page | Count sheet 3 is created |

---

### Stage 31: Save and Exit Inventory Count 3

> **Logged in as:** `accountmanager` | **Tenant:** Wasabi Tysons

| Step | Action | Expected Result |
|------|--------|-----------------|
| 31.1 | Navigate to Inventory Counts page | Inventory Counts loads |
| 31.2 | Click the **My Store** tab | My Store view loads |
| 31.3 | Click the **Enter a Count** dropdown and select `Automated Countsheet3 <RUN_ID>` | Count entry form opens |
| 31.4 | Set the inventory date to today | Date is set |
| 31.5 | Enter **5** in the count input for `Automated Recipe3 <RUN_ID>` | Count is entered |
| 31.6 | Click **Save Options** dropdown, then click **Save and Exit** | Inventory is saved (not closed) |
| 31.7 | Navigate back and verify the row shows status **"Saved"** | Inventory is saved |

---

### Stage 32: Switch Tenant to New Tenant

> **Logged in as:** `accountmanager`

| Step | Action | Expected Result |
|------|--------|-----------------|
| 32.1 | Click the **tenant dropdown** | Tenant menu opens |
| 32.2 | Select `Automated Tenant <RUN_ID>` from the menu | Tenant switches to the newly created tenant |

---

### Stage 33: Verify Recipe In Use Cannot Be Deactivated (Cross-Company)

> **Logged in as:** `accountmanager` | **Tenant:** `Automated Tenant <RUN_ID>`

| Step | Action | Expected Result |
|------|--------|-----------------|
| 33.1 | Navigate to **Recipes** > **Menu Items** | Menu Items list loads |
| 33.2 | Click on the menu item `Automated Recipe3 <RUN_ID>` | Recipe detail page opens |
| 33.3 | Click the **activation toggle** | **"Recipe In Use"** modal appears |
| 33.4 | Verify the toggle returns **"in_use"** | Recipe cannot be deactivated because it's used in an active inventory at Wasabi Tysons under a different company but the same concept |
| 33.5 | Dismiss the modal | Modal closes |

---

### Stage 34: Switch Tenant Back to Wasabi Tysons

> **Logged in as:** `accountmanager`

| Step | Action | Expected Result |
|------|--------|-----------------|
| 34.1 | Click the **tenant dropdown** | Tenant menu opens |
| 34.2 | Select **"Wasabi Tysons"** from the menu | Tenant switches back to the default |

---

## Results Tracker

The automated test tracks the following stages. Each defaults to **failed** and is set to **passed** upon successful completion:

| # | Stage | Status |
|---|-------|--------|
| 1 | Add Product | pending |
| 2 | Add Vendor Item | pending |
| 3 | Add Menu Item | pending |
| 4 | Edit Menu Item | pending |
| 5 | File Uploaded | pending |
| 6 | End Preprocessing | pending |
| 7 | Initial Review | pending |
| 8 | Reconciliation | pending |
| 9 | Final Review | pending |
| 10 | Edit Product | pending |
| 11 | Verify Recipe Cost | pending |
| 12 | Create Count Sheet | pending |
| 13 | Close Inventory | pending |
| 14 | Update Inventory | pending |
| 15 | Reopen Inventory | pending |
| 16 | Deactivate Recipe | pending |
| 17 | Delete Inventory | pending |
| 18 | Deactivate Recipe After Delete Inventory | pending |
| 19 | Add Product 2 | pending |
| 20 | Add Menu Item 2 | pending |
| 21 | Create Count Sheet 2 | pending |
| 22 | Close Inventory 2 | pending |
| 23 | Switch Tenant | pending |
| 24 | Deactivate Recipe In Use | pending |
| 25 | Switch Tenant Back | pending |
| 26 | Add Tenant | pending |
| 27 | Add Product 3 | pending |
| 28 | Add Menu Item 3 | pending |
| 29 | Create Count Sheet 3 | pending |
| 30 | Save and Exit Inventory 3 | pending |
| 31 | Switch Tenant To New | pending |
| 32 | Deactivate Recipe In Use 2 | pending |
| 33 | Switch Tenant Back 2 | pending |

---

## Workflow Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                   RECIPE LIFECYCLE (Stages 1-12)                │
│                                                                 │
│  Product ──> Vendor Item ──> Menu Item ──> Add Ingredient       │
│       │                                                         │
│       └──> Invoice Upload ──> Preprocessing ──> Initial Review  │
│                 ──> Reconciliation ──> Final Review              │
│                        │                                        │
│                        └──> Edit Product ──> Verify Recipe Cost  │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│            INVENTORY LIFECYCLE (Stages 13-19)                   │
│                                                                 │
│  Create Count Sheet ──> Close Inventory ──> Update Count Sheet  │
│       ──> Reopen Inventory ──> Deactivate Recipe                │
│       ──> Delete Inventory ──> Deactivate Recipe (succeeds)     │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│        SAME COMPANY CONCEPT CHECK (Stages 20-26)                │
│                                                                 │
│  Product 2 ──> Recipe 2 ──> Count Sheet 2 ──> Save Inventory   │
│       ──> Switch to Wasabi Natick                               │
│       ──> Try Deactivate Recipe 2 ──> BLOCKED (in_use)          │
│       ──> Switch Back to Wasabi Tysons                          │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│       CROSS COMPANY CONCEPT CHECK (Stages 27-34)                │
│                                                                 │
│  Add New Tenant (different company, same concept)               │
│       ──> Product 3 ──> Recipe 3 ──> Count Sheet 3              │
│       ──> Save Inventory                                        │
│       ──> Switch to New Tenant                                  │
│       ──> Try Deactivate Recipe 3 ──> BLOCKED (in_use)          │
│       ──> Switch Back to Wasabi Tysons                          │
└─────────────────────────────────────────────────────────────────┘
```

---

## Key Verification Points

| Scenario | Expected Behavior |
|----------|-------------------|
| Recipe cost after invoice close | Cost updates to reflect the vendor item unit price ($80) |
| Deactivate recipe with active inventory | Blocked with "Recipe In Use" modal |
| Deactivate recipe after inventory deleted | Succeeds; "Recipe Is Disabled" banner appears |
| Deactivate recipe from same-concept tenant (same company) | Blocked — inventory exists at Wasabi Tysons |
| Deactivate recipe from same-concept tenant (different company) | Blocked — cross-company concept protection applies |

---

## Notes

- All tests run in **serial mode** because each stage depends on prior stages.
- The entire suite runs under a single `accountmanager` session (no user switching required, unlike the Legacy Reconciliation Process).
- The `createResultsTracker` utility logs a summary table of all 33 stage outcomes in the `afterAll` hook.
- The test generates a unique `TEST_RUN_ID` timestamp to prevent name collisions.
- Recipe cost verification retries up to 5 times with 15-second intervals to allow server-side recalculation.
- The suite tests recipe deactivation protection across three scenarios: same tenant, same-concept/same-company, and same-concept/cross-company.
