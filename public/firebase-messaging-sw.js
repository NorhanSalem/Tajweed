importScripts(
  "https://www.gstatic.com/firebasejs/9.6.4/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.6.4/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyAO1dM9A8yf-rnRmdxSRr49AXIZNQPKfpY",
  authDomain: "quran-courses-c5b53.firebaseapp.com",
  projectId: "quran-courses-c5b53",
  storageBucket: "quran-courses-c5b53.appspot.com",
  messagingSenderId: "119422705983",
  appId: "1:119422705983:web:8d8d15e8dc63764f36338a",
});

const messaging = firebase.messaging();

if ("Notification" in window) {
  Notification.requestPermission().then((permission) => {
    messaging.onMessage(function (payload) {
      console.log("Message received. ", payload);

      // Destructuring title and body from the notification payload
      const { title, body } = payload.notification;

      // Create and display the notification
      new Notification(title, {
        body: body,
        icon: payload.notification.icon || "/default-icon.png", // Optional: include an icon
      });

      console.log("Notification displayed:", title);
    });
  });
} else {
  console.error("This browser does not support notifications.");
}

messaging.onBackgroundMessage((payload) => {
  console.log("Received background message: ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/firebase-logo.png",
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
