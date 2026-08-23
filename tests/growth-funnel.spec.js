const { test, expect } = require('@playwright/test');

test.describe('Request access form', () => {
  test('rejects submission with missing/invalid fields', async ({ page }) => {
    await page.goto('/');
    await page.locator('#access-form button[type="submit"]').click();
    await expect(page.locator('#ra-status')).toHaveClass(/error/);
    await expect(page.locator('#ra-status')).toContainText('valid work email');
  });

  test('accepts a valid submission and shows a success message', async ({ page }) => {
    await page.goto('/');
    await page.fill('#ra-name', 'Jordan Ellis');
    await page.fill('#ra-email', 'jordan.ellis@examplefund.com');
    await page.fill('#ra-firm', 'Example Pension Fund');
    await page.selectOption('#ra-intent', 'buy');

    // Headless Chromium has no mailto: handler, so assigning location.href to
    // a mailto: URL is a no-op that leaves the page in place — no interception needed.
    await page.locator('#access-form button[type="submit"]').click();
    await expect(page.locator('#ra-status')).toHaveClass(/success/);
    await expect(page.locator('#ra-status')).toContainText('Jordan');
    await expect(page.locator('#ra-name')).toHaveValue('');
  });
});

test.describe('Warm-intro referral attribution', () => {
  test('captures ?ref= param, shows a badge, and prefills the form', async ({ page }) => {
    await page.goto('/?ref=avery-at-blackstone');
    await expect(page.locator('#ra-referral-badge')).toBeVisible();
    await expect(page.locator('#ra-referral-badge')).toContainText('avery-at-blackstone');
    await expect(page.locator('#ra-referred')).toHaveValue('avery-at-blackstone');
  });

  test('persists referral attribution across a subsequent visit without the param', async ({ page, context }) => {
    await page.goto('/?ref=morgan-warm-intro');
    await expect(page.locator('#ra-referred')).toHaveValue('morgan-warm-intro');

    const page2 = await context.newPage();
    await page2.goto('/');
    await expect(page2.locator('#ra-referral-badge')).toBeVisible();
    await expect(page2.locator('#ra-referred')).toHaveValue('morgan-warm-intro');
  });

  test('captures utm parameters into hidden fields', async ({ page }) => {
    await page.goto('/?utm_source=linkedin&utm_medium=social&utm_campaign=founder-post-1');
    await expect(page.locator('#ra-utm-source')).toHaveValue('linkedin');
    await expect(page.locator('#ra-utm-medium')).toHaveValue('social');
    await expect(page.locator('#ra-utm-campaign')).toHaveValue('founder-post-1');
  });
});

test.describe('Pricing survey lead magnet', () => {
  test('is visible in the Insights section', async ({ page }) => {
    await page.goto('/');
    await page.locator('#insights').scrollIntoViewIfNeeded();
    await expect(page.locator('#lead-magnet')).toBeVisible();
    await expect(page.locator('#lead-magnet')).toContainText('Q3 2026 Secondary Pricing Survey');
  });

  test('rejects an invalid email', async ({ page }) => {
    await page.goto('/');
    await page.fill('#lm-email', 'not-an-email');
    await page.locator('#lead-magnet-form button[type="submit"]').click();
    await expect(page.locator('#lm-status')).toHaveClass(/error/);
  });

  test('accepts a valid work email and confirms', async ({ page }) => {
    await page.goto('/');
    await page.fill('#lm-email', 'analyst@secondaryfund.com');
    await page.locator('#lead-magnet-form button[type="submit"]').click();
    await expect(page.locator('#lm-status')).toHaveClass(/success/);
    await expect(page.locator('#lm-email')).toHaveValue('');
  });
});

test.describe('Insights content hub', () => {
  test('each insight card links to a real article page', async ({ page }) => {
    await page.goto('/');
    const cards = page.locator('#insight-grid .insight-card');
    await expect(cards).toHaveCount(3);
    const hrefs = await cards.evaluateAll((els) => els.map((el) => el.getAttribute('href')));
    for (const href of hrefs) {
      expect(href).toMatch(/^insights\/.+\.html$/);
    }
  });

  test('clicking an insight card navigates to a working article with a way back', async ({ page }) => {
    await page.goto('/');
    await page.locator('#insight-grid .insight-card').first().click();
    await expect(page).toHaveURL(/insights\/q2-2026-secondary-pricing-survey\.html/);
    await expect(page.locator('h1')).toContainText('Q2 2026 Secondary Pricing Survey');
    await expect(page.locator('.illustrative-tag')).toBeVisible();
    await page.click('.back-link');
    await expect(page).toHaveURL(/\/(index\.html)?#insights$/);
  });

  test('article has a CTA back into the funnel', async ({ page }) => {
    await page.goto('/insights/gp-led-continuation-vehicles-2026-outlook.html');
    await expect(page.locator('.article-cta a.btn')).toBeVisible();
  });
});

test.describe('Leadership section', () => {
  test('renders three leadership profiles', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#leadership .leader-card')).toHaveCount(3);
  });
});

test.describe('Sticky secondary CTA', () => {
  test('is hidden near the top and appears after scrolling past the hero', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#sticky-cta')).not.toHaveClass(/visible/);

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.5));
    await page.waitForTimeout(150);
    await expect(page.locator('#sticky-cta')).toHaveClass(/visible/);
  });

  test('hides again once the request-access section is in view', async ({ page }) => {
    await page.goto('/');
    await page.locator('#request-access').scrollIntoViewIfNeeded();
    await page.waitForTimeout(150);
    await expect(page.locator('#sticky-cta')).not.toHaveClass(/visible/);
  });
});
