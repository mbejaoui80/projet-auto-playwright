pipeline {
    // Au lieu de 'any', on demande à Jenkins d'utiliser Docker
    agent {
        docker {
            // Cette image officielle de Microsoft contient TOUT ce qu'il faut :
            // Node.js, les navigateurs, et les fameuses librairies système.
            image 'mcr.microsoft.com/playwright:v1.40.0-jammy'
            
            // On réutilise l'espace de travail pour ne pas tout retélécharger à chaque fois
            reuseNode true 
        }
    }
    
    stages {
        stage('Installation') {
            steps {
                echo '📦 Installation des dépendances...'
                // Plus besoin de apt-get ou apk ! L'image est déjà prête.
                sh 'npm install'
            }
        }
        
        stage('Test') {
            steps {
                echo '🚀 Lancement du Robot Playwright...'
                // On lance les tests
                sh 'npx playwright test'
            }
        }
    }
}