const reservationsModel = require('./reservations.model');
const pool = require('../../database/connection');
const { getIO } = require('../../sockets/socket.manager');

class ReservationsService {
  async getAllReservations(filters) {
    return await reservationsModel.findWithGuestDetails(filters);
  }

  async createReservation(data) {
    let guest_id = data.guest_id;

    // Resolve Guest if guestName is provided
    if (data.guestName && !guest_id) {
      const [guestRows] = await pool.execute(
        'SELECT id FROM guests WHERE full_name = ? AND deletedAt IS NULL',
        [data.guestName]
      );
      
      if (guestRows.length > 0) {
        guest_id = guestRows[0].id;
      } else {
        const [result] = await pool.execute(
          'INSERT INTO guests (full_name) VALUES (?)',
          [data.guestName]
        );
        guest_id = result.insertId;
      }
    }

    const payload = {
      reservation_code: data.reservation_code || `RES-${Date.now().toString().slice(-6)}`,
      guest_id: guest_id,
      booking_type: (data.type || data.booking_type || 'table').toLowerCase(),
      booking_date: data.date || data.booking_date,
      booking_time: data.time || data.booking_time,
      guests_count: data.guests || data.guests_count || 1,
      special_notes: data.notes || data.special_notes || '',
      reservation_status: (data.status || data.reservation_status || 'pending').toLowerCase()
    };

    const reservationId = await reservationsModel.create(payload);
    
    // Notify staff
    const io = getIO();
    io.emit('new_reservation', { id: reservationId, date: payload.booking_date });
    
    return reservationId;
  }

  async updateStatus(id, status) {
    const result = await reservationsModel.update(id, { reservation_status: status });
    
    // Notify customer/staff
    const io = getIO();
    io.emit('reservation_update', { id, status });
    
    return result;
  }

  async deleteReservation(id) {
    return await reservationsModel.softDelete(id);
  }
}

module.exports = new ReservationsService();
