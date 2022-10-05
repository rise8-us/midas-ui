FROM registry1.dso.mil/ironbank/opensource/nodejs/nodejs16:16.17.1 AS builder

USER root

WORKDIR /app

COPY . .

RUN yarn build

USER node

# Stage 2
FROM registry1.dso.mil/ironbank/opensource/nginx/nginx:1.23.1

USER root

# CSP
COPY --from=builder /app/nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/nginx/nginx-security.conf /etc/nginx/snippets/nginx-security.conf

# Build pkg
COPY --from=builder /app/build/ /var/www

# Required to run the CMD
COPY --from=builder /app/scripts/ /app/scripts/

EXPOSE 80

CMD [ "sh", "/app/scripts/docker_run.sh", "/var/www/config.js"]