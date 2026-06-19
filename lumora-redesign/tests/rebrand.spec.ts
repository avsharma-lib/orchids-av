import { test, expect } from '@playwright/test';

test('verify rebrand and sections', async ({ page }) => {
  await page.goto('http://localhost:5173');

  // Wait for content
  await page.waitForSelector('text=कमलेश मिश्रा');

  // Check sections order (approximate by scrolling)
  // Gallery should be high up
  const gallery = page.locator('#gallery');
  await expect(gallery).toBeVisible();

  // Hero should be visible
  const hero = page.locator('h1:has-text("कमलेश मिश्रा")');
  await expect(hero).toBeVisible();

  // About section
  const about = page.locator('#about');
  await expect(about).toBeVisible();
  await expect(about).toContainText('छत्तीसगढ़ प्रदेश कांग्रेस कमेटी के सचिव');

  // Contact section
  const contact = page.locator('#contact');
  await expect(contact).toBeVisible();
  await expect(contact).toContainText('9406122222');
  await expect(contact).toContainText('9644950000');

  // Volunteer section
  const volunteer = page.locator('#volunteer');
  await expect(volunteer).toBeVisible();
  await expect(volunteer).toContainText('स्वयंसेवक बनें');

  // Screenshots
  await page.screenshot({ path: 'verification/hero.png' });
  await gallery.scrollIntoViewIfNeeded();
  await page.screenshot({ path: 'verification/gallery.png' });
  await about.scrollIntoViewIfNeeded();
  await page.screenshot({ path: 'verification/about.png' });
  await contact.scrollIntoViewIfNeeded();
  await page.screenshot({ path: 'verification/contact.png' });
  await volunteer.scrollIntoViewIfNeeded();
  await page.screenshot({ path: 'verification/volunteer.png' });
});
