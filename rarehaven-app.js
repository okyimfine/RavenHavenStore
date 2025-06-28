// rarehaven-app.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getDatabase, ref, get, set, update, increment } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDsPwrb0-9_9noOtlkNG0mzGaw64U-E7vU",
  authDomain: "ravenhaven-7470d.firebaseapp.com",
  databaseURL: "https://ravenhaven-7470d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ravenhaven-7470d",
  storageBucket: "ravenhaven-7470d.appspot.com",
  messagingSenderId: "524775890042",
  appId: "1:524775890042:web:8b237c038878996dbb6fc3"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const visitRef = ref(db, 'visits');
get(visitRef).then(snapshot => {
  let visits = snapshot.exists() ? snapshot.val() : 0;
  document.getElementById("visitCount").textContent = visits + 1;
  update(visitRef, increment(1));
});

window.buyNow = function () {
  const item = document.getElementById("itemSelect").value;
  const itemRef = ref(db, `items/${item}/buys`);
  get(itemRef).then(snapshot => {
    const count = snapshot.exists() ? snapshot.val() : 0;
    set(itemRef, count + 1);
  });
  const phone = "60149606249";
  const msg = `Hello, I want to buy: ${item.replace("_", " ")}`;
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, "_blank");
};

window.rateItem = function () {
  const item = document.getElementById("itemSelect").value;
  const rating = document.getElementById("rating").value;
  if (rating < 1 || rating > 5) {
    alert("Please rate between 1 and 5!");
    return;
  }
  const timestamp = Date.now();
  const ratingRef = ref(db, `items/${item}/ratings/${timestamp}`);
  set(ratingRef, parseInt(rating));
  alert("Rating submitted!");
};

window.closeModal = function () {
  document.getElementById("modal").style.display = 'none';
};
