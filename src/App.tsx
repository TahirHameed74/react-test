import React, { useEffect, useState } from "react";
import {
	requestUserPermission,
	messaging,
	functions,
	getToken,
} from "./firebase";

const NotificationSystem: React.FC = () => {
	const [deviceToken, setDeviceToken] = useState<string | null>(null);

	useEffect(() => {
		const fetchToken = async () => {
			const token = await getToken();
			setDeviceToken(token); // Store the token in the component
		};

		fetchToken();
	}, []);

	useEffect(() => {
		// Request permission for notifications
		requestUserPermission();

		const unsubscribe = messaging.onMessage((payload) => {
			console.log("Message received. ", payload);
		});

		return () => {
			unsubscribe();
		};
	}, []);

	const sendNotification = async (title: string, body: string) => {
		// device tokem from functions
		const token = deviceToken;

		const sendPushNotification = functions.httpsCallable(
			"sendPushNotification"
		);
		try {
			const result = await sendPushNotification({ token, title, body });
			console.log(result);
		} catch (error) {
			console.error("Error sending notification:", error);
		}
	};

	return (
		<div>
			<button
				onClick={() =>
					sendNotification(
						"Notification 1",
						"This is the message for Notification 1"
					)
				}>
				Notify 1
			</button>
			<button
				onClick={() =>
					sendNotification(
						"Notification 2",
						"This is the message for Notification 2"
					)
				}>
				Notify 2
			</button>
			<button
				onClick={() =>
					sendNotification(
						"Notification 3",
						"This is the message for Notification 3"
					)
				}>
				Notify 3
			</button>
		</div>
	);
};

export default NotificationSystem;
