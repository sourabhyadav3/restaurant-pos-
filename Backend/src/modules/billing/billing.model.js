const BaseModel = require('../../database/BaseModel');
const pool = require('../../database/connection');

class BillingModel extends BaseModel {
  constructor() {
    super('guest_billing');
  }

  async findWithGuestDetails() {
    const sql = `
      SELECT b.*, g.full_name, g.phone 
      FROM guest_billing b 
      JOIN guests g ON b.guest_id = g.id 
      WHERE b.deletedAt IS NULL
    `;
    const [rows] = await pool.execute(sql);
    return rows;
  }

  async createSettlement(data) {
    const { billing_id, payment_method, settled_amount, settled_by } = data;
    const sql = `
      INSERT INTO settlements (billing_id, payment_method, settled_amount, settled_by) 
      VALUES (?, ?, ?, ?)
    `;
    const [result] = await pool.execute(sql, [billing_id, payment_method, settled_amount, settled_by]);
    return result.insertId;
  }
}

module.exports = new BillingModel();
