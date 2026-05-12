const BaseModel = require('../../database/BaseModel');
const pool = require('../../database/connection');

class ReservationsModel extends BaseModel {
  constructor() {
    super('reservations');
  }

  async findWithGuestDetails(filters = {}) {
    let sql = `
      SELECT r.*, g.full_name, g.phone, g.email 
      FROM reservations r 
      JOIN guests g ON r.guest_id = g.id 
      WHERE r.deletedAt IS NULL
    `;
    const params = [];

    if (filters.status) {
      sql += ` AND r.reservation_status = ?`;
      params.push(filters.status);
    }

    if (filters.date) {
      sql += ` AND r.booking_date = ?`;
      params.push(filters.date);
    }

    const [rows] = await pool.execute(sql, params);
    return rows;
  }
}

module.exports = new ReservationsModel();
