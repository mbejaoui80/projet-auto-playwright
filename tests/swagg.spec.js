const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

test.describe('Tests de Connexion Swag Labs', () => {

    test('Doit se connecter avec succès (Cas Passant)', async ({ page }) => {
        const loginPage = new LoginPage(page);
        
        await loginPage.navigate();
        await loginPage.login('standard_user', 'secret_sauce');

        // Vérification : On doit atterrir sur la page des produits
        await expect(page).toHaveURL(/inventory.html/);
        await expect(page.locator('.title')).toHaveText('Products');
    });

    test('Doit échouer avec un mauvais mot de passe (Cas Non-Passant)', async ({ page }) => {
        const loginPage = new LoginPage(page);
        
        await loginPage.navigate();
        await loginPage.login('standard_user', 'mauvais_mdp');

        // Vérification : Le message d'erreur doit s'afficher
        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toContainText('Username and password do not match');
    });
});