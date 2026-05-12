const BaseModel = require('../../database/BaseModel');
const pool = require('../../database/connection');

class TablesModel extends BaseModel {
  constructor() {
    super('restaurant_tables');
  }

  async findAllWithZones() {
    const sql = `
      SELECT t.*, z.zone_name, o.id as active_order_id, o.grand_total as total, o.createdAt as session_start
      FROM restaurant_tables t 
      JOIN table_zones z ON t.zone_id = z.id 
      LEFT JOIN orders o ON t.id = o.table_id AND o.payment_status = 'pending' AND o.deletedAt IS NULL
      WHERE t.deletedAt IS NULL
    `;
    const [rows] = await pool.execute(sql);
    
    // For each table with an active order, fetch items
    for (let table of rows) {
      if (table.active_order_id) {
        const [items] = await pool.execute(`
          SELECT oi.quantity, oi.unit_price as price, mi.item_name as name, oi.kitchen_status as status
          FROM order_items oi
          JOIN menu_items mi ON oi.menu_item_id = mi.id
          WHERE oi.order_id = ? AND oi.deletedAt IS NULL
        `, [table.active_order_id]);
        table.orders = items;
      } else {
        table.orders = [];
      }
    }
    
    return rows;
  }

  async getZones() {
    const [rows] = await pool.execute('SELECT * FROM table_zones WHERE deletedAt IS NULL');
    return rows;
  }
}

module.exports = new TablesModel();
