import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBKAdxrES99isl0HPpcvE8Rq9tlCEYXhk4",
  authDomain: "krachtterm-5cfa3.firebaseapp.com",
  projectId: "krachtterm-5cfa3",
  storageBucket: "krachtterm-5cfa3.firebasestorage.app",
  messagingSenderId: "144067573994",
  appId: "1:144067573994:web:983677d5f3e78452f77f93"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const formEl = document.querySelector("#placeWordForm");
const wordCloudContainer = document.querySelector(".wordcloud");

formEl.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(formEl);
  const placeWord = formData.get("placeWord").trim();

  if (placeWord.length === 0) {
    alert("Please enter a swear word!");
    return;
  }

  console.log("🚀 Sending word to Firestore:", placeWord);

  try {
    await addDoc(collection(db, "swearwords"), { word: placeWord });
    console.log("✅ Word added to Firestore:", placeWord);


    addWordToCloud(placeWord);
  } catch (error) {
    console.error("❌ Error adding word to Firestore:", error);
  }

  formEl.reset();
});

function addWordToCloud(word) {
  const wordButton = document.createElement("div");
  wordButton.classList.add("button");
  wordButton.textContent = word;
  wordCloudContainer.appendChild(wordButton);
}
