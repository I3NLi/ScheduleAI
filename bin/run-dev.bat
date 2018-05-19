cd ../laradock
docker-compose up -d apache2 mongo
docker container rm laradock_mongo_1
docker run -d -p 27017:27017 -v ./data://data/db --network laradock_backend --name laradock_mongo_1 mongo
cd ..
npm run watch
