const Sofa = require('../models/sofa.model');

module.exports = {
  findOne: function(req, res) {
    Sofa.find({})
      .then((sofas) => res.json(sofas))
			.catch(err => res.status(422).json(err));
  }
}
