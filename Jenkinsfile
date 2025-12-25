pipeline {
    agent any
    
    // On force le nettoyage des variables Docker qui pourraient venir des plugins
    environment {
        DOCKER_TLS_VERIFY = ''
        DOCKER_HOST = ''
    }

    stages {
        stage('Enquête Technique') {
            steps {
                echo '🕵️‍♂️ [1] QUI SUIS-JE ?'
                // On vérifie si Jenkins tourne vraiment en Root ou s'il est repassé en utilisateur standard
                sh 'whoami'
                sh 'id'

                echo '🕵️‍♂️ [2] INSPECTION DU SOCKET'
                // On regarde si le fichier existe et quels sont ses droits (rwx)
                sh 'ls -lh /var/run/docker.sock'

                echo '🕵️‍♂️ [3] VARIABLES D\'ENVIRONNEMENT'
                // On regarde si une config cachée essaie de forcer une autre adresse
                sh 'env | grep DOCKER || true'

                echo '🕵️‍♂️ [4] TEST FINAL'
                // On tente la commande fatidique
                sh 'docker ps'
            }
        }
    }
}