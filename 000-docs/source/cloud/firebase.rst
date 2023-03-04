Cloud - Firebase
#################

https://firebase.google.com/docs/cli#update-cli
https://firebase.google.com/docs/hosting/cloud-run#write

install:

npm install -g firebase-tools
https://firebase.tools/bin/win/instant/latest
curl -sL https://firebase.tools | upgrade=true bash

local test:
firebase serve --only hosting

Deploy:
firebase deploy -m "Deploying the best new feature ever."
