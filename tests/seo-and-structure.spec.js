const { test, expect } = require('@playwright/test');

test.describe('SEO and page structure', () => {
  test('home page has required meta and JSON-LD', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/SecondariesMatch/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://secondariesmatch.vercel.app/'
    );
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.+/);

    const ldJsonBlocks = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(ldJsonBlocks.length).toBeGreaterThanOrEqual(2);
    for (const block of ldJsonBlocks) {
      expect(() => JSON.parse(block)).not.toThrow();
    }
    const types = ldJsonBlocks.map((b) => JSON.parse(b)['@type']);
    expect(types).toContain('Organization');
    expect(types).toContain('FAQPage');
  });

  test('nav links point to real in-page sections', async ({ page }) => {
    await page.goto('/');
    const hrefs = await page.locator('.nav-links a[href^="#"]').evaluateAll((els) =>
      els.map((el) => el.getAttribute('href'))
    );
    expect(hrefs.length).toBeGreaterThan(0);
    const sectionHrefs = hrefs.filter((href) => href.length > 1);
    expect(sectionHrefs.length).toBeGreaterThan(0);
    for (const href of sectionHrefs) {
      const id = href.slice(1);
      await expect(page.locator(`[id="${id}"]`)).toHaveCount(1);
    }
  });

  test('sitemap.xml lists home and all insight articles', async ({ request }) => {
    const res = await request.get('/sitemap.xml');
    expect(res.ok()).toBeTruthy();
    const body = await res.text();
    expect(body).toContain('https://secondariesmatch.vercel.app/');
    expect(body).toContain('/insights/q2-2026-secondary-pricing-survey.html');
    expect(body).toContain('/insights/gp-led-continuation-vehicles-2026-outlook.html');
    expect(body).toContain('/insights/direct-secondaries-late-stage-tech.html');
  });

  test('robots.txt is reachable and allows crawling', async ({ request }) => {
    const res = await request.get('/robots.txt');
    expect(res.ok()).toBeTruthy();
    const body = await res.text();
    expect(body).toMatch(/Allow:\s*\//);
  });
});
