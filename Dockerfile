# imagem do node
FROM node

# definimos a pasta e copiamos o arquivo
WORKDIR /usr/app
COPY . ./

# Instalamos as dependencias
RUN yarn

# a posta que sera usada
EXPOSE 3333

# executar a aplicação
CMD yarn start