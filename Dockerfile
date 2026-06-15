# Etapa 1: Build da aplicação
FROM node:20-alpine AS builder

WORKDIR /app

# Copia os arquivos de dependência
COPY package*.json ./
RUN npm ci

# Copia o restante do código
COPY . .

# Faz o build do front-end Vite
RUN npm run build

# Etapa 2: Servidor Node.js
FROM node:20-alpine

WORKDIR /app

# Copia os arquivos de dependência
COPY package*.json ./

# Instala as dependências de produção (e dotenv para o server.js)
RUN npm ci --omit=dev && npm install dotenv

# Copia o servidor e a build gerada
COPY server.js ./
COPY --from=builder /app/dist ./dist

# Expõe a porta que o Node vai usar
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["node", "server.js"]
