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
                
                // --- NOUVELLE ÉTAPE ---
                echo '🌍 Téléchargement des navigateurs...'
                // Cette commande télécharge Chrome, Firefox et Webkit
                // pour que Playwright puisse les utiliser.
                sh 'npx playwright install'
            }
        }
        
        stage('Test') {
            steps {
                echo '🚀 Lancement du Robot Playwright...'
                sh 'npx playwright test'
            }
        }
    }
}