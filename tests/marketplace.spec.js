const { test, expect } = require('@playwright/test');

test.describe('Marketplace table', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('renders fund listings by default, all tagged illustrative', async ({ page }) => {
    const rows = page.locator('#table-wrap .t-row');
    await expect(rows).toHaveCount(8);
    await expect(page.locator('#table-caption')).toContainText('illustrative listings');
    await expect(rows.first()).toContainText('Illustrative');
  });

  test('switching to Direct Company Stakes changes columns and data', async ({ page }) => {
    await page.locator('#asset-tabs button[data-asset="direct"]').click();
    await expect(page.locator('#asset-tabs button[data-asset="direct"]')).toHaveClass(/active/);
    const rows = page.locator('#table-wrap .t-row');
    await expect(rows).toHaveCount(7);
    await expect(rows.first()).toContainText('Vantage Robotics');
  });

  test('search filter narrows results and clear filters resets', async ({ page }) => {
    await page.fill('#f-search', 'Meridian');
    await expect(page.locator('#table-wrap .t-row')).toHaveCount(1);
    await expect(page.locator('#table-wrap .t-row').first()).toContainText('Meridian Capital Partners VII');

    await page.click('#f-clear');
    await expect(page.locator('#f-search')).toHaveValue('');
    await expect(page.locator('#table-wrap .t-row')).toHaveCount(8);
  });

  test('empty filter result shows clear-filters affordance', async ({ page }) => {
    await page.fill('#f-search', 'zzz-no-such-fund-zzz');
    await expect(page.locator('.empty-state')).toContainText('No mandates match these filters.');
    await page.click('#empty-clear');
    await expect(page.locator('#table-wrap .t-row')).toHaveCount(8);
  });

  test('status filter isolates closed listings and disables their action button', async ({ page }) => {
    await page.selectOption('#f-status', 'closed');
    const rows = page.locator('#table-wrap .t-row');
    await expect(rows).toHaveCount(1);
    await expect(rows.first().locator('.action-btn')).toBeDisabled();
    await expect(rows.first().locator('.action-btn')).toHaveText('Bidding Closed');
  });

  test('row click opens the detail drawer with matching data', async ({ page }) => {
    await page.locator('#table-wrap .t-row').first().click();
    await expect(page.locator('#drawer')).toHaveClass(/active/);
    await expect(page.locator('#drawer-name')).toContainText(/.+/);
    await page.click('#drawer-close');
    await expect(page.locator('#drawer')).not.toHaveClass(/active/);
  });

  test('density toggle switches row padding state', async ({ page }) => {
    await page.click('.density-toggle button[data-density="compact"]');
    await expect(page.locator('.density-toggle button[data-density="compact"]')).toHaveClass(/active/);
  });
});

test.describe('Bid submission flow', () => {
  test('completing all steps produces a reference number', async ({ page }) => {
    await page.goto('/');
    const firstRow = page.locator('#table-wrap .t-row').first();
    await firstRow.locator('.action-btn').click();
    await expect(page.locator('#modal')).toHaveClass(/active/);

    await expect(page.locator('#m-primary')).toBeDisabled();
    await page.fill('#m-bid-value', '92');
    await page.fill('#m-close-date', 'Q4 2026');
    await expect(page.locator('#m-primary')).toBeEnabled();
    await page.click('#m-primary');

    await expect(page.locator('#m-primary')).toBeDisabled();
    await page.check('#m-nda-ack');
    await expect(page.locator('#m-primary')).toBeEnabled();
    await page.click('#m-primary');

    await expect(page.locator('#m-summary-bid')).toContainText('92');
    await page.click('#m-primary');

    await expect(page.locator('#m-confirm-text')).toContainText(/Reference #SM-\d+/);
    await page.click('#m-done');
    await expect(page.locator('#modal')).not.toHaveClass(/active/);
  });

  test('back button returns to the previous step without losing entered data', async ({ page }) => {
    await page.goto('/');
    await page.locator('#table-wrap .t-row').first().locator('.action-btn').click();
    await page.fill('#m-bid-value', '88');
    await page.fill('#m-close-date', 'Q1 2027');
    await page.click('#m-primary');
    await page.click('#m-back');
    await expect(page.locator('#m-bid-value')).toHaveValue('88');
  });
});

test.describe('Featured opportunities', () => {
  test('renders three curated cards with working view + bid actions', async ({ page }) => {
    await page.goto('/');
    const cards = page.locator('#featured-grid .feature-card');
    await expect(cards).toHaveCount(3);

    await cards.first().locator('[data-bid-kind]').click();
    await expect(page.locator('#modal')).toHaveClass(/active/);
  });
});

test.describe('How it works', () => {
  test('toggles between seller and buyer tracks', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#hiw-grid .track-step')).toHaveCount(4);
    await expect(page.locator('#hiw-grid')).toContainText('Confidential intake');

    await page.locator('#hiw-tabs button[data-hiw="buyers"]').click();
    await expect(page.locator('#hiw-grid')).toContainText('Get verified');
  });
});
