cd ..
copy .env.example .env
copy laradock.env laradock\.env
call npm install --no-bin-links
cd laradock
docker-compose up -d apache2 mongo
docker run -d -p 27017:27017 -v ./data://data/db --network laradock_backend --name laradock_mongo_1 mongo
call docker-compose exec workspace composer install
call docker-compose exec workspace php artisan migrate --seed
