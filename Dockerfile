FROM node:20-alpine
RUN apk upgrade --no-cache
WORKDIR /app
COPY package.json .
# npm/yarn are only needed to install dependencies; removing them keeps their bundled (CVE-prone)
# packages out of the runtime image. The app starts with plain `node`.
RUN npm install --omit=dev \
 && rm -rf /usr/local/lib/node_modules /usr/local/bin/npm /usr/local/bin/npx \
           /usr/local/bin/yarn /usr/local/bin/yarnpkg /opt/yarn-* /root/.npm
COPY server.js .
COPY public ./public
EXPOSE 3000
CMD ["node", "server.js"]
