/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// import { onRequest } from "firebase-functions/v2/https";
// import * as logger from "firebase-functions/logger";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.sendPushNotification = functions.https.onCall(
	(data: any, context: any) => {
		const message = {
			token: data.token, // The FCM token of the device you want to send the notification to
			notification: {
				title: data.title,
				body: data.body,
			},
		};

		return admin
			.messaging()
			.send(message)
			.then((response: any) => {
				// Successfully sent message response
				console.log("Successfully sent message:", response);
				return response;
			})
			.catch((error: any) => {
				console.log("Error sending message:", error);
				throw new functions.https.HttpsError("unknown", error.message, error);
			});
	}
);
