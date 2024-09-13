/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { onDocumentCreated } from 'firebase-functions/v2/firestore';
import axios from 'axios';

exports.contactEmail = onDocumentCreated(
  'web-contact-form/{formId}',
  async (event) => {
    if (event.data) {
      const newValue = event.data.data(); // The new document's data

      // Access fields in the new document

      console.log('hello New user created:', newValue);
      const x = await axios('https://webhooks.dev.kloudlite.io/contact-us', {
        method: 'post',
        data: {
          name: 'bikash ojha',
          email: 'bikash@kloudlite.io',
          mobileNo: '7004667341',
          companyName: 'kl india',
          country: 'india',
          message: 'hello world',
        },
      });
      console.log(x.data);
    }
    return null;
  },
);
