FROM node:16-alpine
 
WORKDIR /user/src/app
 
COPY . .
 
RUN npm install
 
RUN npm run build
 
USER node
 
CMD ["npm", "run", "start:prod"]