FROM node:latest

RUN apt-get update && \
    apt-get install -y docker.io

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

COPY start.sh .
RUN chmod +x start.sh

EXPOSE 4000

CMD ["npm", "run", "bash"]
