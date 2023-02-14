# Fase I: Construcción
FROM node:10 as build

WORKDIR /app

# Instalar dependencias
COPY package.json package-lock.json ./
RUN npm install

# Copiar el resto del código y construir proyecto
COPY src src
COPY public public
RUN npm run build

# Fase II: Ejecución
FROM nginx:1.16-alpine

# Copiar distribuible a directorio configurado en nginx
COPY --from=build /app/build /www

# Copiar template de configuración de servidor web Nginx
COPY site.conf  /etc/nginx/conf.d/default.conf

EXPOSE 5000
