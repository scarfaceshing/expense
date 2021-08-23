### Expense Management
 Exam

# Requirements
Php
Composer
nodejs
mariadb or mysql
git bash

# Setup

1. git clone https://github.com/scarfaceshing/expense.git

2. execute this command 
```
composer install
npm install
```

3. create database {YOUR_DATABASE} name

4. edit .env file

```
DB_DATABASE={YOUR_DATABASE}
DB_USERNAME={YOUR_USER}
DB_PASSWORD={YOUR_PASSWORD}
```

5. add this in .env file

```
MIX_APP_URL="${APP_URL}"
MIX_API_URL="${APP_URL}/api"
```

6. execute this command 

```
php artisan jwt:secret
```

```
php artisan migrate
php artisan db:seed
```

# TO RUN THIS APP
```
npm run all
```


