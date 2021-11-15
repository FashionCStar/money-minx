FROM node:10-alpine
WORKDIR /app
COPY . /app
RUN yarn
CMD yarn start
EXPOSE 3000 