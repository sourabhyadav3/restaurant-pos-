const tablesModel = require('./tables.model');
const pool = require('../../database/connection');
const { getIO } = require('../../sockets/socket.manager');

class TablesService {
  async getAllTables() {
    return await tablesModel.findAllWithZones();
  }

  async getZones() {
    return await tablesModel.getZones();
  }

  async updateTableStatus(id, status) {
    const result = await tablesModel.update(id, { status });
    
    // Notify all clients about table status change
    const io = getIO();
    io.emit('table_status_update', { id, status });
    
    return result;
  }

  async createTable(data) {
    let zone_id = data.zone_id || null;

    if (data.floor && !zone_id) {
      const zones = await tablesModel.getZones();
      let zone = zones.find(z => z.zone_name.toLowerCase() === data.floor.toLowerCase());
      
      if (zone) {
        zone_id = zone.id;
      } else {
        // Create the zone if it doesn't exist
        const [result] = await pool.execute(
          'INSERT INTO table_zones (zone_name) VALUES (?)',
          [data.floor]
        );
        zone_id = result.insertId;
      }
    }

    const payload = {
      table_code: data.name || `T-${Date.now()}`,
      capacity: data.capacity || 2,
      status: 'available',
      zone_id: zone_id || 1 // Fallback to first zone or null if needed
    };

    return await tablesModel.create(payload);
  }

  async deleteTable(id) {
    return await tablesModel.softDelete(id);
  }
}

module.exports = new TablesService();
