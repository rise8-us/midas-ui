#!/usr/bin/env bash

set -e

yarn install
yarn build:local

pushd server

rm -rf node_modules
zip -r ../react-app-frontend.zip *
rm -rf build

popd

echo "artifact_path: $(pwd)/react-app-frontend.zip"