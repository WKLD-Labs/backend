const memberController = require('../controllers/member.controller');
const router = require('express').Router();
const authMiddleware = require('../Middleware/auth.middleware')

router.post('/', authMiddleware.authenticateToken, memberController.create);
router.get('/', authMiddleware.authenticateToken, memberController.findAll);
router.put('/:id', authMiddleware.authenticateToken, memberController.update);
router.delete('/:id', authMiddleware.authenticateToken, memberController.delete);
router.get('/:id', authMiddleware.authenticateToken, memberController.findOne);

module.exports = router;
