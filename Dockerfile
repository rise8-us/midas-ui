FROM registry.il2.dso.mil/platform-one/devops/pipeline-templates/ironbank/nodejs14:14.16.1 AS builder

USER root

WORKDIR /app

COPY . .

RUN yarn install --frozen-lockfile && yarn build

USER node

# Stage 2
FROM registry.il2.dso.mil/platform-one/devops/pipeline-templates/base-image/harden-nginx-20:1.20.1

USER appuser

# CSP
COPY --from=builder --chown=appuser:appuser /app/nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder --chown=appuser:appuser /app/nginx/nginx-security.conf /etc/nginx/snippets/nginx-security.conf

# Build pkg
COPY --from=builder --chown=appuser:appuser /app/build/ /var/www

# Required to run the CMD
COPY --from=builder /app/scripts/ /app/scripts/
COPY --from=builder /usr/bin/cp /usr/bin/cp

EXPOSE 80

CMD [ "sh", "/app/scripts/docker_run.sh", "/var/www/config.js" ]