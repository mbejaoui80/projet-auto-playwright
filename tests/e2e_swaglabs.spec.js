// On importe les outils de Playwright
import { test, expect } from '@playwright/test';

test.describe('🛒 Scénarios E-Commerce Swag Labs', () => {

  // Avant chaque test, on se rend sur la page d'accueil
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
  });

  test('✅ Login Standard', async ({ page }) => {
    // Remplissage du formulaire
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    // Vérification (Assertion) : On doit être sur la page des produits
    // L'URL doit contenir "inventory.html"
    await expect(page).toHaveURL(/.*inventory.html/);
    // Le titre doit être "Products"
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
  });

  test('🚀 Parcours Complet : Achat d\'un produit', async ({ page }) => {
    // --- 1. LOGIN ---
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    // --- 2. AJOUT AU PANIER ---
    // On ajoute le "Sauce Labs Backpack"
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    
    // Vérification : Le badge du panier affiche "1"
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

    // --- 3. PANIER ---
    await page.locator('.shopping_cart_link').click();
    // Vérification : Le bon produit est dedans
    await expect(page.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack');
    await page.locator('[data-test="checkout"]').click();

    // --- 4. INFORMATION CLIENT ---
    await page.locator('[data-test="firstName"]').fill('Mohamed');
    await page.locator('[data-test="lastName"]').fill('AutoBot');
    await page.locator('[data-test="postalCode"]').fill('75000');
    await page.locator('[data-test="continue"]').click();

    // --- 5. FINALISATION ---
    await page.locator('[data-test="finish"]').click();

    // Vérification finale : Message de succès
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
  });

  test('❌ Login Echoué (Utilisateur bloqué)', async ({ page }) => {
    await page.locator('[data-test="username"]').fill('locked_out_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    // Vérification : Le message d'erreur apparaît
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]')).toContainText('Sorry, this user has been locked out.');
  });

});