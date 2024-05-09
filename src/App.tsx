import React, { useState } from "react";
import firebase from "./firebase";
import { useCollection } from "react-firebase-hooks/firestore";

const Notifications: React.FC = () => {
	const [notification, setNotification] = useState<string | null>(null);

	const sendNotification = (type: string) => {
		//@ts-ignore
		debugger;
		const notificationsRef = firebase.firestore().collection("notifications");

		notificationsRef.add({
			type: type,
			read: false,
			//@ts-ignore
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
		});
	};

	const [notificationsSnapshot, loading, error] = useCollection(
		//@ts-ignore
		firebase.firestore().collection("notifications").where("read", "==", false),
		{
			snapshotListenOptions: { includeMetadataChanges: true },
		}
	);

	const markAsRead = async (id: string) => {
		//@ts-ignore
		await firebase.firestore().collection("notifications").doc(id).update({
			read: true,
		});
	};

	return (
		<div>
			{/* A simple Notification button */}
			<button onClick={() => sendNotification("Type 1")}>Notify 1</button>
			<button onClick={() => sendNotification("Type 2")}>Notify 2</button>
			<button onClick={() => sendNotification("Type 3")}>Notify 3</button>
			{/* Add a mapping over notificationsSnapshot to display notifications and
			add an "onClick" event to mark them */}
			<div>
				{notificationsSnapshot &&
					notificationsSnapshot.docs.map((doc) => {
						const notification = doc.data();
						const id = doc.id;
						return (
							<div
								key={id}
								onClick={() => markAsRead(id)}
								style={{ cursor: "pointer" }}>
								{notification.type} - Click to mark as read
							</div>
						);
					})}
			</div>
		</div>
	);
};

export default Notifications;
