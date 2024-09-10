/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { onDocumentCreated } from 'firebase-functions/v2/firestore';

exports.contactEmail = onDocumentCreated(
  'web-contact-form/{formId}',
  (event) => {
    if (event.data) {
      const newValue = event.data.data(); // The new document's data

      // Access fields in the new document

      console.log('New user created:', newValue);
    }
    // Additional operations (e.g., sending a welcome email)
    return null;
  },
);
