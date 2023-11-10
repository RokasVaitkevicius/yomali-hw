FROM node:20

WORKDIR /client-website

RUN npm install http-server -g

COPY . .

CMD [ "http-server", ".", "-p", "3001" ]
