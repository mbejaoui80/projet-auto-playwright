# 1. On part de l'image officielle Playwright
# Elle contient DÉJÀ : Node.js, Linux, et toutes les librairies graphiques (GTK, etc.)
FROM mcr.microsoft.com/playwright:v1.40.0-jammy

# 2. Informations sur le mainteneur (Optionnel, c'est pour faire pro)
LABEL maintainer="MBE <mohamed.bejaoui@hotmail.fr>"

# 3. On définit le dossier de travail à l'intérieur du conteneur
WORKDIR /app

# 4. (Astuce d'Expert) On copie les fichiers de dépendances d'abord
# Cela permet à Docker de mettre en cache l'installation si le code change mais pas les dépendances
COPY package*.json ./

# 5. On installe les paquets NPM du projet
RUN npm install

# 6. On copie le reste du projet
COPY . .

# 7. Commande par défaut (si on lance le conteneur sans rien dire)
CMD ["npx", "playwright", "test"]