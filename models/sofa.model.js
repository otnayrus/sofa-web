const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sofaSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  dimension: {
    length: {
      type: Number,
      required: true,
    },
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
  },
  colors: {
    type: Array,
    required: true,
  },
  material: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Sofa = mongoose.model('Sofa', sofaSchema);

module.exports = Sofa;
