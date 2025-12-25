pipeline {
    // 1. IMPORTANT : On dit à Jenkins de commencer sur la machine principale (qui a Java)
    agent any 
    
    stages {
        stage('Checkout') {
            steps {
                // Le code est téléchargé sur l'hôte Jenkins
                git branch: 'main', url: 'https://github.com/mbejaoui80/projet-auto-playwright.git'
            }
        }

        stage('Exécution des Tests (Docker)') {
            // 2. SEULEMENT cette étape bascule dans le conteneur
            agent {
                docker {
                    image 'mcr.microsoft.com/playwright:v1.57.0-jammy'
                    // reuseNode true est CRUCIAL : il dit au conteneur d'utiliser le dossier qu'on vient de télécharger
                    reuseNode true 
                }
            }
            steps {
                echo "🚀 Démarrage du conteneur Playwright..."
                
                // Vérification pour te rassurer (tu verras que le fichier est bien là)
                sh 'ls -la' 
                
                // Installation et exécution
                // On installe allure-playwright ici car le conteneur en a besoin pour générer les JSON
                sh 'npm ci && npm install allure-playwright'
                sh 'npx playwright test --reporter=line,allure-playwright'
            }
        }
    }

    // 3. Le post s'exécute par défaut sur l'agent global (donc "any", l'hôte Jenkins)
    // C'est ici que Java est disponible !
    post {
        always {
            echo "📊 Génération du rapport Allure (depuis l'hôte Jenkins)..."
            script {
                allure([
                    includeProperties: false,
                    jdk: '', // Laisse vide, il utilisera le Java du système
                    properties: [],
                    reportBuildPolicy: 'ALWAYS',
                    results: [[path: 'allure-results']]
                ])
            }
        }
    }
}