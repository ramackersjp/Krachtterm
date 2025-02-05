import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getFirestore, collection, getDocs, onSnapshot, addDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

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

function GetAllDataRealtime() {
  const swearwords = [];
  
  const unsubscribe = onSnapshot(collection(db, "swearwords"), (querySnapshot) => {
    swearwords.length = 0;  
    querySnapshot.forEach((doc) => {
      const docData = doc.data();
      swearwords.push(docData);
    });
    
    console.log("Real-time words:", swearwords);
    displayWords(swearwords);
  });
}

function displayWords(swearwords) {
  const wordCloudContainer = document.querySelector('.wordcloud');

  if (!wordCloudContainer) {
    console.error("The .wordcloud element is not found on the page!");
    return;
  }

  wordCloudContainer.innerHTML = '';  

  swearwords.forEach((wordObj) => {
    if (wordObj.word) {  
      wordCloudContainer.innerHTML += `
        <div class="button">
          ${wordObj.word}
        </div>
      `;
    }
  });
}

async function addNewWord(newWord) {
  if (!newWord) {
    console.error("No word provided!");
    return;
  }

  try {
    const docRef = await addDoc(collection(db, "swearwords"), {
      word: newWord
    });
    console.log("Word added to Firestore:", newWord, "Document ID:", docRef.id);
  } catch (error) {
    console.error("Error adding document:", error);
  }
}

function handleAddWord() {
  const newWordInput = document.querySelector('#newWordInput');
  const newWord = newWordInput.value.trim();

  if (newWord) {
    addNewWord(newWord);
    newWordInput.value = '';  
  } else {
    alert('Please enter a word!');
  }
}

window.onload = () => {
  console.log("Window loaded");
  GetAllDataRealtime(); // Use real-time fetching to update immediately

  const addWordButton = document.querySelector('#addWordButton');
  if (addWordButton) {
    addWordButton.addEventListener('click', handleAddWord);
  }
};
