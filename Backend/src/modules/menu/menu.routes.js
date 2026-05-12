const express = require('express');
const router = express.Router();
const menuController = require('./menu.controller');
const { authenticate, authorize } = require('../../middleware/auth.middleware');

router.get('/items', menuController.getAllItems);
router.get('/categories', menuController.getCategories);

// Only admin and manager can create items
router.post('/items', authenticate, authorize('admin', 'manager'), menuController.createItem);
router.patch('/items/:id', authenticate, authorize('admin', 'manager'), menuController.updateItem);
router.delete('/items/:id', authenticate, authorize('admin', 'manager'), menuController.deleteItem);

module.exports = router;
