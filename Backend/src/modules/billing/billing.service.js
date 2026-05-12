const billingModel = require('./billing.model');
const pool = require('../../database/connection');

class BillingService {
  async getAllBills() {
    return await billingModel.findWithGuestDetails();
  }

  async settleBill(id, data, userId) {
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
      const bill = await billingModel.findOne('id = ?', [id]);
      if (!bill) throw new Error('Bill not found');

      const updatedPaidAmount = Number(bill.paid_amount) + Number(data.amount);
      const remainingBalance = Number(bill.total_charges) - updatedPaidAmount;

      await billingModel.update(id, {
        paid_amount: updatedPaidAmount,
        remaining_balance: remainingBalance,
        billing_status: remainingBalance <= 0 ? 'settled' : 'open'
      });

      await billingModel.createSettlement({
        billing_id: id,
        payment_method: data.paymentMethod,
        settled_amount: data.amount,
        settled_by: userId
      });

      await connection.commit();
      return { remainingBalance };
    } catch (err) {
      await connection.rollback();
      throw err;
    } finally {
      connection.release();
    }
  }
}

module.exports = new BillingService();
