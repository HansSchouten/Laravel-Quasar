# Laravel Quasar boilerplate
> Laravel 10 with Quasar v2 (Vue3, Vite, Pinia, i18n) for a Material Design SPA/PWA or Cordova Android/iOS app.

This boilerplate offers a quick start for building a Material Design (web)app with a UI powered by the [Quasar Framework](https://quasar.dev/introduction-to-quasar#what-is-quasar) combined with a [Laravel](https://laravel.com) backend.

## Installation
### Project setup
- copy `.env.example` to `.env` and update contents
- `composer install`
- `php artisan key:generate`
- `php artisan jwt:secret`
- `php artisan migrate`
- `npm install`
- `npm i -g @quasar/cli`
- `quasar dev` (local development) or `quasar build` (build on server)

### Link domain
- setup a domain `example.com` (frontend) and `api.example.com` (backend)
- symlink `example.com` to the Quasar generated UI folder:
```bash
cd example.com
rm -rf public_html
ln -s ../Laravel-Quasar/dist/spa public_html
```
- symlink `api.example.com` to the Laravel entrypoint:
```bash
 cd api.example.com
 rm -rf public_html
 ln -s ../Laravel-Quasar/public-api public_html
```
---
![Login screen](https://github.com/HansSchouten/Laravel-Quasar/assets/5946444/96939012-309c-4817-a124-0f26e24f627e)

![Profile settings](https://github.com/HansSchouten/Laravel-Quasar/assets/5946444/3596f142-5ee1-40e4-834b-8e319a62fd1f)
