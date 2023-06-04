const inputEl = document.getElementById("input-field");
const addBtn = document.getElementById("add-button");
const shoppingListEl = document.getElementById("shopping-list");

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDg0yUo5-CtZ_1Gv2QFLDfjOpfYZd8HSUM",
  authDomain: "real-time-database-7ce9f.firebaseapp.com",
  databaseURL: "https://real-time-database-7ce9f-default-rtdb.firebaseio.com",
  projectId: "real-time-database-7ce9f",
  storageBucket: "real-time-database-7ce9f.appspot.com",
  messagingSenderId: "537379255204",
  appId: "1:537379255204:web:b0552697a65c3ba1da4731",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const shoppingList = ref(database, "List-Items");

addBtn.addEventListener("click", function () {
  let inputField = inputEl.value;

  push(shoppingList, inputField);

  //appendItemToShoppingList(inputField);
  clearInputField();
});

onValue(shoppingList, function (snapshot) {
  if (snapshot.exists()) {
    let toArray = Object.entries(snapshot.val());

    clearShoppingListEl();

    toArray.forEach((item) => {
      appendItemToShoppingList(item);
    });
  } else {
    shoppingListEl.innerHTML = "Add items here.....";
  }
});

function clearShoppingListEl() {
  shoppingListEl.innerHTML = "";
}

function clearInputField() {
  inputEl.value = "";
}

function appendItemToShoppingList(item) {
  let itemId = item[0];
  let realItem = item[1];

  if (itemId && realItem) {
    let newEl = document.createElement("li");

    newEl.textContent = realItem;
    newEl.addEventListener("click", () => {
      let exactLocationOfItemInDB = ref(database, `List-Items/${itemId}`);

      remove(exactLocationOfItemInDB);
    });
    shoppingListEl.append(newEl);
  }
}
