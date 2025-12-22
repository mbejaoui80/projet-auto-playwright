pipeline {
    agent any
    
    tools {
        nodejs 'NodeJS-Auto'
    }
    
    stages {
        stage('Installation') {
            steps {
                echo '📦 Installation des dépendances...'
                // La librairie libatomic est maintenant installée dans le système !
                // npm devrait fonctionner directement.
                sh 'npm install'
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