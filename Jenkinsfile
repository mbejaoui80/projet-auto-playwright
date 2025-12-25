pipeline {
    agent any
    
    environment {
        // On force Docker à utiliser l'ancien constructeur (pour éviter l'erreur "exec format error")
        DOCKER_BUILDKIT = '0'
    }

    stages {
        stage('Vérification') {
            steps {
                echo '🔍 Vérification de la connexion Docker...'
                // On teste si Jenkins arrive enfin à voir Docker depuis le script
                sh 'docker ps'
                sh 'docker version'
            }
        }

        stage('Construction & Test') {
            steps {
                echo '🔨 Construction de l\'image...'
                // Astuce PRO : On utilise "tar" pour envoyer les fichiers au moteur Docker
                // Cela contourne le problème de chemins entre Windows et Linux
                sh 'tar -czh . | docker build -t mon-image-playwright -'
                
                echo '🚀 Lancement des Tests...'
                // On lance le conteneur qu'on vient de créer pour jouer les tests
                // --ipc=host est nécessaire pour que Chrome ne crash pas
                sh 'docker run --rm --ipc=host mon-image-playwright npx playwright test'
            }
        }
    }
}