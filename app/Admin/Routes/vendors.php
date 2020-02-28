<?php
$router->group(['prefix' => 'vendors'], function ($router) {
    $router->get('/', 'VendorsController@index')->name('admin_vendors.index');
});
