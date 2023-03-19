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
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    mongoURL: process.env.MONGODB_URI,
    mongoOptions: { useFacet: false,
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
