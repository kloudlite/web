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
  async (event) => {
    return null;
  },
);
