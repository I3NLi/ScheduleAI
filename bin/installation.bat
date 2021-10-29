call stop
cd ..
copy .env.example .env
copy laradock.env laradock\.env
call npm install
cd laradock
docker compose up up -d workspace apache2 redis mysql phpmyadmin laravel-echo-server
call docker compose exec workspace composer install
call docker compose exec workspace php artisan migrate --seed
cd ../bin
call stop
echo The installation is complete and continues to start or exit directly
pause
start docker compose exec workspace bash
cd ..
start npm run watch
