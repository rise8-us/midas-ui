FROM registry.il2.dso.mil/platform-one/devops/pipeline-templates/ironbank/nodejs14:14.15.5 AS builder

USER root

WORKDIR /app

COPY . .

RUN yarn install --frozen--lockfile --prod

RUN yarn build

# Stage 2
FROM registry.il2.dso.mil/platform-one/devops/pipeline-templates/base-image/harden-nginx-19:1.19.6

USER appuser

COPY --from=builder --chown=appuser:appuser /app/build/ /var/www

EXPOSE 8080

CMD [ "nginx", "-g", "daemon off;" ]
