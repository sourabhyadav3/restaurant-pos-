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

    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
      const payload = {
        reservation_code: data.id || data.reservation_code || `RES-${Date.now().toString().slice(-6)}`,
        guest_id: guest_id,
        booking_type: (data.type || data.booking_type || 'table').toLowerCase(),
        booking_date: data.date || data.booking_date || new Date().toISOString().split('T')[0],
        booking_time: data.time || data.booking_time || new Date().toTimeString().split(' ')[0],
        guests_count: data.guests || data.guests_count || 1,
        special_notes: data.notes || data.special_notes || '',
        reservation_status: (data.status || data.reservation_status || 'pending').toLowerCase()
      };

      const reservationId = await reservationsModel.create(payload);

      // If it's a room booking, handle extra logic
      if (payload.booking_type === 'room' && data.room_id) {
        // 1. Create Room Booking record
        const roomBookingSql = `
          INSERT INTO room_bookings (room_id, reservation_id, check_in, check_out, total_guests) 
          VALUES (?, ?, ?, ?, ?)
        `;
        await connection.execute(roomBookingSql, [
          data.room_id,
          reservationId,
          payload.booking_date,
          data.check_out || payload.booking_date, // Default to same day if not provided
          payload.guests_count
        ]);

        // 2. Update Room status to occupied
        await connection.execute(
          'UPDATE rooms SET room_status = "occupied" WHERE id = ?',
          [data.room_id]
        );

        // 3. Get room rate
        const [roomRows] = await connection.execute('SELECT base_rate, room_name FROM rooms WHERE id = ?', [data.room_id]);
        const roomRate = roomRows.length > 0 ? parseFloat(roomRows[0].base_rate || 0) : 0;
        const roomName = roomRows.length > 0 ? roomRows[0].room_name : 'Room';

        // 4. Initialize Guest Billing
        const billingSql = `
          INSERT INTO guest_billing (guest_id, reservation_id, total_charges, paid_amount, remaining_balance, billing_status) 
          VALUES (?, ?, ?, 0, ?, 'open')
        `;
        const [billingResult] = await connection.execute(billingSql, [guest_id, reservationId, roomRate, roomRate]);
        const billingId = billingResult.insertId;

        // 5. Add initial room charge to billing_charges
        if (roomRate > 0) {
          const chargeSql = `
            INSERT INTO billing_charges (billing_id, description, amount, type, charge_date) 
            VALUES (?, ?, ?, 'Room', ?)
          `;
          await connection.execute(chargeSql, [
            billingId, 
            `${roomName} - Daily Rate`, 
            roomRate, 
            payload.booking_date
          ]);
        }
      }

      await connection.commit();
      
      // Notify staff
      const io = getIO();
      io.emit('new_reservation', { id: reservationId, date: payload.booking_date, type: payload.booking_type });
      
      return { reservationId, guestId: guest_id };
    } catch (err) {
      await connection.rollback();
      throw err;
    } finally {
      connection.release();
    }
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
