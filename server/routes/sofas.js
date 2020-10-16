const router = require('express').Router();
const sofaController = require('../controllers/SofaController');

router.route('/').get(sofaController.findOne);

module.exports = router;
