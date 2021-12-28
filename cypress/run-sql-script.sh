#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

if [ -z ${RDS_HOSTNAME+x} ]; then
    HOST='0.0.0.0'
else
    HOST="${RDS_HOSTNAME}"
fi

mysql -u localDBUser --password=localDBPassword  -h ${HOST} -D midas_db  < ${DIR}/$1