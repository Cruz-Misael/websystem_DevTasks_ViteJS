# =========================
# Stage 1: Build
# =========================
FROM node:20-alpine AS build

WORKDIR /app

# Copia dependências primeiro (melhor cache)
COPY package*.json ./
RUN npm install

# Copia o resto da aplicação
COPY . .

# Build da aplicação
RUN npm run build


# =========================
# Stage 2: Runtime
# =========================
FROM nginx:alpine

# Remove config padrão do nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copia nossa build para o nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Configuração básica do nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
