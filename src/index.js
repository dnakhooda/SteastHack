import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, onValue, ref, set } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAYA38UtEURoSzEuUPXuque-Lau6EFl98I",
  authDomain: "steast-hackathon.firebaseapp.com",
  projectId: "steast-hackathon",
  storageBucket: "steast-hackathon.firebasestorage.app",
  messagingSenderId: "926165094246",
  appId: "1:926165094246:web:98b4477669b8ab841bc2a7",
  measurementId: "G-XTQ2Q6BSW6",
  databaseURL: "https://steast-hackathon-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase();

function writeUserData(userId, name, email, imageUrl) {
  const reference = ref(database, 'users/' + userId);

  set(reference, {
    username: name,
    email: email,
    profile_picture: imageUrl,
  })
  .then(() => {
    console.log("Data saved successfully!");
  })
  .catch((error) => {
    console.error("Error writing data:", error);
  });
}

// Example usage:
writeUserData("Giovanni", "Gio", "giovanni@gmail.com", "myimageUrl");
writeUserData("Daniel", "Dan", "daniel@gmail.com", "myimageUrl");
writeUserData("Edgar", "Ed", "edgar@gmail.com", "myimageUrl");
