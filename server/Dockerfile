FROM node:20

WORKDIR /server

COPY package*.json pnpm-lock.yaml* ./

RUN npm install -g pnpm && \
    pnpm install

COPY . .

CMD [ "pnpm", "dev" ]
