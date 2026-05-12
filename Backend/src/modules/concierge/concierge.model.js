const BaseModel = require('../../database/BaseModel');
const pool = require('../../database/connection');

class ConciergeModel extends BaseModel {
  constructor() {
    super('support_tickets');
  }

  async findActiveTickets() {
    const sql = `
      SELECT t.*, g.full_name as guest_name 
      FROM support_tickets t 
      JOIN guests g ON t.guest_id = g.id 
      WHERE t.ticket_status != "closed" AND t.deletedAt IS NULL
    `;
    const [rows] = await pool.execute(sql);
    return rows;
  }

  async getMessages(ticketId) {
    const sql = `
      SELECT m.*, u.full_name as sender_name 
      FROM support_messages m 
      LEFT JOIN users u ON m.sender_id = u.id 
      WHERE m.ticket_id = ? AND m.deletedAt IS NULL 
      ORDER BY m.createdAt ASC
    `;
    const [rows] = await pool.execute(sql, [ticketId]);
    return rows;
  }

  async createMessage(data) {
    const { ticket_id, sender_id, message } = data;
    const sql = `INSERT INTO support_messages (ticket_id, sender_id, message) VALUES (?, ?, ?)`;
    const [result] = await pool.execute(sql, [ticket_id, sender_id, message]);
    return result.insertId;
  }
}

module.exports = new ConciergeModel();
