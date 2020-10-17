const Sofa = require('../models/sofa.model');

const getSimilar = (sofas, viewedSofas) => {
  // give default value of last sofa viewed
  let defaultSofa = sofas.find((sofa) => sofa.name === 'Sofa 2 dudukan Vienna');
  let lastSofaId = String(defaultSofa._id);

  // get id of the last sofa viewed
  if (viewedSofas && viewedSofas.length) {
    lastSofaId = viewedSofas[viewedSofas.length - 1];
  }

  // get the full attribute of last sofa viewed
  const lastSofa = sofas.find((sofa) => String(sofa._id) === lastSofaId);

  // get the list of next sofas that previously never been viewed
  // this discards the previous viewed sofa(s)
  const nextSofas = [...sofas].filter(
    (sofa) => !viewedSofas.includes(String(sofa._id))
  );

  // proceed calculating similarity if there is available sofa
  if (nextSofas && nextSofas.length) {
    const selectedSofa = calculateSimilarity(lastSofa, nextSofas);
    viewedSofas.push(selectedSofa._id);
    return [selectedSofa, viewedSofas];
  }

  // this section occurs if all sofas has been viewed
  // redo unlock all sofa that previously viewed
  return getSimilar(sofas, [String(lastSofa._id)]);
};

const calculateSimilarity = (lastSofa, sofas) => {
  // score indexer
  let sofaScore = new Map();
  
  // price similarity
  sofas.forEach((sofa) => {
    sofaScore.set(sofa._id, Math.abs(sofa.price - lastSofa.price));
  });

  // calculate most similar score
  const mostSimilarId = [...sofaScore.entries()].reduce((a, e) =>
    e[1] < a[1] ? e : a
  )[0];

  return sofas.find((sofa) => String(sofa._id) === String(mostSimilarId));
};

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
