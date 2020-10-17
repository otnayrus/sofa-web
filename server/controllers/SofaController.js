const Sofa = require('../models/sofa.model');
const getSimilar = require('../helpers/getSimilar');

module.exports = {
  findUnique: function (req, res) {
    Sofa.find({})
      .then((sofas) => {
        const viewedSofas = req.body.viewedSofas;
        const sofaData = getSimilar(sofas, viewedSofas);
        res.json({ data: sofaData[0], viewedSofas: sofaData[1] });
      })
      .catch((err) => res.status(422).json(err));
  },
};
