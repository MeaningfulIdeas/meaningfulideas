// @ts-check
const { test, expect } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

const basePath = path.resolve(__dirname, '..');
const pages = [
  'index.html',
  'courses.html',
  'free-course.html',
  'maximum-change.html',
  'blog.html',
  'membership.html',
  'contact.html',
  'terms.html',
  'privacy.html',
  'cookies.html',
  'blog/i-wish-i-was-nicer.html',
  'blog/coercive-influence.html',
  'blog/let-our-guidance-feel-good.html',
];

function fileUrl(relativePath) {
  const fullPath = path.join(basePath, relativePath);
  return 'file://' + encodeURI(fullPath);
}

test.describe('Site renders correctly on all pages', () => {
  for (const page of pages) {
    test(`${page} loads properly`, async ({ page: p }) => {
      const errors = [];
      p.on('pageerror', err => errors.push(err.message));
      p.on('console', msg => {
        if (msg.type() === 'error') errors.push(msg.text());
      });

      await p.goto(fileUrl(page), { waitUntil: 'load' });
      await p.waitForTimeout(500);

      // Check title
      const title = await p.title();
      expect(title.length).toBeGreaterThan(0);

      // Check page has content
      const bodyText = await p.locator('body').innerText();
      expect(bodyText.length).toBeGreaterThan(100);

      // Check no JS errors
      expect(errors.filter(e => !e.includes('favicon'))).toEqual([]);
    });
  }
});

test.describe('Navigation', () => {
  test('nav is present on home', async ({ page: p }) => {
    await p.goto(fileUrl('index.html'), { waitUntil: 'load' });
    const nav = p.locator('.nav');
    await expect(nav).toBeVisible();
    const links = p.locator('.nav-links a');
    await expect(links).toHaveCount(6);
  });

  test('nav collapses on mobile and toggle works', async ({ page: p }) => {
    // Check if we're on mobile project
    const isMobile = p.viewportSize().width < 900;

    await p.goto(fileUrl('index.html'), { waitUntil: 'load' });

    if (isMobile) {
      // Nav links should be hidden initially
      const navLinks = p.locator('.nav-links');
      const isVisible = await navLinks.isVisible();
      expect(isVisible).toBe(false);

      // Toggle should be visible
      const toggle = p.locator('.nav-toggle');
      await expect(toggle).toBeVisible();

      // Click toggle to open menu
      await toggle.click();
      await p.waitForTimeout(300);
      await expect(navLinks).toBeVisible();

      // Click a link to close it
      await navLinks.locator('a').first().click();
      await p.waitForTimeout(300);
      expect(await navLinks.isVisible()).toBe(false);
    } else {
      // Nav links should be visible on desktop
      const navLinks = p.locator('.nav-links');
      await expect(navLinks).toBeVisible();
    }
  });
});

test.describe('Page content verification', () => {
  test('homepage preserves UTF-8 branding and attribution', async () => {
    const html = fs.readFileSync(path.join(basePath, 'index.html'), 'utf8');
    expect(html).toContain('🌿');
    expect(html).toContain('🌱');
    expect(html).toContain('Non-Coercive, Collaborative Parenting by Vivek Patel');
    expect(html).not.toMatch(/ðŸ|â€”|Â©/);
  });

  test('clean URL pages exist', () => {
    for (const page of ['blog', 'courses', 'contact', 'membership', 'privacy', 'terms']) {
      expect(fs.existsSync(path.join(basePath, page, 'index.html'))).toBe(true);
    }
  });

  test('homepage has key sections', async ({ page: p }) => {
    await p.goto(fileUrl('index.html'), { waitUntil: 'load' });
    await expect(p.locator('.hero')).toBeVisible();
    await expect(p.locator('.section-alt')).toBeVisible();
    await expect(p.locator('.quote-section')).toBeVisible();
    await expect(p.locator('.footer')).toBeVisible();
    await expect(p.locator('.disclaimer')).toBeVisible();
  });

  test('courses page has pricing', async ({ page: p }) => {
    await p.goto(fileUrl('courses.html'), { waitUntil: 'load' });
    await expect(p.locator('.pricing-card')).toBeVisible();
    await expect(p.locator('.curriculum')).toBeVisible();
  });

  test('maximum-change page has curriculum', async ({ page: p }) => {
    await p.goto(fileUrl('maximum-change.html'), { waitUntil: 'load' });
    const items = p.locator('.curriculum-item');
    await expect(items).toHaveCount(11);
  });

  test('blog page has articles', async ({ page: p }) => {
    await p.goto(fileUrl('blog.html'), { waitUntil: 'load' });
    const cards = p.locator('.blog-card');
    await expect(cards).toHaveCount(3);
  });
});

test.describe('Mobile responsiveness', () => {
  test('no horizontal overflow on mobile', async ({ page: p }) => {
    const isMobile = p.viewportSize().width < 900;
    if (!isMobile) return;

    for (const page of pages) {
      await p.goto(fileUrl(page), { waitUntil: 'load' });
      await p.waitForTimeout(300);
      const hasOverflow = await p.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      expect(hasOverflow, `${page} should not have horizontal overflow`).toBe(false);
    }
  });

  test('mobile menu functions correctly', async ({ page: p }) => {
    const isMobile = p.viewportSize().width < 900;
    if (!isMobile) return;

    await p.goto(fileUrl('index.html'), { waitUntil: 'load' });
    const toggle = p.locator('.nav-toggle');
    await expect(toggle).toBeVisible();

    // Open menu
    await toggle.click();
    await p.waitForTimeout(300);
    const menu = p.locator('.nav-links');
    await expect(menu).toBeVisible();

    // Verify all nav links are accessible
    const linkTexts = await p.locator('.nav-links a').allInnerTexts();
    expect(linkTexts.length).toBe(6);
    expect(linkTexts).toContain('Home');
    expect(linkTexts).toContain('Free Course');
  });
});

test.describe('External links', () => {
  test('free course CTA has correct href', async ({ page: p }) => {
    await p.goto(fileUrl('index.html'), { waitUntil: 'load' });
    const cta = p.locator('a[href*="guiding-without-controlling-free-course"]').first();
    const href = await cta.getAttribute('href');
    expect(href).toContain('meaningfulideas.newzenler.com');
  });

  test('paid course CTA has correct href', async ({ page: p }) => {
    await p.goto(fileUrl('courses.html'), { waitUntil: 'load' });
    const cta = p.locator('a[href*="maximum-change"]').first();
    const href = await cta.getAttribute('href');
    expect(href).toContain('meaningfulideas.newzenler.com');
  });
});