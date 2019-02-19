#!/usr/bin/env sh

# abort on errors
set -e

# build
yarn build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
echo 'scan.covenantsql.io' > CNAME

git init
git add -A
git commit -m 'ship: deployment'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f https://github.com/CovenantSQL/covenant-scan.git master:gh-pages


cd -