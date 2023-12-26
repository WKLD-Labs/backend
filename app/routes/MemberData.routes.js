const MemberDataController = require('../controllers/MemberData.controller');
const router = require('express').Router();
const authMiddleware = require('../Middleware/auth.middleware')

router.post('/', authMiddleware.authenticateToken, MemberDataController.create);
router.get('/', authMiddleware.authenticateToken, MemberDataController.findAll);
router.put('/:id', authMiddleware.authenticateToken, MemberDataController.update);
router.delete('/:id', authMiddleware.authenticateToken, MemberDataController.delete);

module.exports = router;
