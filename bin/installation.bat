npm --version
echo 如果npm未被安装，请前往 https://nodejs.org/en/ 安装nodejs
docker --version
echo 如果docker未被运行/安装，请前往 https://www.docker.com/get-docker 安装并运行
echo 确保上面两项符合条件，否则请关闭此窗口，待安装运行结束后再次执行
pause
cd ..
cp .env.example .env
cp laradock.env laradock/.env
npm install --no-bin-links
cd laradock
docker-compose up -d apache2 mongo
docker run -d -p 27017:27017 -v ./data://data/db --network laradock_backend --name laradock_mongo_1 mongo
docker-compose exec workspace bash
composer install
php artisan migrate --seed
