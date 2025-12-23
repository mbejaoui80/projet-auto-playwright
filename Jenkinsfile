pipeline {
    agent any
    
    tools {
        nodejs 'NodeJS-Auto'
    }
    
    stages {
        stage('Installation') {
            steps {
                echo '📦 Installation des dépendances...'
                sh 'npm install'
                
                echo '🌍 Téléchargement des navigateurs...'
                sh 'npx playwright install'
            }
        }
        
        stage('Test') {
            steps {
                echo '🚀 Lancement du Robot Playwright (Firefox uniquement)...'
                // On cible uniquement Firefox pour éviter le crash de Chromium
                sh 'npx playwright test --project=firefox'
            }
        }
    }
}