const router = require('express').Router();
const sofaRoutes = require('./sofas');

router.use('/api/sofas', sofaRoutes);

module.exports = router;
