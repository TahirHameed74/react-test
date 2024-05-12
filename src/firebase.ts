import firebase from "firebase/compat/app";
import "firebase/firestore";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/messaging";

const firebaseConfig = {
	apiKey: "AIzaSyCpwS0rK6_eJ-EMraO7T_2nagcYEBBJZQQ",
	authDomain: "react-test-58397.firebaseapp.com",
	projectId: "react-test-58397",
	storageBucket: "react-test-58397.appspot.com",
	messagingSenderId: "231112321799",
	appId: "1:231112321799:web:929acd109b5d4a512773a2",
	measurementId: "G-PWRD6VE4FE",
};

firebase.initializeApp(firebaseConfig);

// Firebase services
const firestore = firebase.firestore();

// Export the necessary Firebase services

const messaging = firebase.messaging();
const functions = firebase.app().functions();

export const requestUserPermission = async () => {
	const permission = await Notification.requestPermission();
	if (permission === "granted") {
		console.log("Notification permission granted.");

		// Get the token
		const currentToken = await messaging.getToken({
			vapidKey:
				"BF92zjl7hXDY1lcHc6OFnlyKZzXS5y2iPkYeIxN07IE5MhxhGajclKN5L3iqCI3KWagF99F9XJsQOJDhFz_AceA",
		});
		if (currentToken) {
			console.log("Token received:", currentToken);
		} else {
			console.log(
				"No registration token available. Request permission to generate one."
			);
		}
	} else {
		console.log("Unable to get permission to notify.");
	}
};
export const getToken = async (): Promise<string | null> => {
	try {
		// Request the permission to send notifications
		const permission = await Notification.requestPermission();
		if (permission !== "granted") {
			console.error("Permission not granted for Notification");
			return null;
		}

		// Get the current token
		const currentToken = await messaging.getToken({
			vapidKey:
				"BF92zjl7hXDY1lcHc6OFnlyKZzXS5y2iPkYeIxN07IE5MhxhGajclKN5L3iqCI3KWagF99F9XJsQOJDhFz_AceA",
		});
		if (currentToken) {
			console.log("Current token:", currentToken);
			return currentToken;
		} else {
			console.error("Failed to get FCM token. No token available.");
			return null;
		}
	} catch (error) {
		console.error("An error occurred while retrieving token. ", error);
		return null;
	}
};

export { messaging, functions, firestore };
