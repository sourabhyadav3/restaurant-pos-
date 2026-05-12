const billingService = require('./billing.service');

class BillingController {
  async getAllBills(req, res) {
    try {
      const bills = await billingService.getAllBills();
      res.json({
        success: true,
        message: 'Bills fetched successfully',
        data: bills
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message
      });
    }
  }

  async settleBill(req, res) {
    try {
      const result = await billingService.settleBill(req.params.id, req.body, req.user.id);
      res.json({
        success: true,
        message: 'Bill settled successfully',
        data: result
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message
      });
    }
  }
}

module.exports = new BillingController();
