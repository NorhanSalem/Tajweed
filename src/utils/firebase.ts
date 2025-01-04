// src/utils/firebase.ts
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAO1dM9A8yf-rnRmdxSRr49AXIZNQPKfpY",
    authDomain: "quran-courses-c5b53.firebaseapp.com",
    projectId: "quran-courses-c5b53",
    storageBucket: "quran-courses-c5b53.appspot.com",
    messagingSenderId: "119422705983",
    appId: "1:119422705983:web:8d8d15e8dc63764f36338a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Request permission and get FCM token
export const requestForToken = async () => {
    try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            const token = await getToken(messaging);
            if (token) {
                return token;
            } else {
            }
        } else {
            console.error("Unable to get permission to notify.");
        }
    } catch (error) {
        console.error("Error fetching FCM device token: ", error);
    }
};

// Handle incoming messages
onMessage(messaging, (payload) => {
    console.log("Message received: ", payload);
});
