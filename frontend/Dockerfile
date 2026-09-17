FROM node:20-alpine AS base

RUN apk add --no-cache libc6-compat openssl

WORKDIR /app

COPY package.json package-lock.json* ./

FROM base AS development

ENV NODE_ENV=development

COPY . .

RUN npm install && chown -R node:node /app

USER node

EXPOSE 3000

CMD ["npm", "run", "dev"]