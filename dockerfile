FROM node:22-alpine AS base

ENV DIR=/usr/src/app
WORKDIR $DIR
ARG NPM_TOKEN
ARG PORT

FROM base AS dev

ENV NODE_ENV=development
ENV CI=true

COPY package.json package-lock.json ./
RUN npm install

COPY prisma ./prisma
COPY prisma.config.ts ./

COPY tsconfig.json ./

COPY src ./src

EXPOSE $PORT
# This will change when the app is built for production
CMD ["sh", "-c", "npx prisma generate && npm run start:dev"]