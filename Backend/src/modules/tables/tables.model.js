const BaseModel = require('../../database/BaseModel');
const pool = require('../../database/connection');

class TablesModel extends BaseModel {
  constructor() {
    super('restaurant_tables');
  }

  async findAllWithZones() {
    const sql = `
      SELECT t.*, z.zone_name 
      FROM restaurant_tables t 
      JOIN table_zones z ON t.zone_id = z.id 
      WHERE t.deletedAt IS NULL
    `;
    const [rows] = await pool.execute(sql);
    return rows;
  }

  async getZones() {
    const [rows] = await pool.execute('SELECT * FROM table_zones WHERE deletedAt IS NULL');
    return rows;
  }
}

module.exports = new TablesModel();
