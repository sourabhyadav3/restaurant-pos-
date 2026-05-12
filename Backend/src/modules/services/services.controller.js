const serviceRepository = require('./services.repository');

class ServiceController {
  async getAllServices(req, res) {
    try {
      const services = await serviceRepository.getAllServices();
      res.json({ success: true, data: services });
    } catch (error) {
      console.error('Error fetching services:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }

  async getAllBookings(req, res) {
    try {
      const bookings = await serviceRepository.getAllBookings();
      const mappedBookings = bookings.map(b => ({
        id: b.id,
        serviceId: b.service_id,
        guestId: b.guest_id,
        serviceName: b.service_name,
        category: b.service_type,
        guestName: b.guest_name,
        date: b.booking_date,
        time: b.booking_time,
        guests: b.total_guests,
        total: b.total_amount,
        status: b.booking_status?.charAt(0).toUpperCase() + b.booking_status?.slice(1) || 'Pending'
      }));
      res.json({ success: true, data: mappedBookings });
    } catch (error) {
      console.error('Error fetching bookings:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }

  async updateBookingStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const success = await serviceRepository.updateBookingStatus(id, status.toLowerCase());
      if (success) {
        res.json({ success: true, message: 'Booking status updated' });
      } else {
        res.status(404).json({ success: false, message: 'Booking not found' });
      }
    } catch (error) {
      console.error('Error updating booking status:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }

  async createBooking(req, res) {
    try {
      const id = await serviceRepository.createBooking(req.body);
      res.status(201).json({ success: true, id });
    } catch (error) {
      console.error('Error creating booking:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }
}

module.exports = new ServiceController();
