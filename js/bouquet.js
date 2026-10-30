// bouquet.js

// colours and their codes
let colourCodes = {
  Red: "#c62f46",
  Pink: "#e8899f",
  White: "#f4f1f2",
  Yellow: "#f2c14e",
  Purple: "#7b4b94",
  Orange: "#e8803a",
  Blue: "#9ab8c9",
  Cream: "#efe4cf",
  "Blush Pink": "#f3cfd3",
  Burgundy: "#7a1f3d",
  Green: "#6f9a74",
  "Kraft Brown": "#c8a27a",
  Gold: "#d4a937"
};

// the colour of the thin lines around the drawn flowers and the paper
let lineColour = "#6e5252";

// the most flowers a customer can pick (change this number if you want)
let maxFlowers = 30;

// all the flowers (price is for one stem)
// image = the picture in the images folder (a png with no background)
// shape and colour = the drawn flower that shows if the picture is not there yet
// height = how tall the flower is in the bouquet (you can add it to a flower, the normal is 230)
// to add a flower: copy one line, change the name, the picture and the price
let flowers = [
  { name: "Red Rose", image: "images/red-rose.png", shape: "rose", colour: "Red", price: 3.5 },
  { name: "White Rose", image: "images/white-rose.png", shape: "rose", colour: "White", price: 3.5 },
  { name: "Pink Rose", image: "images/pink-rose.png", shape: "rose", colour: "Pink", price: 3.5 },
  { name: "Orchid", image: "images/orchid.png", shape: "orchid", colour: "Pink", price: 5 },
  { name: "Chrysanthemum", image: "images/chrysanthemum.png", shape: "star", colour: "White", price: 2.5 },
  { name: "Tulip", image: "images/tulip.png", shape: "tulip", colour: "Pink", price: 2.5 },
  { name: "Sunflower", image: "images/sunflower.png", shape: "sunflower", colour: "Yellow", price: 3 },
  { name: "Gerbera Daisy", image: "images/gerbera.png", shape: "gerbera", colour: "Pink", price: 2.5 },
  { name: "Carnation", image: "images/carnation.png", shape: "ruffle", colour: "Pink", price: 2 },
  { name: "Lisianthus", image: "images/lisianthus.png", shape: "cup", colour: "Purple", price: 3.5 },
  { name: "Hydrangea", image: "images/hydrangea.png", shape: "cluster", colour: "Blue", price: 4.5 },
  { name: "Amaryllis", image: "images/amaryllis.png", shape: "lily", colour: "Red", price: 5 },
  { name: "Filler", image: "images/filler.png", shape: "filler", colour: "White", price: 1.5 },
  { name: "Lily", image: "images/lily.png", shape: "lily", colour: "Pink", price: 4 },
  { name: "Foliage", image: "images/foliage.png", shape: "filler", colour: "White", price: 1.5 },
  { name: "Gladiolus", image: "images/gladiolus.png", shape: "gladiolus", colour: "Pink", price: 3.5 },
  { name: "Peony (Seasonal)", image: "images/peony.png", shape: "peony", colour: "Pink", price: 6 },
  { name: "Dahlia (Seasonal)", image: "images/dahlia.png", shape: "dahlia", colour: "Pink", price: 6 },
  { name: "Ranunculus (Seasonal)", image: "images/ranunculus.png", shape: "ranunculus", colour: "Pink", price: 5.5 },
];

// the wrapped bouquet (the paper) and its colours
let wrapper = {
  name: "Wrapped bouquet",
  price: 5,
  colours: ["White", "Cream", "Blush Pink", "Pink", "Red", "Burgundy", "Purple", "Blue", "Green", "Kraft Brown"]
};

// the ribbons (jute string has no colours)
let ribbons = [
  { name: "Satin ribbon", price: 3, colours: ["White", "Cream", "Blush Pink", "Pink", "Red", "Burgundy", "Purple", "Blue", "Green", "Gold"] },
  { name: "Jute string", price: 2, colours: [] }
];

// the cards the customer can choose
// "id" is the same as the end of the radio button id in the html (card-none, card-empty...)
// "needsMessage" is true if the customer must write a message
let cards = [
  { id: "none", name: "No card", price: 0, needsMessage: false },
  { id: "handwriting", name: "Normal Handwriting Card", price: 0, needsMessage: true },
  { id: "empty", name: "Empty Card", price: 0, needsMessage: false },
  { id: "printed", name: "Printed Card", price: 2, needsMessage: true }
];

// what the customer has chosen so far
let bouquet = {
  flowers: [],
  wrapperColour: "",
  ribbonType: "",
  ribbonColour: ""
};

// the saved steps for undo and redo
let savedStates = [];
let stateIndex = -1;

// which pictures were found
// for example imageOk["images/tulip.png"] is true if the file is there
let imageOk = {};

// the step we are on now (1 to 4)
let step = 1;


// ---------- small helpers ----------

// makes text safe to show on the page
function cleanText(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// makes a colour lighter (amount above 0) or darker (amount below 0)
// "hex" must be a code like "#c62f46"
function shade(hex, amount) {
  let r = parseInt(hex.substr(1, 2), 16) + amount;
  let g = parseInt(hex.substr(3, 2), 16) + amount;
  let b = parseInt(hex.substr(5, 2), 16) + amount;

  r = Math.max(0, Math.min(255, r));
  g = Math.max(0, Math.min(255, g));
  b = Math.max(0, Math.min(255, b));

  return "rgb(" + r + "," + g + "," + b + ")";
}

// how many flowers are in the bouquet
function countFlowers() {
  let count = 0;
  for (let i = 0; i < bouquet.flowers.length; i++) {
    count = count + bouquet.flowers[i].qty;
  }
  return count;
}

// how many of one flower are in the bouquet
function getQty(name) {
  for (let i = 0; i < bouquet.flowers.length; i++) {
    if (bouquet.flowers[i].name == name) {
      return bouquet.flowers[i].qty;
    }
  }
  return 0;
}

// finds a ribbon by its name (null if not found)
function findRibbon(name) {
  for (let i = 0; i < ribbons.length; i++) {
    if (ribbons[i].name == name) {
      return ribbons[i];
    }
  }
  return null;
}

// finds which card is chosen right now
function getCard() {
  for (let i = 0; i < cards.length; i++) {
    if (document.getElementById("card-" + cards[i].id).checked) {
      return cards[i];
    }
  }
  return cards[0];
}

// total price = flowers + wrapper + ribbon + card
function getTotal() {
  let total = 0;

  for (let i = 0; i < bouquet.flowers.length; i++) {
    total = total + bouquet.flowers[i].price * bouquet.flowers[i].qty;
  }

  if (bouquet.wrapperColour != "") {
    total = total + wrapper.price;
  }

  if (bouquet.ribbonType != "") {
    total = total + findRibbon(bouquet.ribbonType).price;
  }

  total = total + getCard().price;
  return total;
}

// ---------- checking which pictures are there ----------

// tries to load every flower picture
// when a picture is found, the page is drawn again so it shows the picture
function checkPictures() {
  for (let i = 0; i < flowers.length; i++) {
    let path = flowers[i].image;
    let test = new Image();

    test.onload = function () {
      imageOk[path] = true;
      refreshAll();
    };

    test.onerror = function () {
      imageOk[path] = false;
    };

    test.src = path;
  }
}


// ---------- drawing the flowers (used when a picture is not there yet) ----------

// draws a circle (x and y are the middle, r is the size)
function drawCircle(x, y, r, fill) {
  return '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="' + fill + '" ' +
    'stroke="' + lineColour + '" stroke-width="0.7"/>';
}

// draws petals around the middle of the flower (the middle is x=50, y=50)
// count = how many petals, distance = how far the petal is from the middle
// rx and ry = the size of one petal, turn = how much to turn the ring
function drawRing(count, distance, rx, ry, fill, turn) {
  let html = "";

  for (let i = 0; i < count; i++) {
    let angle = (360 / count) * i + turn;
    html = html + '<ellipse cx="50" cy="' + (50 - distance) + '" rx="' + rx + '" ry="' + ry + '" ' +
      'fill="' + fill + '" stroke="' + lineColour + '" stroke-width="0.7" ' +
      'transform="rotate(' + angle.toFixed(1) + ' 50 50)"/>';
  }

  return html;
}

// draws a whole flower head as a small picture
// shape = the kind of flower, colour = the name of the colour
// attrs = extra things for the picture (like the class), titleText = the name when you point at it
function getFlowerSvg(shape, colour, attrs, titleText) {
  let c = colourCodes[colour];
  let gold = "#f2b632";
  let inner = "";

  if (shape == "rose") {
    inner = drawCircle(50, 50, 40, shade(c, -25)) +
      drawRing(6, 24, 15, 15, c, 0) +
      drawRing(5, 13, 11, 11, shade(c, 12), 20) +
      drawCircle(50, 50, 10, shade(c, -12)) +
      drawCircle(50, 50, 4.5, shade(c, -30));

  } else if (shape == "peony") {
    inner = drawCircle(50, 50, 42, shade(c, -18)) +
      drawRing(8, 27, 15, 15, c, 0) +
      drawRing(7, 17, 12, 12, shade(c, 12), 15) +
      drawRing(5, 8, 9, 9, shade(c, 22), 0) +
      drawCircle(50, 50, 4, gold);

  } else if (shape == "ranunculus") {
    inner = drawCircle(50, 50, 40, shade(c, -28)) +
      drawRing(10, 25, 11, 13, c, 0) +
      drawRing(8, 16, 9, 10, shade(c, 10), 10) +
      drawRing(6, 8, 7, 8, shade(c, 20), 0) +
      drawCircle(50, 50, 3.5, shade(c, -30));

  } else if (shape == "dahlia") {
    inner = drawRing(16, 30, 5.5, 16, shade(c, -12), 0) +
      drawRing(12, 22, 5, 12, c, 10) +
      drawRing(8, 13, 4.5, 8.5, shade(c, 14), 0) +
      drawCircle(50, 50, 6, shade(c, 24));

  } else if (shape == "gerbera") {
    inner = drawRing(15, 31, 5, 15, c, 0) +
      drawCircle(50, 50, 11, shade(c, -45)) +
      drawCircle(50, 50, 6, gold);

  } else if (shape == "sunflower") {
    inner = drawRing(18, 33, 5, 13, c, 0) +
      drawRing(12, 25, 5, 10, shade(c, -20), 15) +
      drawCircle(50, 50, 20, "#5a3a1e") +
      drawCircle(50, 50, 12, "#7a5230") +
      drawCircle(50, 50, 5, "#4a2e16");

  } else if (shape == "star") {
    inner = drawRing(28, 33, 2.6, 14, c, 0) +
      drawRing(20, 24, 2.6, 10, shade(c, 12), 5) +
      drawRing(12, 14, 2.6, 6, shade(c, 22), 0) +
      drawCircle(50, 50, 5, gold);

  } else if (shape == "ruffle") {
    inner = drawRing(14, 34, 9, 9, c, 0) +
      drawRing(10, 23, 9, 9, shade(c, 10), 12) +
      drawRing(6, 12, 8, 8, shade(c, 20), 0) +
      drawCircle(50, 50, 5, shade(c, -15));

  } else if (shape == "tulip") {
    inner = drawCircle(50, 50, 40, shade(c, -25)) +
      drawRing(6, 22, 12, 20, c, 0) +
      drawCircle(50, 50, 12, shade(c, -15)) +
      drawCircle(50, 50, 7, gold);

  } else if (shape == "lily") {
    inner = drawRing(6, 28, 9, 21, c, 0) +
      drawRing(6, 24, 2.5, 14, shade(c, -35), 0) +
      drawRing(6, 10, 1.8, 7, shade(c, -40), 30) +
      drawCircle(50, 50, 5, gold);

  } else if (shape == "orchid") {
    inner = drawRing(5, 24, 13, 20, c, 0) +
      drawCircle(50, 58, 9, shade(c, -30)) +
      drawCircle(50, 50, 3.5, gold);

  } else if (shape == "cup") {
    inner = drawRing(5, 25, 17, 17, c, 0) +
      drawRing(5, 12, 11, 11, shade(c, 12), 36) +
      drawCircle(50, 50, 6, shade(c, -25)) +
      drawCircle(50, 50, 2.5, gold);

  } else if (shape == "cluster") {
    // a hydrangea: many small flowers together
    let spots = [[50, 50], [50, 24], [50, 76], [26, 37], [74, 37], [26, 63], [74, 63]];
    for (let i = 0; i < spots.length; i++) {
      let x = spots[i][0];
      let y = spots[i][1];
      inner = inner + drawCircle(x - 5, y, 6.5, c) + drawCircle(x + 5, y, 6.5, c) +
        drawCircle(x, y - 5, 6.5, c) + drawCircle(x, y + 5, 6.5, c) +
        drawCircle(x, y, 2.5, shade(c, -25));
    }

  } else if (shape == "filler") {
    // baby's breath: tiny flowers on thin stems
    let dots = [[50, 50], [36, 40], [64, 42], [42, 62], [60, 60], [26, 54], [74, 52],
      [50, 28], [34, 26], [66, 28], [50, 74], [28, 72], [72, 72], [50, 12]];
    for (let i = 0; i < dots.length; i++) {
      inner = inner + '<line x1="50" y1="50" x2="' + dots[i][0] + '" y2="' + dots[i][1] + '" stroke="#7aa07a" stroke-width="0.8"/>';
    }
    for (let i = 0; i < dots.length; i++) {
      inner = inner + drawCircle(dots[i][0], dots[i][1], 5, c);
    }

  } else {
    // if the shape is not known, draw a simple round flower
    inner = drawRing(8, 25, 12, 14, c, 0) + drawCircle(50, 50, 8, gold);
  }

  let title = "";
  if (titleText != "") {
    title = "<title>" + titleText + "</title>";
  }

  return '<svg viewBox="0 0 100 100" ' + attrs + '>' + title + inner + '</svg>';
}

// a drawn flower with a stem and a leaf (used in the bouquet when the picture is not there yet)
function getStemmedFlowerSvg(shape, colour, attrs, titleText) {
  let head = getFlowerSvg(shape, colour, 'x="10" y="0" width="80" height="80"', "");

  let stem = '<path d="M50 78 Q54 170 50 260" fill="none" stroke="#5b8a5b" stroke-width="4" stroke-linecap="round"/>' +
    '<ellipse cx="62" cy="150" rx="13" ry="6" fill="#6f9a5f" stroke="' + lineColour + '" stroke-width="0.7" transform="rotate(-35 62 150)"/>';

  let title = "";
  if (titleText != "") {
    title = "<title>" + titleText + "</title>";
  }

  return '<svg viewBox="0 0 100 260" ' + attrs + '>' + title + stem + head + '</svg>';
}


// ---------- undo and redo ----------

// saves the bouquet as a new step
function saveState() {
  // throw away the steps after this one (the redo steps)
  savedStates = savedStates.slice(0, stateIndex + 1);
  savedStates.push(JSON.stringify(bouquet));
  stateIndex = savedStates.length - 1;
}

function undo() {
  if (stateIndex > 0) {
    stateIndex = stateIndex - 1;
    bouquet = JSON.parse(savedStates[stateIndex]);
    refreshAll();
  }
}

function redo() {
  if (stateIndex < savedStates.length - 1) {
    stateIndex = stateIndex + 1;
    bouquet = JSON.parse(savedStates[stateIndex]);
    refreshAll();
  }
}

function startOver() {
  bouquet = {
    flowers: [],
    wrapperColour: "",
    ribbonType: "",
    ribbonColour: ""
  };
  saveState();
  refreshAll();
  goToStep(1);
}


// ---------- step 1: the flowers ----------

// draws the flower cards (only the ones that match the search)
function showFlowerCards() {
  let box = document.getElementById("flower-cards");
  let scroll = box.scrollTop;
  let search = document.getElementById("search").value.toLowerCase().trim();
  let html = "";

  for (let i = 0; i < flowers.length; i++) {
    let flower = flowers[i];

    // skip the flowers that do not match the search
    if (search != "" && flower.name.toLowerCase().indexOf(search) == -1) {
      continue;
    }

    let qty = getQty(flower.name);

    // the picture if it is there, if not the drawn flower
    let pictureHtml = getFlowerSvg(flower.shape, flower.colour, 'class="card-flower"', "");
    if (imageOk[flower.image] == true) {
      pictureHtml = '<img class="card-picture" src="' + flower.image + '" alt="' + flower.name + '">';
    }

    let cardClass = "flower-card";
    if (qty > 0) {
      cardClass = "flower-card has-some";
    }

    html = html + '<div class="' + cardClass + '">' +
      '<div class="picture-box">' + pictureHtml + '</div>' +
      '<b>' + flower.name + '</b>' +
      '<small>$' + flower.price.toFixed(2) + ' per stem</small>' +
      '<div class="qty-row">' +
      '<button class="qty-btn" onclick="changeFlower(' + i + ', -1)">-</button>' +
      '<b>' + qty + '</b>' +
      '<button class="qty-btn" onclick="changeFlower(' + i + ', 1)">+</button>' +
      '</div>' +
      '</div>';
  }

  if (html == "") {
    html = '<p class="hint">No flowers found. Try another name.</p>';
  }

  box.innerHTML = html;
  box.scrollTop = scroll;
}

// the + and - buttons on a flower card
function changeFlower(index, amount) {
  let flower = flowers[index];
  let error = document.getElementById("step1-error");
  error.textContent = "";

  // do not go over the most flowers
  if (amount > 0 && countFlowers() >= maxFlowers) {
    error.textContent = "You can pick up to " + maxFlowers + " flowers.";
    return;
  }

  // find this flower in the bouquet
  let place = -1;
  for (let i = 0; i < bouquet.flowers.length; i++) {
    if (bouquet.flowers[i].name == flower.name) {
      place = i;
    }
  }

  if (place == -1) {
    // it is not in the bouquet yet
    if (amount < 0) {
      return;
    }
    bouquet.flowers.push({
      name: flower.name,
      image: flower.image,
      shape: flower.shape,
      colour: flower.colour,
      height: flower.height || 230,
      price: flower.price,
      qty: 1
    });
  } else {
    bouquet.flowers[place].qty = bouquet.flowers[place].qty + amount;

    // if it goes down to 0, take the flower out
    if (bouquet.flowers[place].qty < 1) {
      bouquet.flowers.splice(place, 1);
    }
  }

  saveState();
  refreshAll();
}

// takes out one flower (when the customer clicks a flower in the bouquet)
function removeOne(place) {
  bouquet.flowers[place].qty = bouquet.flowers[place].qty - 1;

  if (bouquet.flowers[place].qty < 1) {
    bouquet.flowers.splice(place, 1);
  }

  saveState();
  refreshAll();
}


// ---------- step 2: wrapper and ribbon ----------

// makes one colour button
function makeSwatch(label, colour, isSelected, clickText) {
  let cssClass = "swatch";
  if (isSelected) {
    cssClass = "swatch selected";
  }

  let dot = "";
  if (colour != "") {
    dot = '<span class="swatch-dot" style="background-color: ' + colourCodes[colour] + ';"></span>';
  }

  return '<button class="' + cssClass + '" onclick="' + clickText + '">' + dot + label + '</button>';
}

// shows the Wrapper or the Ribbon part
function showStyleTab(tab) {
  if (tab == "wrapper") {
    document.getElementById("wrapper-section").classList.remove("hidden");
    document.getElementById("ribbon-section").classList.add("hidden");
    document.getElementById("style-wrapper-btn").classList.add("selected");
    document.getElementById("style-ribbon-btn").classList.remove("selected");
  } else {
    document.getElementById("wrapper-section").classList.add("hidden");
    document.getElementById("ribbon-section").classList.remove("hidden");
    document.getElementById("style-wrapper-btn").classList.remove("selected");
    document.getElementById("style-ribbon-btn").classList.add("selected");
  }
}

// draws the wrapper colours
function showWrapperList() {
  document.getElementById("wrapper-title").textContent =
    wrapper.name + " (+$" + wrapper.price.toFixed(2) + ")";

  let html = makeSwatch("No wrapper", "", bouquet.wrapperColour == "", "chooseWrapper('')");

  for (let i = 0; i < wrapper.colours.length; i++) {
    let colour = wrapper.colours[i];
    html = html + makeSwatch(colour, colour, bouquet.wrapperColour == colour, "chooseWrapper('" + colour + "')");
  }

  document.getElementById("wrapper-list").innerHTML = html;
}

function chooseWrapper(colour) {
  bouquet.wrapperColour = colour;
  saveState();
  refreshAll();
}

// draws the ribbon buttons (and the satin colours)
function showRibbonList() {
  // the three buttons: no ribbon, satin, jute
  let noClass = "type-btn";
  if (bouquet.ribbonType == "") {
    noClass = "type-btn selected";
  }
  let html = '<button class="' + noClass + '" onclick="chooseRibbonType(\'\')">No ribbon</button>';

  for (let i = 0; i < ribbons.length; i++) {
    let cssClass = "type-btn";
    if (bouquet.ribbonType == ribbons[i].name) {
      cssClass = "type-btn selected";
    }
    html = html + '<button class="' + cssClass + '" onclick="chooseRibbonType(\'' + ribbons[i].name + '\')">' +
      ribbons[i].name + ' (+$' + ribbons[i].price.toFixed(2) + ')</button>';
  }

  document.getElementById("ribbon-types").innerHTML = html;

  // the colours (only for the satin ribbon)
  let area = document.getElementById("ribbon-colour-area");
  if (bouquet.ribbonType == "Satin ribbon") {
    area.classList.remove("hidden");

    let satin = findRibbon("Satin ribbon");
    let colourHtml = "";
    for (let i = 0; i < satin.colours.length; i++) {
      let colour = satin.colours[i];
      colourHtml = colourHtml + makeSwatch(colour, colour, bouquet.ribbonColour == colour, "chooseRibbonColour('" + colour + "')");
    }
    document.getElementById("ribbon-list").innerHTML = colourHtml;
  } else {
    area.classList.add("hidden");
  }
}

function chooseRibbonType(type) {
  bouquet.ribbonType = type;

  // the satin ribbon starts with its first colour
  if (type == "Satin ribbon") {
    if (bouquet.ribbonColour == "") {
      bouquet.ribbonColour = findRibbon("Satin ribbon").colours[0];
    }
  } else {
    bouquet.ribbonColour = "";
  }

  saveState();
  refreshAll();
}

function chooseRibbonColour(colour) {
  bouquet.ribbonColour = colour;
  saveState();
  refreshAll();
}


// ---------- step 3: the card ----------

// when the customer picks a card
function chooseCard() {
  let card = getCard();
  let box = document.getElementById("card-box");

  // show the message box only for cards that need a message
  if (card.needsMessage) {
    box.classList.remove("hidden");
  } else {
    box.classList.add("hidden");
  }

  document.getElementById("step3-error").textContent = "";
  showPreview();
  showReview();
}


// ---------- the virtual bouquet (the picture on the left) ----------

// the paper behind the flowers (nothing if there is no wrapper)
function getWrapperBackSvg() {
  let html = "";

  if (bouquet.wrapperColour != "") {
    // the inside of the paper
    let c = colourCodes[bouquet.wrapperColour];
    html = '<polygon points="20,60 75,18 150,30 225,18 280,60 255,230 150,340 45,230" ' +
      'fill="' + shade(c, -22) + '" stroke="' + lineColour + '" stroke-width="0.8" stroke-linejoin="round"/>';
  }

  return '<svg class="wrapper-svg wrapper-back" viewBox="0 0 300 420">' + html + '</svg>';
}

// the bow or the string (it goes on the narrow part of the wrapper)
function getBowSvg() {
  if (bouquet.ribbonType == "Satin ribbon") {
    let c = colourCodes[bouquet.ribbonColour];
    return '<g stroke="' + lineColour + '" stroke-width="0.8" stroke-linejoin="round">' +
      // the two tails
      '<polygon points="146,322 118,394 138,388 152,326" fill="' + shade(c, -12) + '"/>' +
      '<polygon points="154,322 182,394 162,388 148,326" fill="' + shade(c, -4) + '"/>' +
      // the two loops
      '<ellipse cx="118" cy="314" rx="30" ry="14" transform="rotate(-18 118 314)" fill="' + c + '"/>' +
      '<ellipse cx="182" cy="314" rx="30" ry="14" transform="rotate(18 182 314)" fill="' + c + '"/>' +
      '<ellipse cx="118" cy="314" rx="17" ry="6" transform="rotate(-18 118 314)" fill="' + shade(c, 20) + '" stroke="none"/>' +
      '<ellipse cx="182" cy="314" rx="17" ry="6" transform="rotate(18 182 314)" fill="' + shade(c, 20) + '" stroke="none"/>' +
      // the knot
      '<ellipse cx="150" cy="320" rx="11" ry="10" fill="' + shade(c, -20) + '"/>' +
      '</g>';
  }

  if (bouquet.ribbonType == "Jute string") {
    return '<g fill="none" stroke="#b08968" stroke-linecap="round">' +
      '<path d="M128 318 Q150 330 172 318" stroke-width="5"/>' +
      '<path d="M148 328 Q140 355 128 380" stroke-width="3"/>' +
      '<path d="M152 328 Q160 355 172 380" stroke-width="3"/>' +
      '<circle cx="150" cy="324" r="5" fill="#a07858" stroke="' + lineColour + '" stroke-width="0.6"/>' +
      '</g>';
  }

  return "";
}

// the paper in front of the flowers, with the folds and the bow
function getWrapperFrontSvg() {
  let html = "";

  if (bouquet.wrapperColour != "") {
    let c = colourCodes[bouquet.wrapperColour];
    let line = 'stroke="' + lineColour + '" stroke-width="0.8" stroke-linejoin="round"';

    html = html +
      // the paper at the bottom
      '<polygon points="132,318 168,318 200,402 150,375 100,402" fill="' + shade(c, -14) + '" ' + line + '/>' +
      // the main paper
      '<polygon points="10,80 150,210 290,80 240,250 150,335 60,250" fill="' + c + '" ' + line + '/>' +
      // the folds
      '<polygon points="10,80 150,210 116,300 60,250" fill="' + shade(c, 10) + '" ' + line + '/>' +
      '<polygon points="290,80 150,210 184,300 240,250" fill="' + shade(c, -10) + '" ' + line + '/>' +
      '<polyline points="150,210 150,335" fill="none" ' + line + '/>';
  }

  html = html + getBowSvg();

  return '<svg class="wrapper-svg wrapper-front" viewBox="0 0 300 420">' + html + '</svg>';
}

// makes a list with every single flower, one by one
// it takes one of each flower again and again, so the flowers are mixed
function getFlowerList() {
  let left = [];
  for (let i = 0; i < bouquet.flowers.length; i++) {
    left.push(bouquet.flowers[i].qty);
  }

  let list = [];
  let stillLeft = true;
  while (stillLeft) {
    stillLeft = false;

    for (let j = 0; j < bouquet.flowers.length; j++) {
      if (left[j] > 0) {
        let item = bouquet.flowers[j];
        list.push({
          index: j,
          name: item.name,
          image: item.image,
          shape: item.shape,
          colour: item.colour,
          height: item.height,
          hasPicture: imageOk[item.image] == true
        });
        left[j] = left[j] - 1;
        stillLeft = true;
      }
    }
  }

  return list;
}

// the angle of flower number "index" in the fan
// the first flower is in the middle, then they go to the right and to the left
function getFanAngle(index, total) {
  if (index == 0) {
    return 0;
  }

  let place = Math.ceil(index / 2);
  if (index % 2 == 0) {
    place = -place;
  }

  // the fan is never wider than 32 degrees on each side
  let biggest = Math.ceil((total - 1) / 2);
  let step = 8;
  if (biggest * step > 32) {
    step = 32 / biggest;
  }

  return place * step;
}

// makes the html of the whole bouquet picture
function getStageHtml() {
  let list = getFlowerList();
  let html = '<div class="stage-tip">Click a flower to take it out</div>';

  // the paper (or stems) behind the flowers
  html = html + getWrapperBackSvg();

  // we show 40 flowers at most
  let shown = list.length;
  if (shown > 40) {
    shown = 40;
  }

  // draw the outer flowers first, so the middle ones are on top
  for (let i = shown - 1; i >= 0; i--) {
    let flower = list[i];
    let angle = getFanAngle(i, shown);

    // the flowers have 3 different heights, so the bouquet looks round
    let rows = [1, 0.88, 0.76];
    let height = flower.height * rows[i % 3];

    // all the stems end at the same point (the bottom is at 330)
    let style = 'left: 50%; top: ' + (330 - height).toFixed(1) + 'px; height: ' + height.toFixed(1) + 'px; ' +
      'transform: translateX(-50%) rotate(' + angle.toFixed(1) + 'deg);';

    if (flower.hasPicture) {
      html = html + '<img class="stage-flower" style="' + style + '" src="' + flower.image +
        '" alt="' + flower.name + '" title="' + flower.name + '" onclick="removeOne(' + flower.index + ')">';
    } else {
      // no picture yet: draw the flower with a stem
      style = style + ' width: ' + (height * 100 / 260).toFixed(1) + 'px;';
      html = html + getStemmedFlowerSvg(flower.shape, flower.colour,
        'class="stage-flower" style="' + style + '" onclick="removeOne(' + flower.index + ')"',
        flower.name);
    }
  }

  // the paper and the bow in front of the flowers
  html = html + getWrapperFrontSvg();

  // if there are no flowers yet
  if (list.length == 0) {
    html = html + '<div class="stage-empty">Your bouquet is empty. Pick some flowers to start.</div>';
  }

  // if there are more flowers than we can show
  if (list.length > shown) {
    html = html + '<div class="stage-more">+ ' + (list.length - shown) + ' more flowers</div>';
  }

  return html;
}

// draws the bouquet, the small tags, the counter and the price
function showPreview() {
  let count = countFlowers();

  document.getElementById("preview").innerHTML = getStageHtml();
  document.getElementById("count-text").textContent = count + " / " + maxFlowers + " flowers selected";

  let countText = count + " flowers";
  if (count == 1) {
    countText = "1 flower";
  }
  document.getElementById("flower-count").textContent = countText;

  // the small tags under the bouquet
  let tags = "";

  if (bouquet.wrapperColour != "") {
    tags = tags + '<span class="extra-chip">' + wrapper.name + ' (' + bouquet.wrapperColour + ')</span>';
  }

  if (bouquet.ribbonType == "Satin ribbon") {
    tags = tags + '<span class="extra-chip">Satin ribbon (' + bouquet.ribbonColour + ')</span>';
  }
  if (bouquet.ribbonType == "Jute string") {
    tags = tags + '<span class="extra-chip">Jute string</span>';
  }

  let card = getCard();
  if (card.id != "none") {
    let cardText = card.name + " (Free)";
    if (card.price > 0) {
      cardText = card.name + " ($" + card.price.toFixed(2) + ")";
    }
    tags = tags + '<span class="extra-chip">' + cardText + '</span>';
  }

  document.getElementById("preview-extras").innerHTML = tags;
  document.getElementById("total-price").textContent = "$" + getTotal().toFixed(2);

  // the undo and redo buttons
  document.getElementById("undo-btn").disabled = (stateIndex <= 0);
  document.getElementById("redo-btn").disabled = (stateIndex >= savedStates.length - 1);
}


// ---------- step 4: review ----------

function showReview() {
  let html = "";

  // the flowers
  for (let i = 0; i < bouquet.flowers.length; i++) {
    let flower = bouquet.flowers[i];
    html = html + '<div class="review-line"><span>' + flower.name + ' x ' + flower.qty +
      '</span><span>$' + (flower.price * flower.qty).toFixed(2) + '</span></div>';
  }

  if (html == "") {
    html = '<p class="hint">No flowers yet. Go back to step 1 and pick some flowers.</p>';
  }

  // the wrapper
  if (bouquet.wrapperColour != "") {
    html = html + '<div class="review-line"><span>' + wrapper.name + ' (' + bouquet.wrapperColour +
      ')</span><span>$' + wrapper.price.toFixed(2) + '</span></div>';
  }

  // the ribbon
  if (bouquet.ribbonType != "") {
    let ribbonText = bouquet.ribbonType;
    if (bouquet.ribbonColour != "") {
      ribbonText = ribbonText + " (" + bouquet.ribbonColour + ")";
    }
    html = html + '<div class="review-line"><span>' + ribbonText +
      '</span><span>$' + findRibbon(bouquet.ribbonType).price.toFixed(2) + '</span></div>';
  }

  // the card and the message
  let card = getCard();
  if (card.id != "none") {
    let priceText = "Free";
    if (card.price > 0) {
      priceText = "$" + card.price.toFixed(2);
    }
    html = html + '<div class="review-line"><span>' + card.name + '</span><span>' + priceText + '</span></div>';

    let message = document.getElementById("card-message").value.trim();
    if (card.needsMessage && message != "") {
      html = html + '<div class="review-message">"' + cleanText(message) + '"</div>';
    }
  }

  html = html + '<div class="review-total"><span>Total</span><span>$' + getTotal().toFixed(2) + '</span></div>';

  document.getElementById("review-box").innerHTML = html;
}


// ---------- going from step to step ----------

// draws everything again
function refreshAll() {
  showFlowerCards();
  showWrapperList();
  showRibbonList();
  showPreview();
  showReview();
}

function goToStep(n) {
  // you need at least one flower to leave step 1
  if (n > 1 && countFlowers() == 0) {
    document.getElementById("step1-error").textContent = "Please add at least one flower first.";
    n = 1;
  }

  step = n;

  // show only the step we are on
  for (let i = 1; i <= 4; i++) {
    if (i == step) {
      document.getElementById("step" + i).classList.remove("hidden");
      document.getElementById("tab" + i).classList.add("active");
    } else {
      document.getElementById("step" + i).classList.add("hidden");
      document.getElementById("tab" + i).classList.remove("active");
    }
  }

  // the back button is hidden on step 1
  if (step == 1) {
    document.getElementById("back-btn").classList.add("hidden");
  } else {
    document.getElementById("back-btn").classList.remove("hidden");
  }

  // the text on the next button
  let nextTexts = ["", "Next: choose a style", "Next: pick your card", "Next: review", "Save my bouquet"];
  document.getElementById("next-btn").textContent = nextTexts[step];

  if (step == 4) {
    showReview();
  }
}

function goNext() {
  // on the last step the button saves the bouquet
  if (step == 4) {
    saveBouquet();
    return;
  }

  // on step 3 the card message must be written (if the card needs one)
  if (step == 3) {
    let card = getCard();
    let message = document.getElementById("card-message").value.trim();

    if (card.needsMessage && message == "") {
      document.getElementById("step3-error").textContent = "Please write the message for your card, or choose another card.";
      return;
    }
    document.getElementById("step3-error").textContent = "";
  }

  goToStep(step + 1);
}

function goBack() {
  goToStep(step - 1);
}


// ---------- save the bouquet ----------

function saveBouquet() {
  let error = document.getElementById("save-error");
  error.textContent = "";

  let card = getCard();

  // only read the message if this card needs one
  let message = "";
  if (card.needsMessage) {
    message = document.getElementById("card-message").value.trim();
  }

  if (countFlowers() == 0) {
    error.textContent = "Please add at least one flower.";
    return;
  }

  if (card.needsMessage && message == "") {
    error.textContent = "Please write the message for your card, or choose another card.";
    return;
  }

  if (message.length > 150) {
    error.textContent = "Card message is too long (150 letters only).";
    return;
  }

  // the ribbon as text
  let ribbonText = "None";
  if (bouquet.ribbonType != "") {
    ribbonText = bouquet.ribbonType;
    if (bouquet.ribbonColour != "") {
      ribbonText = ribbonText + " (" + bouquet.ribbonColour + ")";
    }
  }

  // the wrapper as text
  let wrapperText = "None";
  if (bouquet.wrapperColour != "") {
    wrapperText = wrapper.name + " (" + bouquet.wrapperColour + ")";
  }

  // put everything together
  let order = {
    flowers: bouquet.flowers,
    totalFlowers: countFlowers(),
    wrapper: wrapperText,
    ribbon: ribbonText,
    card: card.name,
    cardPrice: card.price,
    cardMessage: message,
    estimatedPrice: getTotal()
  };

  console.log(order);

  // TODO: send "order" to the database developer's code
  // (they will tell us the link / file to send it to)

  let successText = "Your bouquet was saved! Total: $" + getTotal().toFixed(2);
  if (card.id == "none") {
    successText = successText + " (no card)";
  } else {
    successText = successText + " (" + card.name + ")";
  }

  document.getElementById("success").classList.remove("hidden");
  document.getElementById("success-text").textContent = successText;
}


// ---------- start ----------
saveState();
refreshAll();
goToStep(1);
checkPictures();
