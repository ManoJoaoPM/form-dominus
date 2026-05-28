FROM node:20-alpine

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependência
COPY package*.json ./

# Instala as dependências (incluindo as de desenvolvimento necessárias pro build)
RUN npm install

# Copia o restante do código
COPY . .

# Faz o build do front-end Vite
RUN npm run build

# Expõe a porta que o Easypanel usará
EXPOSE 3000

# Comando para iniciar o servidor Node.js
CMD ["node", "server.js"]
