pipeline {
    agent any
    
    tools {
        nodejs 'NodeJS-Auto'
    }
    
    stages {
        stage('Installation') {
            steps {
                echo '📦 Installation des dépendances...'
                
                // --- CORRECTIF V2 ---
                // "apk" n'existe pas, on tente "apt-get" (pour Debian/Ubuntu)
                // On met à jour la liste (update) et on installe libatomic1
                sh 'apt-get update && apt-get install -y libatomic1'
                
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