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
EXPOSE 3000
CMD ["node", "./src/index.js"]
