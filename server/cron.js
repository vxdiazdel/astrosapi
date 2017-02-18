const cron = require('node-cron');
const mongoose = require('mongoose');
const chalk = require('chalk');
const API = 'http://api.open-notify.org/astros.json';

const fetchApi = require('./services/fetchApi');
const db = require('./db/models');
const dbConfig = require('./db/config');

const info = chalk.blue;
const success = chalk.green.bold;
const error = chalk.red.bold;

mongoose.connect(dbConfig.url, runCron);

function runCron() {
  cron.schedule('0 0 * * * *', () => {
    fetchApi.getApi(API).then((result) => {
      console.log( info('*******************************************') );
      console.log( info('**************** Node Cron ****************') );
      console.log( info(`* ${new Date()} *`) );
      console.log( info('*******************************************') );
      console.log( info('\nFetching Data...\n') );
      console.log(result.data);

      const people = result.data;
      const astros = new db.Astro(people);

      console.log( info('\nSaving to DB...\n') );

      astros.save().then((docs) => {
        console.log( success('\nSaved succesffully!\n') );
        console.log( info('\n************** Job Complete ***************\n') );
        console.log(docs);
      })
      .catch((err) => {
        console.log( error('\nError saving:\n') );
        console.log(err);
        console.log( info('\n************** Job Complete ***************\n') );
      });
    });
  });
}
