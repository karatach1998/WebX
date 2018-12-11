FROM node:8
RUN mkdir -p /usr/src/WebX

WORKDIR /usr/src/WebX

RUN npm install -g nodemon

COPY package.json /usr/src/WebX/
RUN npm install

COPY . /usr/src/WebX

RUN pwd
RUN ls -la .

EXPOSE 3000
CMD ["nodemon", "app.js"]
