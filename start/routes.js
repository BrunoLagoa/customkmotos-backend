/* eslint-disable semi */
'use strict';

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.post('users', 'UserController.store');
Route.post('sessions', 'SessionController.store');

Route.post('passwords', 'ForgotPasswordController.store');
Route.put('passwords', 'ForgotPasswordController.update');

Route.get('/files/:id', 'FileController.show');
Route.post('/files', 'FileController.store');

Route.get('profiles', 'ProfileController.index').middleware(['auth']);
Route.put('profiles', 'ProfileController.update').middleware(['auth']);

Route.get('categories', 'CategoryController.index').middleware(['auth']);
Route.post('categories', 'CategoryController.store').middleware(['auth']);
Route.put('categories/:id', 'CategoryController.update').middleware(['auth']);

Route.get('products', 'ProductController.index').middleware(['auth']);
Route.post('products', 'ProductController.store').middleware(['auth']);
Route.put('products/:id', 'ProductController.update').middleware(['auth']);

Route.get('cards', 'CardController.index').middleware(['auth']);
Route.post('cards', 'CardController.store').middleware(['auth']);
Route.put('cards/:id', 'CardController.update').middleware(['auth']);

Route.get('checkouts', 'CheckoutController.index').middleware(['auth']);
