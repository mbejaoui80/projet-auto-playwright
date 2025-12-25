pipeline {
    // 1. IMPORTANT : On commence sur la machine Jenkins (Hôte) qui possède Java
    agent any 
    
    stages {
        stage('Checkout') {
            steps {
                // Jenkins télécharge le code sur son disque dur
                git branch: 'main', url: 'https://github.com/mbejaoui80/projet-auto-playwright.git'
            }
        }

        stage('Tests dans Docker') {
            // 2. SEULEMENT cette étape s'exécute dans le conteneur Playwright
            agent {
                docker {
                    image 'mcr.microsoft.com/playwright:v1.57.0-jammy'
                    // CRUCIAL : "reuseNode true" permet de voir les fichiers téléchargés à l'étape d'avant
                    reuseNode true 
                }
            }
            steps {
                echo "🚀 Démarrage du conteneur Playwright..."
                
                // Petit check pour confirmer que le fichier est bien là
                sh 'ls -la playwright.config.ts' 
                
                // Installation et Test (dans le conteneur)
                sh 'npm ci && npm install allure-playwright'
                sh 'npx playwright test --reporter=line,allure-playwright'
            }
        }
    }

    // 3. RETOUR sur la machine Jenkins (Hôte) pour générer le rapport avec Java
    post {
        always {
            echo "📊 Génération du rapport Allure..."
            script {
                allure([
                    includeProperties: false,
                    jdk: '', 
                    properties: [],
                    reportBuildPolicy: 'ALWAYS',
                    results: [[path: 'allure-results']]
                ])
            }
        }
    }
}