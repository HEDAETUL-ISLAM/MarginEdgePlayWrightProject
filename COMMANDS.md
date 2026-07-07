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

## Recipe Test Suite

```bash
npm run test:recipe
```
```bash
npx playwright test tests/recipes/recipeTestSuite.spec.ts --headed --project=chromium
```

## Run Tests with Jira Reporting

```bash
JIRA_TICKET=ME-1234 JIRA_BASE_URL=https://marginedge.atlassian.net JIRA_EMAIL=user@co.com JIRA_API_TOKEN=xxx npm run test:recipe
```
