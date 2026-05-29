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

# Etapa 2: Servidor Nginx
FROM nginx:alpine

# Copia as configurações do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia os arquivos gerados no build para a pasta pública do Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Expõe a porta padrão do Nginx (80)
EXPOSE 80

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
