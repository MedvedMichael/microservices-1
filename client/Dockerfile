#build
FROM node:14.15-alpine as build
WORKDIR /app
COPY client/package.json ./
COPY client/yarn.lock ./
RUN yarn install
COPY client/. ./
RUN yarn build

#run
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
# COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]