pipeline {
    // 1. CRUCIAL : On commence sur la machine Jenkins normale (qui a Java et Git)
    agent any 
    
    stages {
        stage('Checkout') {
            steps {
                // On télécharge le code sur la machine principale
                git branch: 'main', url: 'https://github.com/mbejaoui80/projet-auto-playwright.git'
            }
        }

        stage('Tests dans Docker') {
            // 2. On entre dans le conteneur UNIQUEMENT pour cette étape
            agent {
                docker {
                    image 'mcr.microsoft.com/playwright:v1.57.0-jammy'
                    // reuseNode true est OBLIGATOIRE : cela permet au conteneur de voir le code téléchargé juste avant
                    reuseNode true 
                }
            }
            steps {
                echo "🚀 Démarrage du conteneur Playwright..."
                
                // Petit check pour te rassurer : cette fois le fichier sera là !
                sh 'ls -la playwright.config.ts' 
                
                // Installation des dépendances DANS le conteneur
                sh 'npm ci && npm install allure-playwright'
                
                // Lancement du test DANS le conteneur
                sh 'npx playwright test --reporter=line,allure-playwright'
            }
        }
    }

    // 3. On est ressorti du conteneur, on est revenu sur la machine principale
    // Donc Java est disponible pour Allure !
    post {
        always {
            echo "📊 Génération du rapport Allure (depuis l'hôte Jenkins)..."
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