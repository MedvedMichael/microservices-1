FROM node:14.15-alpine
EXPOSE 8080
COPY services/service1/index.js .
COPY services/service1/package.json ./
COPY services/service1/yarn.lock ./
RUN yarn install
CMD [ "yarn", "start" ]