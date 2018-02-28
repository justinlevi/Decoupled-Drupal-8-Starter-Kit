#!/usr/bin/env bash

../docroot/themes/contrib/cog/STARTERKIT/install-node.sh 8.9.1 &&
source ~/.bashrc  &&
nvm use --delete-prefix 8.9.1 &&
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" && nvm use 8.9.1 && npm install