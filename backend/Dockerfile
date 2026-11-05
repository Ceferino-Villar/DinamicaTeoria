# 1. Usar una imagen oficial de Node.js ligera
FROM node:18-alpine

# 2. Crear el directorio de trabajo dentro del contenedor
WORKDIR /app

# 3. Copiar los archivos de dependencias
COPY package*.json ./

# 4. Instalar todas las dependencias
RUN npm install

# 5. Copiar el resto del código del backend
COPY . .

# 6. Exponer el puerto que usará el contenedor
EXPOSE 3001

# 7. Comando para iniciar la aplicación
CMD ["node", "index.js"]