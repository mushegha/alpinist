FROM node:latest

# Create app directory
WORKDIR /usr/src/app

RUN npm install pm2 -g

# Install app dependencies
COPY package*.json ./

RUN npm install --production

# Bundle app source
COPY . .

CMD ["pm2-runtime", "ecosystem.json"]
