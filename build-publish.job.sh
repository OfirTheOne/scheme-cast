echo "Clean current build"
rm -rf ./dist-prod

echo "Build process"
npm run build-prod
cp package.json ./dist-prod/package.json
cp README.md    ./dist-prod/README.md

echo "confirm please"
sudo echo ""

echo "Publish process"
npm publish ./dist-prod
