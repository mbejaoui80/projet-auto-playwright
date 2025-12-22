pipeline {
    agent any
    
    tools {
        // On utilise l'outil Node qu'on a configuré
        nodejs 'NodeJS-Auto'
    }
    
    stages {
        stage('Installation') {
            steps {
                echo '📦 Installation des dépendances...'
                
                // --- CORRECTIF ---
                // Installation de la librairie système manquante pour Alpine Linux
                // Cela permet à npm de fonctionner correctement
                sh 'apk add --no-cache libatomic'
                
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