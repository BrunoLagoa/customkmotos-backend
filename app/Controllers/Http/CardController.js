/* eslint-disable quotes */
"use strict"

const Card = use("App/Models/Card")

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with cards
 */
class CardController {
  /**
   * Show a list of all cards.
   * GET cards
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view, auth }) {
    const cards = await Card.query()
      .where("user_id", auth.user.id)
      .where("opened", true)
      .with("user")
      .with("product.category")
      .fetch()

    return cards
  }

  /**
   * Render a form to be used for creating a new card.
   * GET cards/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {}

  /**
   * Create/save a new card.
   * POST cards
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    try {
      const data = request.only(["product_id", "amount"])

      var card = await Card.query()
        .where("user_id", auth.user.id)
        .where("product_id", data.product_id)
        .where("opened", true)
        .with("user")
        .with("product.category")
        .first()

      if (card) {
        const amount = card.amount + data.amount
        card.merge({ amount: amount })
        await card.save()

        return card
      }

      card = Card.create({
        ...data,
        user_id: auth.user.id
      })

      return card
    } catch (error) {
      return response
        .status(error.status)
        .send({ error: { message: "Erro ao criar carrinho." } })
    }
  }

  /**
   * Display a single card.
   * GET cards/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {}

  /**
   * Render a form to update an existing card.
   * GET cards/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {}

  /**
   * Update card details.
   * PUT or PATCH cards/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {}

  /**
   * Delete a card with id.
   * DELETE cards/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {}
}

module.exports = CardController
