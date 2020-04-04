import { https } from 'firebase-functions';
import axios from 'axios';

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = https.onRequest(async (request, response) => {
  const searches = await axios('https://www.google.co.kr/complete/search?q=g&cp=1&client=psy-ab&xssi=t')
    .then(
      res => res.data.replace(')]}\'', '')
    );
  response.send(searches);
});
