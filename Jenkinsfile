pipeline {
    // 1. On utilise l'agent "any" par défaut (le Jenkins principal, qui a Java)
    agent any 
    
    stages {
        stage('Checkout') {
            steps {
                // Le code est téléchargé sur l'hôte Jenkins
                git branch: 'main', url: 'https://github.com/mbejaoui80/projet-auto-playwright.git'
            }
        }

        stage('Diagnostic Fichiers') {
            steps {
                // On liste les fichiers pour vérifier si c'est .ts ou .js
                sh 'ls -la'
            }
        }

        stage('Tests dans Docker') {
            // 2. SEULEMENT cette étape s'exécute dans le conteneur Playwright
            agent {
                docker {
                    image 'mcr.microsoft.com/playwright:v1.57.0-jammy'
                    // Important : permet de réutiliser le dossier où on a fait le checkout
                    reuseNode true 
                }
            }
            steps {
                echo "📦 Installation et Test dans le conteneur..."
                // On installe et on lance.
                // J'ai mis 'npm install' tout court pour être sûr qu'il prenne tout
                sh 'npm install && npm install allure-playwright'
                
                // On lance les tests et on génère les résultats
                sh 'npx playwright test --reporter=line,allure-playwright'
            }
        }
    }

    // 3. Le "post" revient sur l'agent principal (qui a Java) pour générer le rapport
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