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
  await payload.init({
    secret: 'Test',
    mongoURL: process.env.MONGODB_URI,
    mongoOptions: { useFacet: false,
      tls: true,
      tlsCAFile: `${__dirname}/rds-combined-ca-bundle.pem`,
      retryWrites: false},
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
    },
  })

  // Add your own express routes here

  app.listen(3000);
}

start();
