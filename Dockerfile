# Stage development 
FROM node:16.20.2 as development
WORKDIR /usr/src/app
COPY package*.json . 
RUN npm install 
COPY . . 
RUN npm run build
RUN npm run build:microservice

# Stage production
FROM node:16.20.2 as production
ARG  NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production
COPY . . 
COPY --from=development /usr/src/app/dist ./dist
RUN npm install pm2 -g
CMD ["pm2-runtime", "start", "ecosystem.config.js"]
