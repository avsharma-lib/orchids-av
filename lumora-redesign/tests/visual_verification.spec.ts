import { test, expect } from '@playwright/test';

test('verify politician website changes', async ({ page }) => {
  await page.goto('http://localhost:5174/');

  // Verify Navbar Logo
  const logo = page.locator('nav img[alt="Congress Logo"]');
  await expect(logo).toBeVisible();
  await page.screenshot({ path: 'verification/navbar.png' });

  // Verify Photo Gallery Section Title
  const galleryTitle = page.locator('section#gallery h2');
  await expect(galleryTitle).toContainText('फोटो');
  await page.screenshot({ path: 'verification/gallery_section.png' });

  // Click gallery to open grid
  await page.click('section#gallery .relative.aspect-\\[16\\/9\\]');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'verification/grid_modal.png' });

  // Verify About Address
  const address = page.locator('section#about');
  await expect(address).toContainText('भनपुरी मिश्रा कॉम्प्लेक्स');
  await page.screenshot({ path: 'verification/about_address.png' });
});
