# Run Commands

## Legacy Reconciliation Process

```bash
npm run test:legacy-recon
```
```bash
npx playwright test tests/invoiceProcessing/legacyReconciliationProcess.spec.ts --headed --project=legacyReconciliation
```

## EDI Invoices

```bash
npm run test:edi-invoices
```
```bash
npx playwright test tests/invoiceProcessing/ediInvoices.spec.ts --headed --project=chromium
```

## Recipe Test Suite 1

```bash
npm run test:recipe1
```
```bash
npx playwright test tests/recipes/recipeTestSuite1.spec.ts --headed --project=chromium
```

## Recipe Test Suite 2

```bash
npm run test:recipe2
```
```bash
npx playwright test tests/recipes/recipeTestSuite2.spec.ts --headed --project=chromium
```

## Recipe Test Suite 3

```bash
npm run test:recipe3
```
```bash
npx playwright test tests/recipes/recipeTestSuite3.spec.ts --headed --project=chromium
```

## Run Tests with Jira Reporting

```bash
JIRA_TICKET=ME-1234 JIRA_BASE_URL=https://marginedge.atlassian.net JIRA_EMAIL=user@co.com JIRA_API_TOKEN=xxx npm run test:recipe
```
