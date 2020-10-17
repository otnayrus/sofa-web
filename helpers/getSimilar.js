const calculateSimilarity = require('./calculateSimilarity');

const getSimilar = (sofas, viewedSofas) => {
  // give default value of last sofa viewed
  let defaultSofa = sofas.find((sofa) => sofa.name === 'Sofa 2 dudukan Vienna');
  let lastSofaId = String(defaultSofa._id);

  if (viewedSofas && viewedSofas.length) {
    // get id of the last sofa viewed
    // if there is other viewed sofa is submitted
    lastSofaId = viewedSofas[viewedSofas.length - 1];
  } else {
    // mark the default sofa as viewed if the user is new to the page
    viewedSofas = [lastSofaId];
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

module.exports = getSimilar;