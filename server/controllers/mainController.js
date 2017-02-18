const axios = require('axios');
const API = 'http://api.open-notify.org/astros.json';

const db = require('./../db/models');

const getAstros = (req, res) => {
  db.Astro.find({}).exec().then((docs) => {
    res.status(200).json({
      status: 'success',
      data: docs
    });
  })
  .catch((err) => {
    res.status(500).json({
      status: 'error',
      data: err
    });
  });
}

const postAstros = (req, res) => {
  axios.get(API)
    .then((result) => {
      const people = result.data;
      const astros = new db.Astro(people);

      astros.save().then((docs) => {
        res.status(200).json({
          status: 'success',
          data: docs
        });
      })
      .catch((err) => console.log('Error:', err));
    })
    .catch((err) => {
      res.status(500).json({
        status: 'error',
        data: err
      });
    });
};

module.exports = {
  getAstros,
  postAstros
};
