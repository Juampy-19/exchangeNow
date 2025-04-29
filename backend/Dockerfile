# Imagen base
FROM node:20

# Directorio de trabajo en el contenedor
WORKDIR /app

# Archivos necesarios para instalar dependencias
COPY package*.json ./

# Instalación de dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Exponer el puerto
EXPOSE 10000

# Comando para iniciar la app
CMD ["npm", "start"]
