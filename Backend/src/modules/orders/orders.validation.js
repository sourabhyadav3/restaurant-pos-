const Joi = require('joi');

const createOrderSchema = Joi.object({
  customer_id: Joi.number().integer().allow(null).optional(),
  table_id: Joi.number().integer().allow(null).optional(),
  order_type: Joi.string().valid('dine-in', 'takeaway', 'delivery').required(),
  subtotal: Joi.number().precision(2).required(),
  tax: Joi.number().precision(2).required(),
  discount: Joi.number().precision(2).default(0),
  grand_total: Joi.number().precision(2).required(),
  items: Joi.array().items(
    Joi.object({
      menu_item_id: Joi.number().integer().required(),
      quantity: Joi.number().integer().min(1).required(),
      unit_price: Joi.number().precision(2).required(),
      total_price: Joi.number().precision(2).required()
    })
  ).min(1).required()
});

const updateOrderStatusSchema = Joi.object({
  status: Joi.string().valid('new', 'pending', 'cooking', 'ready', 'delivered', 'cancelled').required()
});

module.exports = {
  createOrderSchema,
  updateOrderStatusSchema
};
