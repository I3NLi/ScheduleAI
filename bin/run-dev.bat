cd ../laradock
docker compose up -d workspace apache2 redis mysql phpmyadmin laravel-echo-server

echo  PrivateSecretary Started,now you can open http://localhost to use it
REM 启动一个workspace内部命令行
start docker compose exec workspace bash
cd ..
REM 启动laravel mix自动编译
start npm run watch
REM 启动队列
cd laradock
Call docker compose exec workspace php artisan queue:work
