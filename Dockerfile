FROM node:8

ENV TZ Europe/Moscow

RUN mkdir -p /usr/src/WebX

WORKDIR /usr/src/WebX

RUN npm install -g nodemon

COPY package.json /usr/src/WebX/
#RUN npm install

COPY . /usr/src/WebX
#RUN ["npm", "build"]
#RUN chmod +x -R ./node_modules/.bin
#RUN chmod +x ./node_modules/nrun/bin/nrun.jsRUN date

EXPOSE 3000
CMD npm run watch-js