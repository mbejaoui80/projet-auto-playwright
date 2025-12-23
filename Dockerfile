# On utilise l'image officielle de Microsoft (contient Node.js + Navigateurs)
# "jammy" correspond à la version Linux Ubuntu stable recommandée
FROM mcr.microsoft.com/playwright:v1.49.0-jammy

# Définition du dossier de travail dans le conteneur
WORKDIR /app

# On copie d'abord les fichiers de dépendances (optimisation du cache Docker)
COPY package.json package-lock.json ./

# On installe les dépendances (npm ci est plus sûr que npm install pour le CI/CD)
RUN npm ci

# On copie tout le reste du code
COPY . .

# Commande par défaut : lancer les tests
CMD ["npx", "playwright", "test"]