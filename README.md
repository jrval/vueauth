<p align="center"><img src="https://res.cloudinary.com/dtfbvvkyp/image/upload/v1566331377/laravel-logolockup-cmyk-red.svg" width="400">
<img src="https://miro.medium.com/max/2000/1*7l-0fZaZ-t8SZZrKKrZSNQ.png" width="200">
</p>


## VUE JS  Authentication [SPA] with Laravel Passport, Roles and Permissions template

This is a complete VUE JS user management with laravel passport auth, roles and permissions. This will help for the project starters that needs to have a complete user management template.

<img src="https://imagizer.imageshack.com/v2/640x480q90/923/piFoCD.png">
<img src="https://imagizer.imageshack.com/v2/640x480q90/922/x3Tc8w.png">
<img src="https://imagizer.imageshack.com/v2/640x480q90/921/CFcx53.png">
<img src="https://imagizer.imageshack.com/v2/640x480q90/924/YeIs1y.png">
<img src="https://imagizer.imageshack.com/v2/640x480q90/922/awNaeQ.png">



Below is the step by step installation. Please follow it correctly. 

## How to install
*  clone this project
*  `composer install`
*  `npm install`
*  `cp .env.example .env`
*  change database in the .env
    <br>

```DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=db_name
    DB_USERNAME=root
    DB_PASSWORD=db_password
```
*  `php artisan migrate`
*  `php artisan db:seed`
*  `php artisan passport:install`
*  copy the generated api key appeared in the console and paste it in the .env

*for example below:*
```
    PASSPORT_LOGIN_ENDPOINT= ${APP_URL}api/oauth/token
    PASSPORT_CLIENT_ID= 2
    PASSPORT_CLIENT_SECRET=HESFAK1QMOCsWumoMoF837MFpbTU44xplN6hkcDw
```
* **(important)** change the  `APP_URL`  in the .env.

    *for example* : 
    ```
    APP_URL=http://localhost/vueauth/
    ```
*  Also add this to your .env ,this function is to encrypted the user roles and permissions in the client browser side. To avoid data manipulation.
    ```
    MIX_CRYPTO_JS_PASSPHRASE=any_passphrase
    ```
*  Lastly do `npm run dev`
*  default user creds
```
username:admin
password:password
```
    
 