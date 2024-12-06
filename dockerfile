FROM node:12.22.9

# Directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Al directorio de trabajo
COPY package*.json ./

# Instalamos las dependencias necesarias
RUN npm install

# Copiamos el resto del proyecto al contenedor
COPY . .

# Argumento para definir el puerto durante la construcción
ARG PORT=4000

# Variable de entorno para la aplicación
ENV PORT=${PORT}

# Exponemos el puerto
EXPOSE ${PORT}

# Definimos el comando para iniciar la aplicación
CMD ["npm", "run", "dev"]