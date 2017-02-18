const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

mongoose.Promise = global.Promise;

const astroSchema = new Schema({
  people: [
    {
      craft: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

const Astro = mongoose.model('Astro', astroSchema);

module.exports = Astro;
