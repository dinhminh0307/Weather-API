// generate-env.js
const fs = require('fs');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const environmentContent = `
export const environment = {
  production: false,
  firebase: {
    apiKey: "${process.env["FIREBASE_API_KEY"]}",
    authDomain: "${process.env["FIREBASE_AUTH_DOMAIN"]}",
    projectId: "${process.env["FIREBASE_PROJECT_ID"]}",
    storageBucket: "${process.env['FIREBASE_STORAGE_BUCKET']}",
    messagingSenderId: "${process.env["FIREBASE_MESSAGING_SENDER_ID"]}",
    appId: "${process.env["FIREBASE_APP_ID"]}",
    measurementId: "${process.env["FIREBASE_MEASUREMENT_ID"]}"
  }
};
`;

// Write the content to src/environments/environment.ts
fs.writeFileSync('src/firebase/fire-base.config.ts', environmentContent, { encoding: 'utf8' });

console.log('Environment file generated successfully.');
