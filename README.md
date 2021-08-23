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

3. create database YOUR_DATABASE name

example: CREATE DATABASE my_db CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

4. copy .env.example and paste to your root app directory and rename the duplicate file into ".env"

5. edit .env file

```
DB_DATABASE=YOUR_DATABASE
DB_USERNAME=YOUR_USER
DB_PASSWORD=YOUR_PASSWORD
```

example:

```
DB_DATABASE=my_db
DB_USERNAME=root
DB_PASSWORD=1234
```

6. add this code in .env file

```
MIX_APP_URL="${APP_URL}"
MIX_API_URL="${APP_URL}/api"
```

7. execute this command 

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


