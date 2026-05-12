const pool = require('../../database/connection');

class ServiceRepository {
  async getAllServices() {
    const [rows] = await pool.query('SELECT * FROM services WHERE deletedAt IS NULL');
    return rows;
  }

  async getAllBookings() {
    const sql = `
      SELECT b.*, s.service_name, s.service_type, g.full_name as guest_name
      FROM service_bookings b
      JOIN services s ON b.service_id = s.id
      JOIN guests g ON b.guest_id = g.id
      WHERE b.deletedAt IS NULL
      ORDER BY b.createdAt DESC
    `;
    const [rows] = await pool.query(sql);
    return rows;
  }

  async updateBookingStatus(id, status) {
    const [result] = await pool.query(
      'UPDATE service_bookings SET booking_status = ? WHERE id = ?',
      [status, id]
    );
    return result.affectedRows > 0;
  }

  async createService(data) {
    const { service_name, service_type, description, price_per_person } = data;
    const [result] = await pool.query(
      'INSERT INTO services (service_name, service_type, description, price_per_person) VALUES (?, ?, ?, ?)',
      [service_name, service_type, description, price_per_person]
    );
    return result.insertId;
  }

  async createBooking(data) {
    const { service_id, guest_id, booking_date, booking_time, total_guests, total_amount } = data;
    const [result] = await pool.query(
      'INSERT INTO service_bookings (service_id, guest_id, booking_date, booking_time, total_guests, total_amount) VALUES (?, ?, ?, ?, ?, ?)',
      [service_id, guest_id, booking_date, booking_time, total_guests, total_amount]
    );
    return result.insertId;
  }
}

module.exports = new ServiceRepository();
