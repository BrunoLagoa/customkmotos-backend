/* eslint-disable semi */
'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ProductSchema extends Schema {
  up () {
    this.create('products', table => {
      table.increments();

      table
        .integer('category_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('categories')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.string('name');
      table.string('size');
      table.decimal('price');
      table.timestamps();
    });
  }

  down () {
    this.drop('products');
  }
}

module.exports = ProductSchema;
