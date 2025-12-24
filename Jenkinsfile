pipeline {
    agent {
        dockerfile {
            filename 'Dockerfile'
            // On connecte le socket Docker pour que ça marche
            args '-u root:root -v /var/run/docker.sock:/var/run/docker.sock'
        }
    }
    
    // SUPPRESSION DE LA SECTION 'tools' : Node est déjà dans l'image !
    
    stages {
        stage('Installation & Test') {
            steps {
                echo '🚀 Démarrage dans le conteneur personnalisé...'
                
                // Vérification de la version (pour être sûr)
                sh 'node -v'
                
                echo '📦 Installation des dépendances...'
                sh 'npm install'
                
                echo '🧪 Lancement des tests E2E sur SwagLabs...'
                // Le test complet !
                sh 'npx playwright test'
            }
        }
    }
}