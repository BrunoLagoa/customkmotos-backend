/* eslint-disable semi */
'use strict';

const Card = use('App/Models/Card');
const Mail = use('Mail');

class CheckoutController {
  async index ({ request, response, auth }) {
    try {
      var total = 0;

      const cards = await Card.query()
        .where('user_id', auth.user.id)
        .where('opened', true)
        .with('user')
        .with('product.category')
        .fetch();

      // Se o carrinho estive vazio
      if (!cards.toJSON().length) {
        return response
          .status(201)
          .send({ error: { message: 'O carrinho está vazio.' } });
      }

      await cards.toJSON().map(card => {
        total = total + card.product.price * card.amount;
      });

      // Enviando orçamento
      await Mail.send(
        ['emails.checkout'],
        {
          cards: cards.toJSON(),
          email: auth.user.email,
          name: auth.user.username,
          total: total
        },
        message => {
          message
            .to(auth.user.email)
            .from('contato@customkmotors.com.br', 'Custom K Motors')
            .subject('Solicitação de orçamento');
        }
      );

      // await Card.query()
      //   .where('user_id', auth.user.id)
      //   .update({ opened: false });

      return cards;
    } catch (error) {
      return response
        .status(error.status)
        .send({ error: { message: 'Erro ao finalizar carrinho.' } });
    }
  }
}

module.exports = CheckoutController;
