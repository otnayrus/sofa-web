const router = require('express').Router();
const sofaController = require('../controllers/SofaController');

router.route('/get-unique').post(sofaController.findUnique);

module.exports = router;
