FROM node:20 as builder
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm run build

FROM nginx:stable-alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
