pipeline {
    agent any
    
    tools {
        // On utilise l'outil Node qu'on a configuré tout à l'heure
        nodejs 'NodeJS-Auto'
    }
    
    stages {
        stage('Installation') {
            steps {
                echo '📦 Installation des dépendances...'
                // Installe les librairies du projet
                sh 'npm install'
            }
        }
        
        stage('Test') {
            steps {
                echo '🚀 Lancement du Robot Playwright...'
                // Lance les tests
                sh 'npx playwright test'
            }
        }
    }
}