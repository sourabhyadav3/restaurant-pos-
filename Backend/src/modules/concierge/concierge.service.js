const conciergeModel = require('./concierge.model');
const { getIO } = require('../../sockets/socket.manager');

class ConciergeService {
  async getActiveTickets() {
    return await conciergeModel.findActiveTickets();
  }

  async getTicketMessages(ticketId) {
    return await conciergeModel.getMessages(ticketId);
  }

  async sendMessage(data) {
    const messageId = await conciergeModel.createMessage(data);
    
    // Realtime broadcast
    const io = getIO();
    io.to(`ticket_${data.ticket_id}`).emit('new_message', { ...data, id: messageId });
    
    return messageId;
  }
}

module.exports = new ConciergeService();
