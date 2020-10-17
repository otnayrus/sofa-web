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

module.exports = calculateSimilarity;