const inventoryController = require('../controllers/inventory.controller');
const authMiddleware = require('../Middleware/auth.middleware');
const router = require('express').Router();

router.post('/', authMiddleware.authenticateToken, inventoryController.create);
router.get('/', authMiddleware.authenticateToken, inventoryController.findAll);

module.exports = router;