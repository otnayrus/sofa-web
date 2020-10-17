const levenshtein = require('js-levenshtein');

const calculateSimilarity = (lastSofa, sofas) => {
  // score indexer
  let sofaScore = new Map();

  sofas.forEach((sofa) => {
    // init
    score = {};

    // area similarity (normalized)
    score['length'] =
      1 -
      Math.abs(sofa.dimension.length - lastSofa.dimension.length) /
        lastSofa.dimension.length;

    // material similarity
    score['material'] = sofa.material === lastSofa.material ? 1 : 0;

    // color similarity
    const lastColorAmt = lastSofa.colors.length;
    const uniqueColorAmt = lastSofa.colors.concat(
      sofa.colors.filter((color) => !lastSofa.colors.includes(color))
    ).length;
    score['colors'] = lastColorAmt / uniqueColorAmt;

    // product name similarity (normalized)
    score['name'] =
      1 - levenshtein(sofa.name, lastSofa.name) / lastSofa.name.length;
      
    // final score calculating (mean)
    // all parameter has the same weight
    finalScore = (score['length'] + score['material'] + score['colors'] + score['name']) / 4

    // set the final score on each upcoming sofa
    sofaScore.set(sofa._id, finalScore);
  });

  // calculate most similar score
  const mostSimilarId = [...sofaScore.entries()].reduce((a, e) =>
    e[1] > a[1] ? e : a
  )[0];

  return sofas.find((sofa) => String(sofa._id) === String(mostSimilarId));
};

module.exports = calculateSimilarity;
