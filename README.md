# Laravel Quasar boilerplate
> Laravel 10 with Quasar v2 (Vue3, Vite, Pinia, i18n) for a Material Design SPA/PWA or Cordova Android/iOS app.

This boilerplate offers a quick start for building a Material Design (web)app with a UI powered by the [Quasar Framework](https://quasar.dev) combined with a [Laravel](https://laravel.com) backend.

## Installation
- setup a domain `example.com` (frontend) and `api.example.com` (backend)
- symlink `example.com` to Quasar generated UI folder: `ln -s Laravel-Quasar/dist/spa example.com/public_html`
- symlink `api.example.com` to Laravel public folder: `ln -s Laravel-Quasar/public api.example.com/public_html`
- copy `.env.example` to `.env` and update contents
- `composer install`
- `php artisan key:generate`
- `php artisan jwt:secret`
- `php artisan migrate`
- `npm install`
- `quasar dev` (local development) or `quasar build` (build on server)
