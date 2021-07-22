#!/bin/bash

CONFIG_LOCATION=${1:-/usr/share/nginx/html/config.js}

\cp -a ${CONFIG_LOCATION}.template ${CONFIG_LOCATION}
sed -i -e "s#SED_REACT_APP_API_URL#${REACT_APP_API_URL}#" ${CONFIG_LOCATION}

/usr/sbin/nginx -g "daemon off;"

