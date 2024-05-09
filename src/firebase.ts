import firebase from "firebase/compat/app";
import "firebase/firestore";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyCpwS0rK6_eJ-EMraO7T_2nagcYEBBJZQQ",
	authDomain: "react-test-58397.firebaseapp.com",
	projectId: "react-test-58397",
	storageBucket: "react-test-58397.appspot.com",
	messagingSenderId: "231112321799",
	appId: "1:231112321799:web:929acd109b5d4a512773a2",
	measurementId: "G-PWRD6VE4FE",
};

// Initialize Firebase
if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
} else {
	firebase.app();
}

export default firebase;
