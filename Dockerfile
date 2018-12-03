FROM node:8
RUN mkdir -p /usr/src/WebX

WORKDIR /usr/src/WebX

RUN npm install -g nodemon

COPY package.json /usr/src/WebX/
#RUN npm install

COPY . /usr/src/WebX
#RUN ["npm", "build"]
#RUN chmod +x -R ./node_modules/.bin
#RUN chmod +x ./node_modules/nrun/bin/nrun.js

EXPOSE 3000
CMD npm run watch