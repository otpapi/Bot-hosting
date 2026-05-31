const { initializeApp } = require("firebase/app");
const { getDatabase } = require("firebase/database");

const firebaseConfig = {
  apiKey: "AIzaSyBsAMJfL825py-6HOgX6scHZFp2Mch47R8",
  authDomain: "bot-dock.firebaseapp.com",
  databaseURL: "https://bot-dock-default-rtdb.firebaseio.com",
  projectId: "bot-dock"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

module.exports = db;
