FROM node:8
RUN mkdir -p /usr/src/WebX

WORKDIR /usr/src/WebX

RUN ls -la
RUN npm install -g nodemon

COPY package.json /usr/src/WebX/
RUN npm install

COPY . /usr/src/WebX

EXPOSE 3000
CMD ["nodemon", "app.js"]
