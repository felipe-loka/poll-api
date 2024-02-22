FROM node:20-alpine as build

WORKDIR /app
COPY package.json ./
RUN npm install pnpm -g
RUN pnpm install
COPY . .
RUN pnpm build


FROM node:20-alpine as runner

WORKDIR /app
COPY package.json ./
RUN npm install pnpm -g
RUN pnpm install --prod
COPY --from=build /app/dist ./
COPY src/config/database/migrations ./src/config/database/migrations
EXPOSE 3000
CMD ["node", "--require", "./src/config/instrumentation.js", "./src/index.js"]
