/* eslint-disable semi */
'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Card extends Model {
  user () {
    return this.belongsTo('App/Models/User');
  }

  product () {
    return this.belongsTo('App/Models/Product', 'product_id', 'id');
  }
}

module.exports = Card;
