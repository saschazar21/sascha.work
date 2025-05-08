#!/bin/bash

set -eux

GOOS=linux
GOARCH=amd64
GO111MODULE=on

# Parse author name and email from package.json
AUTHOR=$(jq -r '.author.name' package.json)
EMAIL=$(jq -r '.author.email' package.json)
if [[ -z $AUTHOR || -z $EMAIL ]]; then
  echo "Author name or email not found in package.json"
  exit 1
fi
TITLE=$(jq -r '.title' package.json)

SHORT_SHA=${SHORT_SHA:-$(git rev-parse --short HEAD)}
URL=$URL
if [[ $CONTEXT != "production" ]]; then
  # replace "https://0--"" of the DEPLOY_URL with "https://$SHORT_SHA--"
  URL=$(echo $DEPLOY_URL | sed "s|https://0--|https://$SHORT_SHA--|")
fi

if [[ -d "$(pwd)/cmd" ]]; then

  GOBIN=$(PWD)/functions go get ./...

  if [[ -z ./functions ]]; then
    # create output directory
    mkdir -p functions;
  fi

  for v in $(pwd)/cmd/*; do
    for n in $v/*; do
      # strip trailing slash
      v=${v%*/}
      n=${n%*/}

      # extract directory name
      v=${v##*/}
      n=${n##*/}

      # build binary
      CGO_ENABLED=0 go build \
        -ldflags "-X 'github.com/saschazar21/sascha.work/api/${v}/utils.URL=$URL' -X 'github.com/saschazar21/sascha.work/api/${v}/utils.AUTHOR=$AUTHOR' -X 'github.com/saschazar21/sascha.work/api/${v}/utils.EMAIL=$EMAIL' -X 'github.com/saschazar21/sascha.work/api/${v}/utils.TITLE=$TITLE'" \
        -o $(pwd)/functions/${v}_${n} \
        $(pwd)/cmd/$v/$n;
    done
  done
  
fi