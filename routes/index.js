const router = require('express').Router();
const sofaRoutes = require('./sofas');

router.use('/api/sofas', sofaRoutes);

// If no API routes are hit, send the React app
router.use(function(req, res) {
	res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

module.exports = router;
