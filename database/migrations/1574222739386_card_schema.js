/* eslint-disable semi */
'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class CardSchema extends Schema {
  up () {
    this.create('cards', table => {
      table.increments();

      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .integer('product_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('products')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.integer('amount').defaultTo(0);
      table
        .boolean('opened')
        .notNullable()
        .defaultTo(1);

      table.timestamps();
    });
  }

  down () {
    this.drop('cards');
  }
}

module.exports = CardSchema;
