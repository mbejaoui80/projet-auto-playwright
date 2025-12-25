pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.57.0-jammy'
            reuseNode true 
        }
    }
    
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/mbejaoui80/projet-auto-playwright.git'
            }
        }

        stage('Installation des dépendances') {
            steps {
                echo "📦 Installation des paquets..."
                // Ton correctif qui fonctionne bien :
                sh 'npm ci && npm install allure-playwright'
            }
        }

        stage('Exécution des Tests') {
            steps {
                echo "🚀 Lancement des tests avec reporter Allure..."
                // On génère les résultats bruts dans le dossier 'allure-results'
                sh 'npx playwright test --reporter=line,allure-playwright'
            }
        }
    }

    // C'EST ICI QUE CA CHANGEAIT :
    post {
        always {
            echo "📊 Génération du rapport Allure..."
            script {
                // Cette étape transforme les résultats bruts en un beau site web
                allure([
                    includeProperties: false,
                    jdk: '',
                    properties: [],
                    reportBuildPolicy: 'ALWAYS',
                    // On pointe vers le dossier créé par Playwright
                    results: [[path: 'allure-results']] 
                ])
            }
        }
    }
}