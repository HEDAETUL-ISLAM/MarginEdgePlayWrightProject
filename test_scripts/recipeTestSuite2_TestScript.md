# Test Script: Recipe Test Suite 2

| Field              | Value                                              |
|--------------------|----------------------------------------------------|
| **Module**         | Recipes                                            |
| **Test Suite**     | Recipe Test Suite 2                                |
| **Spec File**      | `tests/recipes/recipeTestSuite2.spec.ts`           |
| **Run Command**    | `npm run test:recipe2`                             |
| **Execution Mode** | Serial                                             |
| **Tenant**         | Wasabi Tysons                                      |
| **Environment**    | DEV (`https://me-63384.dev.marginedge.com`)        |

---

## Prerequisites

- Access to the DEV environment with the `accountmanager` user account
- A test invoice image file available at the configured path
- The vendor **Arrow** must exist in the system
- The tenants **Wasabi Tysons** and **Wasabi Natick** must be available
- The concept **Wasabi** and company **Mid-States Management Group** must exist (for tenant creation)
- A **Menu Recipe Type** must already exist (created by Recipe Test Suite 1)

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
| 3.1 | Navigate to **Recipes** > **Menu Items** | Menu Items list loads |
| 3.2 | Verify the URL contains `menuItem` and the **Menu Items** heading is visible | Page is confirmed loaded |
| 3.3 | Click **Add Menu Item** | Add Menu Item form opens |
| 3.4 | Enter the name `Automated Recipe <RUN_ID>` in the **Name** field | Name is filled |
| 3.5 | Click the **Recipe Type** dropdown, type `Menu Type <RUN_ID>`, and select the matching option | Recipe type is set |
| 3.6 | Enter **1** in the **Quantity** field | Quantity is set |
| 3.7 | Click the **Unit** dropdown, type **"case"**, and select the matching option | Unit is set |
| 3.8 | Click **Save** | Menu item is saved |
| 3.9 | Verify the page redirects to the Menu Items list (`/#/menuItem`) with title "Menu Items" | Redirect is confirmed |

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
| 8.4 | Generate a random 6-digit invoice number and enter it in the invoice number field | Invoice number is filled and stored |
| 8.5 | Click the invoice date field, then click **Today** | Date is set |
| 8.6 | If **Vendor Remittance Address** section appears: click "No address is provided on the invoice." and "No Phone number is provided on the invoice." | Remittance section is dismissed |
| 8.7 | Enter **80** in the verified total (spinbutton) field | Total is set |
| 8.8 | In the handwriting dropdown, select **"No"** | Handwriting is set |
| 8.9 | Click the checkbox: **"The initial review for this order is complete"** | Checkbox is checked |
| 8.10 | Click **Save and Complete** | Order is saved |
| 8.11 | If a **Verified** button appears, click it; if an **OK/Confirm** dialog appears, click it | All post-save modals are handled |

---

### Stage 9: Complete Reconciliation

> **Logged in as:** `accountmanager` | **Tenant:** Wasabi Tysons

| Step | Action | Expected Result |
|------|--------|-----------------|
| 9.1 | Navigate to Orders page | Orders list loads |
| 9.2 | Search for the invoice number (from Stage 8) and click the matching row | Order detail page opens |
| 9.3 | If the order shows **"This invoice is currently locked for automation processes"**: click **Process Invoice** > **OK/Confirm** | Order is unlocked |
| 9.4 | Verify the **"Reconcile Order"** heading is visible | Reconciliation form is loaded |
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
| 9.17 | Click the **Verified** button in the modal | Verification is confirmed |

---

### Stage 10: Verify Invoice Status After Reconciliation

> **Logged in as:** `accountmanager` | **Tenant:** Wasabi Tysons

| Step | Action | Expected Result |
|------|--------|-----------------|
| 10.1 | Navigate to Orders page | Orders list loads |
| 10.2 | Search for the invoice number | Matching order row appears |
| 10.3 | Check if the invoice status is **"In Processing"** or **"Closed"** | Status is determined |
| 10.4 | Store the status to determine the next workflow path | If **In Processing** → proceed to Final Review; if **Closed** → skip Final Review |

---

### Stage 11: Complete Final Review (Conditional)

> **Skipped if invoice status is "Closed"**
> **Logged in as:** `accountmanager` | **Tenant:** Wasabi Tysons

| Step | Action | Expected Result |
|------|--------|-----------------|
| 11.1 | Navigate to Orders page | Orders list loads |
| 11.2 | Search for the invoice number and click the matching row | Order detail page opens |
| 11.3 | Click the checkbox: **"This order has been reviewed and should be closed"** | Checkbox is checked |
| 11.4 | Click **Save** | Order is saved |
| 11.5 | Click the **Verified** button in the modal | Verification is confirmed |

---

### Stage 12: Edit Product

> **Logged in as:** `accountmanager` | **Tenant:** Wasabi Tysons

| Step | Action | Expected Result |
|------|--------|-----------------|
| 12.1 | Navigate to Products via left nav | Products list loads |
| 12.2 | Search for `Automated Product <RUN_ID>` | Product row appears |
| 12.3 | Click on the product row | Product detail page opens |
| 12.4 | Click **Edit Product** | Edit form opens |
| 12.5 | Scroll to the bottom and click **Save** | Product is saved (triggers recipe cost recalculation) |
| 12.6 | If an **"Affected Recipes"** modal appears: click the **Submit** button | Modal is handled |

---

### Stage 13: Verify Recipe Cost After Order Close

> **Logged in as:** `accountmanager` | **Tenant:** Wasabi Tysons

| Step | Action | Expected Result |
|------|--------|-----------------|
| 13.1 | Navigate to **Recipes** > **Menu Items** | Menu Items list loads |
| 13.2 | Locate the row for `Automated Recipe <RUN_ID>` and read the cost column | Cost value is retrieved |
| 13.3 | If the cost does not contain **"80"**: wait 15 seconds and retry (up to 5 attempts) | Server-side cost calculation may be delayed |
| 13.4 | Verify the cost contains **"80"** | Recipe cost reflects the $80 unit price from the closed invoice |

> **Note:** The server may take time to update the cost after the order is closed. The test retries up to 5 times with 15-second intervals.

---

### Stage 14: Create Count Sheet

> **Logged in as:** `accountmanager` | **Tenant:** Wasabi Tysons

| Step | Action | Expected Result |
|------|--------|-----------------|
| 14.1 | Navigate to Inventory Setup page (`/#/inventorySetup`) | Inventory Setup page loads |
| 14.2 | Click **Add Count Sheet** | Count sheet creation form opens |
| 14.3 | Enter the count sheet name `Automated Countsheet <RUN_ID>` | Name is filled |
| 14.4 | Click **Add Recipe** | Add Recipe modal opens |
| 14.5 | Search and select `Automated Recipe <RUN_ID>` | Recipe is selected |
| 14.6 | Click **Add Recipe** button inside the modal | Recipe is added to the count sheet |
| 14.7 | Scroll to the bottom and click **Save** | Count sheet is saved |
| 14.8 | Verify the count sheet appears in the **Enter a Count** dropdown | Count sheet was created |

---

### Stage 15: Close Inventory Count

> **Logged in as:** `accountmanager` | **Tenant:** Wasabi Tysons

| Step | Action | Expected Result |
|------|--------|-----------------|
| 15.1 | Navigate to Inventory Counts page (`/#/inventory`) | Inventory Counts page loads |
| 15.2 | Click the **My Store** tab | My Store inventory view loads |
| 15.3 | Select count sheet `Automated Countsheet <RUN_ID>` from the **Enter a Count** dropdown | Count entry form opens |
| 15.4 | Set the inventory date to today | Date is set |
| 15.5 | Enter **5** in the count input for `Automated Recipe <RUN_ID>` | Count is entered |
| 15.6 | Click **Save Options** > **Save and Close** | Inventory is saved and closed |
| 15.7 | Click **OK** in the confirmation dialog | Close is confirmed |
| 15.8 | Navigate back and verify the count sheet appears in the list | Inventory is closed |

---

### Stage 16: Update Count Sheet - Remove Recipe

> **Logged in as:** `accountmanager` | **Tenant:** Wasabi Tysons

| Step | Action | Expected Result |
|------|--------|-----------------|
| 16.1 | Navigate to Inventory Setup page | Inventory Setup loads |
| 16.2 | Click on the count sheet `Automated Countsheet <RUN_ID>` | Count sheet detail opens |
| 16.3 | Click the **delete** button for the recipe | Confirmation may appear |
| 16.4 | If confirmation appears, click **OK** | Deletion is confirmed |
| 16.5 | Scroll to the bottom and click **Save** | Count sheet is saved |
| 16.6 | Verify the recipe is no longer listed | Recipe was removed |

---

### Stage 17: Reopen Closed Inventory

> **Logged in as:** `accountmanager` | **Tenant:** Wasabi Tysons

| Step | Action | Expected Result |
|------|--------|-----------------|
| 17.1 | Navigate to Inventory Counts page | Inventory Counts loads |
| 17.2 | Click the **My Store** tab | My Store view loads |
| 17.3 | Click on the closed inventory for `Automated Countsheet <RUN_ID>` | Inventory detail opens |
| 17.4 | Click **Reopen** | Confirmation dialog appears |
| 17.5 | Click **OK/Confirm** | Inventory is reopened |
| 17.6 | Verify the count sheet shows status **"Saved"** | Inventory was reopened |

---

### Stage 18: Deactivate Recipe

> **Logged in as:** `accountmanager` | **Tenant:** Wasabi Tysons

| Step | Action | Expected Result |
|------|--------|-----------------|
| 18.1 | Navigate to **Recipes** > **Menu Items** | Menu Items list loads |
| 18.2 | Click on `Automated Recipe <RUN_ID>` | Recipe detail page opens |
| 18.3 | Click the **activation toggle** | Recipe is toggled off |
| 18.4 | If a **"Recipe In Use"** modal appears: dismiss it | Deactivation may be blocked |

---

### Stage 19: Delete Saved Inventory

> **Logged in as:** `accountmanager` | **Tenant:** Wasabi Tysons

| Step | Action | Expected Result |
|------|--------|-----------------|
| 19.1 | Navigate to Inventory Counts page | Inventory Counts loads |
| 19.2 | Click the **My Store** tab | My Store view loads |
| 19.3 | Click on the saved inventory for `Automated Countsheet <RUN_ID>` | Inventory detail opens |
| 19.4 | Click **Edit** | Edit mode is enabled |
| 19.5 | Click the red **Delete** button | Delete confirmation appears |
| 19.6 | Click **Delete** in the confirmation modal | Inventory is deleted |
| 19.7 | Verify the count sheet row is no longer visible | Inventory was deleted |

---

### Stage 20: Deactivate Recipe After Inventory Delete

> **Logged in as:** `accountmanager` | **Tenant:** Wasabi Tysons

| Step | Action | Expected Result |
|------|--------|-----------------|
| 20.1 | Navigate to **Recipes** > **Menu Items** | Menu Items list loads |
| 20.2 | Click on `Automated Recipe <RUN_ID>` | Recipe detail page opens |
| 20.3 | Click the **activation toggle** | Recipe toggles off |
| 20.4 | Verify no "Recipe In Use" modal appears (returns **"deactivated"**) | Recipe is no longer referenced |
| 20.5 | Verify the **"Recipe Is Disabled"** banner is visible | Recipe is confirmed disabled |

---

### Stage 21: Add Product 2

> **Logged in as:** `accountmanager` | **Tenant:** Wasabi Tysons

| Step | Action | Expected Result |
|------|--------|-----------------|
| 21.1 | Navigate to Products via left nav | Products list loads |
| 21.2 | Click **Add Product** | Add Product form opens |
| 21.3 | Enter product name `Automated Product2 <RUN_ID>` | Name is filled |
| 21.4 | Select category **"Cleaning Supplies"**, unit **"Case"** | Fields set |
| 21.5 | Click **Save** | Product is saved |
| 21.6 | Verify the product appears in the list | Product 2 is created |

---

### Stage 22: Add Menu Item 2 (Recipe 2) with Ingredient

> **Logged in as:** `accountmanager` | **Tenant:** Wasabi Tysons

| Step | Action | Expected Result |
|------|--------|-----------------|
| 22.1 | Navigate to **Recipes** > **Menu Items** | Menu Items list loads |
| 22.2 | Click **Add Menu Item** | Add form opens |
| 22.3 | Fill details: Name = `Automated Recipe2 <RUN_ID>`, Type = `Menu Type <RUN_ID>`, Quantity = **1**, Unit = **case** | Fields are filled |
| 22.4 | Add ingredient: `Automated Product2 <RUN_ID>`, Quantity = **1**, Unit = **case** | Ingredient is added |
| 22.5 | Click **Save** | Menu item is saved |
| 22.6 | Verify redirect to Menu Items list | Recipe 2 is created |

---

### Stage 23: Create Count Sheet 2

> **Logged in as:** `accountmanager` | **Tenant:** Wasabi Tysons

| Step | Action | Expected Result |
|------|--------|-----------------|
| 23.1 | Navigate to Inventory Setup page | Inventory Setup loads |
| 23.2 | Click **Add Count Sheet** | Count sheet form opens |
| 23.3 | Enter name `Automated Countsheet2 <RUN_ID>` | Name is filled |
| 23.4 | Add recipe `Automated Recipe2 <RUN_ID>` | Recipe is added |
| 23.5 | Scroll to bottom and click **Save** | Count sheet is saved |
| 23.6 | Verify the count sheet is created | Count sheet 2 exists |

---

### Stage 24: Save and Exit Inventory Count 2

> **Logged in as:** `accountmanager` | **Tenant:** Wasabi Tysons

| Step | Action | Expected Result |
|------|--------|-----------------|
| 24.1 | Navigate to Inventory Counts > **My Store** tab | My Store view loads |
| 24.2 | Select `Automated Countsheet2 <RUN_ID>` from **Enter a Count** dropdown | Count entry form opens |
| 24.3 | Set inventory date to today | Date is set |
| 24.4 | Enter **5** for `Automated Recipe2 <RUN_ID>` | Count is entered |
| 24.5 | Click **Save Options** > **Save and Exit** | Inventory is saved (not closed) |
| 24.6 | Verify the row shows status **"Saved"** | Inventory is saved |

---

### Stage 25: Switch Tenant to Wasabi Natick

> **Logged in as:** `accountmanager`

| Step | Action | Expected Result |
|------|--------|-----------------|
| 25.1 | Click the **tenant dropdown** (`#unitMenu_dd`) | Tenant menu opens |
| 25.2 | Select **"Wasabi Natick"** | Tenant switches |

---

### Stage 26: Verify Recipe In Use Cannot Be Deactivated (Same Company)

> **Logged in as:** `accountmanager` | **Tenant:** Wasabi Natick

| Step | Action | Expected Result |
|------|--------|-----------------|
| 26.1 | Navigate to **Recipes** > **Menu Items** | Menu Items list loads |
| 26.2 | Click on `Automated Recipe2 <RUN_ID>` | Recipe detail page opens |
| 26.3 | Click the **activation toggle** | **"Recipe In Use"** modal appears |
| 26.4 | Verify the toggle returns **"in_use"** | Recipe cannot be deactivated (used in active inventory at Wasabi Tysons) |
| 26.5 | Dismiss the modal | Modal closes |

---

### Stage 27: Switch Tenant Back to Wasabi Tysons

> **Logged in as:** `accountmanager`

| Step | Action | Expected Result |
|------|--------|-----------------|
| 27.1 | Click the **tenant dropdown** | Tenant menu opens |
| 27.2 | Select **"Wasabi Tysons"** | Tenant switches back |

---

### Stage 28: Add New Tenant (Cross-Company)

> **Logged in as:** `accountmanager` | **Tenant:** Wasabi Tysons

| Step | Action | Expected Result |
|------|--------|-----------------|
| 28.1 | Navigate to **Central** > **Restaurant Units** | Restaurant Units list loads |
| 28.2 | Click **Bulk Add Restaurant** | Bulk add form opens |
| 28.3 | Click **"Can't find your company?"** link | Advanced form loads |
| 28.4 | Select concept **"Wasabi"** | Concept is set |
| 28.5 | Select company **"Mid-States Management Group"** | Company is set (different company, same concept) |
| 28.6 | Check **Cross Unit Reporting** checkbox | Enabled |
| 28.7 | Enter name `Automated Tenant <RUN_ID>` | Name is filled |
| 28.8 | Select state **"Alabama"**, enter zip **12345** | Location set |
| 28.9 | Select POS **"-- None --"**, Accounting **"-- None --"** | Systems set |
| 28.10 | Enter subscription **12** | Subscription set |
| 28.11 | Scroll to bottom and click **Save**, confirm in modal | Tenant is created |

---

### Stage 29: Add Product 3

> **Logged in as:** `accountmanager` | **Tenant:** Wasabi Tysons

| Step | Action | Expected Result |
|------|--------|-----------------|
| 29.1 | Navigate to Products, click **Add Product** | Form opens |
| 29.2 | Enter name `Automated Product3 <RUN_ID>`, category **"Cleaning Supplies"**, unit **"Case"** | Fields filled |
| 29.3 | Click **Save** | Product 3 is created |

---

### Stage 30: Add Menu Item 3 (Recipe 3) with Ingredient

> **Logged in as:** `accountmanager` | **Tenant:** Wasabi Tysons

| Step | Action | Expected Result |
|------|--------|-----------------|
| 30.1 | Navigate to **Recipes** > **Menu Items** | Menu Items list loads |
| 30.2 | Click **Add Menu Item** | Form opens |
| 30.3 | Fill details: Name = `Automated Recipe3 <RUN_ID>`, Type = `Menu Type <RUN_ID>`, Quantity = **1**, Unit = **case** | Fields filled |
| 30.4 | Add ingredient: `Automated Product3 <RUN_ID>`, Quantity = **1**, Unit = **case** | Ingredient added |
| 30.5 | Click **Save** | Recipe 3 is created |

---

### Stage 31: Create Count Sheet 3

> **Logged in as:** `accountmanager` | **Tenant:** Wasabi Tysons

| Step | Action | Expected Result |
|------|--------|-----------------|
| 31.1 | Navigate to Inventory Setup | Inventory Setup loads |
| 31.2 | Click **Add Count Sheet**, enter name `Automated Countsheet3 <RUN_ID>` | Name filled |
| 31.3 | Add recipe `Automated Recipe3 <RUN_ID>` | Recipe added |
| 31.4 | Save the count sheet | Count sheet 3 is created |

---

### Stage 32: Save and Exit Inventory Count 3

> **Logged in as:** `accountmanager` | **Tenant:** Wasabi Tysons

| Step | Action | Expected Result |
|------|--------|-----------------|
| 32.1 | Navigate to Inventory Counts > **My Store** tab | My Store view loads |
| 32.2 | Select `Automated Countsheet3 <RUN_ID>` | Count entry form opens |
| 32.3 | Set date to today, enter **5** for `Automated Recipe3 <RUN_ID>` | Count entered |
| 32.4 | Click **Save and Exit** | Inventory is saved |

---

### Stage 33: Switch Tenant to New Tenant

> **Logged in as:** `accountmanager`

| Step | Action | Expected Result |
|------|--------|-----------------|
| 33.1 | Click the **tenant dropdown** | Tenant menu opens |
| 33.2 | Select `Automated Tenant <RUN_ID>` | Tenant switches to the new tenant |

---

### Stage 34: Verify Recipe In Use Cannot Be Deactivated (Cross-Company)

> **Logged in as:** `accountmanager` | **Tenant:** `Automated Tenant <RUN_ID>`

| Step | Action | Expected Result |
|------|--------|-----------------|
| 34.1 | Navigate to **Recipes** > **Menu Items** | Menu Items list loads |
| 34.2 | Click on `Automated Recipe3 <RUN_ID>` | Recipe detail page opens |
| 34.3 | Click the **activation toggle** | **"Recipe In Use"** modal appears |
| 34.4 | Verify the toggle returns **"in_use"** | Recipe cannot be deactivated (used at Wasabi Tysons under different company, same concept) |
| 34.5 | Dismiss the modal | Modal closes |

---

### Stage 35: Switch Tenant Back to Wasabi Tysons

> **Logged in as:** `accountmanager`

| Step | Action | Expected Result |
|------|--------|-----------------|
| 35.1 | Click the **tenant dropdown** | Tenant menu opens |
| 35.2 | Select **"Wasabi Tysons"** | Tenant switches back to the default |

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
| 9 | Final Review | pending (conditional — skipped if invoice is already Closed) |
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
accountmanager ──> Products, Vendor Items, Menu Items, Invoice Processing,
                   Inventory Management, Tenant Management
       │
       ├──> Recipe Lifecycle (Stages 1-13)
       │       Product ──> Vendor Item ──> Menu Item ──> Add Ingredient
       │       ──> Invoice Upload ──> Preprocessing ──> Initial Review
       │       ──> Reconciliation ──> Verify Status
       │           ├── In Processing ──> Final Review
       │           └── Closed ──> (skip Final Review)
       │       ──> Edit Product ──> Verify Recipe Cost
       │
       ├──> Inventory Lifecycle (Stages 14-20)
       │       Create Count Sheet ──> Close Inventory ──> Update Count Sheet
       │       ──> Reopen Inventory ──> Deactivate Recipe
       │       ──> Delete Inventory ──> Deactivate Recipe (succeeds)
       │
       ├──> Same Company Concept Check (Stages 21-27)
       │       Product 2 ──> Recipe 2 ──> Count Sheet 2 ──> Save Inventory
       │       ──> Switch to Wasabi Natick
       │       ──> Try Deactivate Recipe 2 ──> BLOCKED (in_use)
       │       ──> Switch Back to Wasabi Tysons
       │
       └──> Cross Company Concept Check (Stages 28-35)
               Add New Tenant (different company, same concept)
               ──> Product 3 ──> Recipe 3 ──> Count Sheet 3
               ──> Save Inventory
               ──> Switch to New Tenant
               ──> Try Deactivate Recipe 3 ──> BLOCKED (in_use)
               ──> Switch Back to Wasabi Tysons
```

---

## Notes

- All tests run in **serial mode** because each stage depends on prior stages.
- The entire suite runs under a single `accountmanager` session.
- The `createResultsTracker` utility logs a summary table of all 33 stage outcomes in the `afterAll` hook.
- The test generates a unique `TEST_RUN_ID` timestamp to prevent name collisions.
- After reconciliation, the invoice status is checked: if **"In Processing"** the final review proceeds; if **"Closed"** the final review is skipped via `test.skip()`.
- Recipe cost verification retries up to 5 times with 15-second intervals to allow server-side recalculation.
- The suite tests recipe deactivation protection across three scenarios: same tenant, same-concept/same-company, and same-concept/cross-company.
