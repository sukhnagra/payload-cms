import express from 'express';
import payload from 'payload';
import fs from 'fs'

require('dotenv').config();
const app = express();

// Redirect root to Admin panel
app.get('/', (_, res) => {
  res.redirect('/admin');
});

const start = async () => {
  // Initialize Payload
  console.log(process.env.MONGODB_URI)
  console.log(`${__dirname}/rds-combined-ca-bundle.pem`)
  await payload.init({
    secret: 'Test',
    mongoURL: 'mongodb://sukhnagra:password123@monogtest.cluster-cad2vos8ppaj.eu-west-2.docdb.amazonaws.com:27017/payload-cms&retryWrites=false',
    mongoOptions: { useFacet: false,
      tls: true,
      tlsCAFile: `${__dirname}/rds-combined-ca-bundle.pem`},
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
    },
  })

  // Add your own express routes here

  app.listen(3000);
}

start();
