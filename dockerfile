FROM node:22-alpine

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . .

EXPOSE 3000
# This will change when the app is built for production
CMD ["sh", "-c", "npx prisma generate && npm run start:dev"]