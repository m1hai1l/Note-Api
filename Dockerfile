FROM node
WORKDIR /app
ADD . .
RUN npm install
CMD [ "node", "./dist/main.js" ]
