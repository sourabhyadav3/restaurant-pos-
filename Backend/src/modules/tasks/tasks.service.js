const tasksModel = require('./tasks.model');
const { getIO } = require('../../sockets/socket.manager');

class TasksService {
  async getAllTasks() {
    return await tasksModel.findWithStaff();
  }

  async createTask(data) {
    const taskId = await tasksModel.create(data);
    
    // Notify staff
    if (data.assigned_to) {
      const io = getIO();
      io.to(`user_${data.assigned_to}`).emit('new_task', { id: taskId, title: data.title });
    }
    
    return taskId;
  }

  async updateTaskStatus(id, status) {
    return await tasksModel.update(id, { task_status: status });
  }

  async deleteTask(id) {
    return await tasksModel.softDelete(id);
  }
}

module.exports = new TasksService();
