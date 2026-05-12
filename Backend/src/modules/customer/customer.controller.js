const pool = require('../../database/connection');
const { sendSuccess, sendError } = require('../../utils/response.formatter');

class CustomerController {
  async getFavorites(req, res) {
    try {
      const customerId = req.user.id;
      const [rows] = await pool.execute(`
        SELECT f.*, mi.item_name, mi.price, mi.image, mi.description
        FROM favorites f
        JOIN menu_items mi ON f.menu_item_id = mi.id
        WHERE f.customer_id = ? AND f.deletedAt IS NULL
      `, [customerId]);
      
      return sendSuccess(res, 'Favorites fetched successfully', rows);
    } catch (err) {
      return sendError(res, err.message);
    }
  }

  async toggleFavorite(req, res) {
    try {
      const { itemId } = req.body;
      const userId = req.user.id;

      const [existing] = await pool.execute(
        'SELECT * FROM favorites WHERE customer_id = ? AND menu_item_id = ?',
        [userId, itemId]
      );

      if (existing.length > 0) {
        await pool.execute(
          'DELETE FROM favorites WHERE customer_id = ? AND menu_item_id = ?',
          [userId, itemId]
        );
        return sendSuccess(res, 'Removed from favorites');
      } else {
        await pool.execute(
          'INSERT INTO favorites (customer_id, menu_item_id) VALUES (?, ?)',
          [userId, itemId]
        );
        return sendSuccess(res, 'Added to favorites');
      }
    } catch (err) {
      return sendError(res, err.message);
    }
  }
}

module.exports = new CustomerController();
