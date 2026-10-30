// subscription.js

// the flowers of each subscription (price is for one stem)
// "image" is the picture. Flowers without "image" show only the name.
let plans = {
  "Fresh Flowers": {
    note: "Regular stock: roses, carnations, gerbera daisies, chrysanthemums, lilies, fillers, tulips and foliage.",
    flowers: [
      { name: "Red Rose", image: "images/red-rose.png", price: 3.5 },
      { name: "White Rose", image: "images/white-rose.png", price: 3.5 },
      { name: "Pink Rose", image: "images/pink-rose.png", price: 3.5 },
      { name: "Orchid", image: "images/orchid.png", price: 5 },
      { name: "Chrysanthemum", image: "images/chrysanthemum.png", price: 2.5 },
      { name: "Tulip", image: "images/tulip.png", price: 2.5 },
      { name: "Sunflower", image: "images/sunflower.png", price: 3 },
      { name: "Gerbera Daisy", image: "images/gerbera-daisy.png", price: 2.5 },
      { name: "Carnation", image: "images/carnation.png", price: 2 },
      { name: "Lisianthus", image: "images/lisianthus.png", price: 3.5 },
      { name: "Hydrangea", image: "images/hydrangea.png", price: 4.5 },
      { name: "Amaryllis", image: "images/amaryllis.png", price: 5 },
      { name: "Filler", image: "images/filler.png", price: 1.5 },
      { name: "Lily", image: "images/lily.png", price: 4 }
    ]
  },
  "Seasonal Flowers, image": {
    note: "Seasonal premium stock: peonies, ranunculus and dahlias.",
    flowers: [
      { name: "Peony", image: "images/peony.png", price: 6 },
      { name: "Dahlia", image: "images/dahlia.png", price: 6 },
      { name: "Ranunculus", image: "images/ranunculus.png", price: 5.5 }
    ]
  },
  "Dried Flowers": {
    note: "",
    flowers: [
      { name: "Dried Lavender", price: 3 },
      { name: "Dried Pampas Grass", price: 4 },
      { name: "Dried Baby's Breath", price: 2.5 },
    ]
  }
};

// to remember what the user picked
let chosenPlan = "";
let chosenFlowers = [];

// delivery fee for each area (it is charged for every delivery)
let deliveryFees = {
  "Brunei Muara": 6,
  "Tutong": 10,
  "Kuala Belait": 12,
  "Temburong": 15
};

// puts the areas and their fees in the dropdown
function fillAreas() {
  let html = "";
  for (let name in deliveryFees) {
    html = html + '<option value="' + name + '">' + name + ' ($' + deliveryFees[name].toFixed(2) + ')</option>';
  }
  document.getElementById("area").innerHTML = html;
}

// the delivery fee of the area that is chosen now
function getDeliveryFee() {
  let area = document.getElementById("area").value;
  return deliveryFees[area];
}

fillAreas();


// ---------- STEP 1: plan and flowers ----------

// when user clicks one of the three subscription buttons
function choosePlan(name, button) {
  // if the user changes the plan, start again with an empty list
  if (name != chosenPlan) {
    chosenFlowers = [];
  }
  chosenPlan = name;

  // take off the "selected" look from all plan buttons
  let allButtons = document.getElementsByClassName("plan-btn");
  for (let i = 0; i < allButtons.length; i++) {
    allButtons[i].classList.remove("selected");
  }

  // put it on the one that was clicked
  button.classList.add("selected");
  document.getElementById("step1-error").textContent = "";

  // show the flowers of this plan
  document.getElementById("flower-area").classList.remove("hidden");
  document.getElementById("plan-note").textContent = plans[name].note;
  showFlowers();
  showSelected();
}

// gives the picture of a flower as html (nothing if it has no picture)
function getPictureHtml(flower) {
  if (flower.image) {
    return '<img class="flower-picture" src="' + flower.image + '" alt="' + flower.name + '">';
  }
  return "";
}

// draws all the flowers of the chosen plan
function showFlowers() {
  let list = plans[chosenPlan].flowers;
  let html = "";

  for (let i = 0; i < list.length; i++) {
    html = html + '<div class="flower-card">' +
      getPictureHtml(list[i]) +
      '<b>' + list[i].name + '</b>' +
      '<small>$' + list[i].price.toFixed(2) + ' per stem</small>' +
      '<button class="add-btn" onclick="addFlower(' + i + ')">Add</button>' +
      '</div>';
  }

  document.getElementById("flower-grid").innerHTML = html;
}

// when user clicks "Add" on a flower
function addFlower(index) {
  let flower = plans[chosenPlan].flowers[index];

  // if the flower is already in the list, add one more
  let found = false;
  for (let i = 0; i < chosenFlowers.length; i++) {
    if (chosenFlowers[i].name == flower.name) {
      chosenFlowers[i].qty = chosenFlowers[i].qty + 1;
      found = true;
    }
  }

  if (found == false) {
    chosenFlowers.push({ name: flower.name, price: flower.price, qty: 1 });
  }

  document.getElementById("step1-error").textContent = "";
  showSelected();
}

// the + and - buttons in the list
function changeFlowerQty(index, amount) {
  chosenFlowers[index].qty = chosenFlowers[index].qty + amount;

  // if it goes down to 0, take the flower out
  if (chosenFlowers[index].qty < 1) {
    chosenFlowers.splice(index, 1);
  }

  showSelected();
}

// price of the flowers for one delivery
function getPricePerDelivery() {
  let total = 0;
  for (let i = 0; i < chosenFlowers.length; i++) {
    total = total + chosenFlowers[i].price * chosenFlowers[i].qty;
  }
  return total;
}

// draws the list of the flowers the user added
function showSelected() {
  let html = "";

  for (let i = 0; i < chosenFlowers.length; i++) {
    let flower = chosenFlowers[i];

    html = html + '<div class="selected-row">' +
      '<span>' + flower.name + '</span>' +
      '<span class="qty-controls">' +
      '<button class="qty-btn" onclick="changeFlowerQty(' + i + ', -1)">-</button>' +
      '<b>' + flower.qty + '</b>' +
      '<button class="qty-btn" onclick="changeFlowerQty(' + i + ', 1)">+</button>' +
      '</span>' +
      '<span>$' + (flower.price * flower.qty).toFixed(2) + '</span>' +
      '</div>';
  }

  if (html == "") {
    html = '<p class="empty-text">No flowers added yet. Click Add on a flower above.</p>';
  }

  document.getElementById("selected-flowers").innerHTML = html;
  document.getElementById("delivery-price").textContent =
    "Price for each delivery: $" + getPricePerDelivery().toFixed(2);

  // the total price changes too
  showPrice();
}

function continueStep1() {
  if (chosenPlan == "") {
    document.getElementById("step1-error").textContent = "Please choose a flower subscription first.";
    return;
  }

  if (chosenFlowers.length == 0) {
    document.getElementById("step1-error").textContent = "Please add at least one flower.";
    return;
  }

  document.getElementById("step2").classList.remove("hidden");
  document.getElementById("step2").scrollIntoView({ behavior: "smooth" });
  showPrice();
}


// ---------- STEP 2: delivery, duration and price ----------

// works out how many deliveries there will be
function getDeliveries() {
  let frequency = document.getElementById("frequency").value;
  let months = Number(document.getElementById("length").value);

  let deliveriesPerMonth = 1;
  if (frequency == "Every week") {
    deliveriesPerMonth = 4;
  }

  return months * deliveriesPerMonth;
}

// estimated price = (flowers + delivery fee) x number of deliveries
function getTotal() {
  return (getPricePerDelivery() + getDeliveryFee()) * getDeliveries();
}

// shows the price (it changes by itself when something is changed)
function showPrice() {
  let box = document.getElementById("price-box");
  let flowersPrice = getPricePerDelivery();
  let fee = getDeliveryFee();

  box.innerHTML = "Flowers (each delivery): $" + flowersPrice.toFixed(2) + "<br>" +
    "Delivery fee (" + document.getElementById("area").value + "): $" + fee.toFixed(2) + "<br>" +
    "Total for each delivery: $" + (flowersPrice + fee).toFixed(2) + "<br>" +
    "Number of deliveries: " + getDeliveries() + "<br>" +
    "<b>Estimated total: $" + getTotal().toFixed(2) + "</b>";
}

// ---------- CONFIRM THE SUBSCRIPTION ----------

// when the user clicks "Send Subscription Request & Confirm With Payment"
function confirmSubscription() {
  let error = document.getElementById("step2-error");
  error.textContent = "";

  // check again, in case the user took out all the flowers
  if (chosenPlan == "" || chosenFlowers.length == 0) {
    error.textContent = "Please go back and add at least one flower.";
    return;
  }

  // text for the length, like "1 Year" or "6 months"
  let months = Number(document.getElementById("length").value);
  let lengthText = months + " months";
  if (months == 1) {
    lengthText = "1 month";
  }
  if (months == 12) {
    lengthText = "1 Year";
  }

  // list of the flowers
  let flowerText = "";
  for (let i = 0; i < chosenFlowers.length; i++) {
    flowerText = flowerText + chosenFlowers[i].name + " x " + chosenFlowers[i].qty + "<br>";
  }

  // put everything together
  let subscription = {
    plan: chosenPlan,
    flowers: chosenFlowers,
    frequency: document.getElementById("frequency").value,
    months: months,
    deliveries: getDeliveries(),
    pricePerDelivery: Number(getPricePerDelivery().toFixed(2)),
    estimatedTotal: Number(getTotal().toFixed(2))
  };

  console.log(subscription);

  // TODO: send "subscription" to the database developer's code
  // (they will tell us the link / file to send it to)

  // hide the steps and show the thank you message
  document.getElementById("step1").classList.add("hidden");
  document.getElementById("step2").classList.add("hidden");
  document.getElementById("success").classList.remove("hidden");

  document.getElementById("success-text").innerHTML =
    "We got your subscription request.<br><br>" +
    "Subscription: " + chosenPlan + "<br>" +
    "Flowers for each delivery:<br>" + flowerText +
    "Delivery: " + document.getElementById("frequency").value + "<br>" +
    "Length: " + lengthText + "<br>" +
    "<b>Estimated total: $" + getTotal().toFixed(2) + "</b>";

  document.getElementById("success").scrollIntoView({ behavior: "smooth" });
}