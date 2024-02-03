FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

COPY start.sh .
RUN chmod +x start.sh

EXPOSE 4000

CMD ["npm", "run", "start:prod"]
