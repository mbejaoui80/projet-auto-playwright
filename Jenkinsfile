pipeline {
    // 1. D'ABORD : On utilise l'agent principal (le serveur Jenkins lui-même)
    // C'est lui qui a Java, Git et qui sait gérer les fichiers.
    agent any 
    
    stages {
        stage('Checkout') {
            steps {
                // Jenkins télécharge le code sur son disque dur
                git branch: 'main', url: 'https://github.com/mbejaoui80/projet-auto-playwright.git'
            }
        }

        stage('Tests dans Docker') {
            // 2. ENSUITE : On active le conteneur JUSTE pour cette étape
            agent {
                docker {
                    image 'mcr.microsoft.com/playwright:v1.57.0-jammy'
                    // reuseNode true est OBLIGATOIRE :
                    // Cela dit au conteneur : "Utilise le dossier où Jenkins a téléchargé le code"
                    reuseNode true 
                }
            }
            steps {
                echo "🚀 Démarrage du conteneur Playwright..."
                
                // Petit check : cette fois le fichier sera bien visible
                sh 'ls -la' 
                
                // Installation (dans le conteneur)
                sh 'npm ci && npm install allure-playwright'
                
                // Test (dans le conteneur)
                // Le rapport sera écrit dans le dossier partagé "allure-results"
                sh 'npx playwright test --reporter=line,allure-playwright'
            }
        }
    }

    // 3. ENFIN : On est sorti du conteneur, on est revenu sur l'agent "any" (Jenkins)
    // Jenkins a Java, donc il peut générer le rapport !
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