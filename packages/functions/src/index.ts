import { https } from 'firebase-functions';

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = https.onRequest(async (request, response) => {
  response.send('Hello from Firebase!');
});
