FROM node:20

WORKDIR /dashboard

COPY package*.json pnpm-lock.yaml* ./

RUN npm install -g pnpm && \
    pnpm install

COPY . .

CMD ["pnpm", "start"]
