importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBB69rrvrFCJSrkCyScQl6JDeiSNees3qA",
  authDomain: "app-lape.firebaseapp.com",
  projectId: "app-lape"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: 'brasao.png'
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});