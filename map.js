function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      document.getElementById("plaground").style.backgroundImage =
        "url(" + e.target.result + ")";

      document.getElementById("input-map").style.display = "none";
      document.getElementById("plaground").style.display = "block";
    };

    reader.readAsDataURL(input.files[0]);
  }
}

function removeMap() {
  document.getElementById("input-map").style.display = "block";
  document.getElementById("plaground").style.display = "none";
}

$(document).ready(function () {
  $("#plaground").draggable().resizable();
});

$(document).ready(function () {
  $("#token-size").resizable();
});

$("#input-Monster").change(function () {
  filename = this.files[0].name;
});

function rezizeToken() {
  for (const e of document.getElementsByClassName("token")) {
    e.style.width = document.getElementById("token-size").style.width;
    e.style.height = document.getElementById("token-size").style.height;
  }
}

$(document).ready(function () {
  //jsfiddle.net/fcLzqp5o/#run
  http: $("button").click(function () {
    $("#lio").css("overflow-y", "scroll");
  });
});

function remove(el) {
  document.getElementById(el).remove();
  document.getElementById(el + "token").style.opacity = "0";
  document.getElementById(el + "token").onclick = "";
  document.getElementById(el + "token").style.zIndex = -1000;
}

var intervalId = window.setInterval(function () {}, 1000);

idConteur = 0;

function importData() {
  console.log("hit");
  input = document.getElementById("input-Monster");
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (f) {
      addNewMonster(f.target.result);
    };

    reader.readAsDataURL(input.files[0]);
  }
}

function addNewMonster(image) {
  // Créez une instance de l'objet EnemyTemplate avec l'ID "sleil"
  var enemy = new EnemyTemplate({
    id: idConteur,
    name: "",
    initiative: "",
    hitPoint: "",
    ac: "",
    image: image,
  });

  // Obtenez l'élément "ul" avec l'ID "enemy-list"
  var enemyList = document.getElementById("enemy-list");

  // Créez un nouvel élément de liste "li"
  var listItem = document.createElement("li");
  listItem.id = idConteur;
  enemyList.appendChild(listItem);
  ReactDOM.render(enemy, listItem);

  var token = document.createElement("div");
  token.id = idConteur + "token";
  token.onclick = () => selectionned(token.id);
  token.className = "token";
  playground = document.getElementById("plaground");
  playground.appendChild(token);
  token.style.backgroundImage = "url(" + image + ")";
  $("#" + token.id).draggable();

  idConteur++;
}

function addMonster(name, initiative, hitPoint, ac, image) {
  // Créez une instance de l'objet EnemyTemplate avec l'ID "sleil"
  var enemy = new EnemyTemplate({
    id: idConteur,
    name: name,
    initiative: initiative,
    hitPoint: hitPoint,
    ac: ac,
    image: image,
  });
  console.log(enemy);

  // Obtenez l'élément "ul" avec l'ID "enemy-list"
  var enemyList = document.getElementById("enemy-list");

  // Créez un nouvel élément de liste "li"
  var listItem = document.createElement("li");
  listItem.id = idConteur;
  enemyList.appendChild(listItem);
  ReactDOM.render(enemy, listItem);

  var token = document.createElement("div");
  token.id = idConteur + "token";
  token.className = "token";
  token.onclick = () => selectionned(token.id);
  playground = document.getElementById("plaground");
  playground.appendChild(token);
  token.style.backgroundImage = "url(" + image + ")";
  $("#" + token.id).draggable();

  idConteur++;
}

function selectionned(id) {
  properId = String(id).replace("token", "");
  if (id != properId) {
    location.href = "#" + properId;
  }
  for (const e of document.getElementsByClassName("selectionnedLi")) {
    e.className = e.className.replace(" selectionnedLi", "");
  }
  for (const e of document.getElementsByClassName("selectionnedToken")) {
    e.className = e.className.replace(" selectionnedToken", "");
  }
  document.getElementById(properId).className =
    document.getElementById(properId).className + " selectionnedLi";
  document.getElementById(properId + "token").className =
    document.getElementById(properId + "token").className +
    " selectionnedToken";
}

function nextSlidePlease(e) {
  if (e.keyCode == 39) {
    tracker = document.getElementById("initiativeTrackerTEXTE");

    tour = tracker.textContent;

    if (tour == "PAUSED") {
      max = 0;
      for (const e of document.getElementsByClassName("InitMod")) {
        console.log(e);
        if (max < parseInt(e.value)) {
          max = parseInt(e.value);
        }
      }

      value = max;
    } else if (parseInt(tour) - 1 == -1) {
      value = "PAUSED";
    } else {
      max = 0;
      for (const e of document.getElementsByClassName("InitMod")) {
        if (max < parseInt(e.value) && parseInt(e.value) < parseInt(tour)) {
          max = parseInt(e.value);
        }
      }
      value = max;
    }
    tracker.value = value;
    document.getElementById("initiativeTrackerTEXTE").textContent = value;

    clearCurrentTurn();
    clearCurrentTurn();
    clearCurrentTurn();
    for (const e of document.getElementsByClassName("InitMod")) {
      if (e.value == value) {
        currentTurn(String(e.id).replace("Init", ""));
      }
    }
  }
}

function currentTurn(id) {
  properId = id;

  document.getElementById(properId).className =
    document.getElementById(properId).className + " currentTurnLi";
  document.getElementById(properId + "token").className =
    document.getElementById(properId + "token").className + " currentTurnToken";
}

function clearCurrentTurn() {
  for (const e of document.getElementsByClassName("currentTurnLi")) {
    e.className = e.className.replace(" currentTurnLi", "");
    console.log(e.id);
  }
  for (const e of document.getElementsByClassName("currentTurnToken")) {
    e.className = e.className.replace(" currentTurnToken", "");
  }
}
function getRandomInt(max) {
  return Math.floor(Math.random() * max) + 1;
}

rollid = 0;
totalroll = 0;
focused_item_id = "";
document.body.onkeyup = function (e) {
  rollid += 1;
  nextSlidePlease(e);
  log = document.getElementById("rollLog");
  var roll = document.createElement("li");
  //d4
  if (e.keyCode == 49) {
    nb = getRandomInt(4);
    totalroll += nb;
    roll.textContent = "+ " + nb + "/4";
    log.appendChild(roll);
  }
  //d6
  if (e.keyCode == 50) {
    nb = getRandomInt(6);
    totalroll += nb;
    roll.textContent = "+ " + nb + "/6";
    log.appendChild(roll);
  }
  //d8
  if (e.keyCode == 51) {
    nb = getRandomInt(8);
    totalroll += nb;
    roll.textContent = "+ " + nb + "/8";
    log.appendChild(roll);
  }
  //d10
  if (e.keyCode == 52) {
    nb = getRandomInt(10);
    totalroll += nb;
    roll.textContent = "+ " + nb + "/10";
    log.appendChild(roll);
  }
  //d12
  if (e.keyCode == 53) {
    nb = getRandomInt(12);
    totalroll += nb;
    roll.textContent = "+ " + nb + "/12";
    log.appendChild(roll);
  }
  //d20
  if (e.keyCode == 54) {
    nb = getRandomInt(20);
    totalroll += nb;
    roll.textContent = "+ " + nb + "/20";
    log.appendChild(roll);
  }
  //d100
  if (e.keyCode == 55) {
    nb = getRandomInt(100);
    totalroll += nb;
    roll.textContent = "+ " + nb + "/100";
    log.appendChild(roll);
  }
  //reset
  if (e.keyCode == 40) {
    totalroll = 0;
    log.innerHTML = "";
  }

  //past
  if (e.keyCode == 38) {
    if (focused_item_id != "") {
      if (focused_item_id.includes("Init")) {
        document.getElementById(focused_item_id).value = totalroll;
      }
    }
  }

  //remove
  if (e.keyCode == 37) {
    if (focused_item_id.includes("hpMod")) {
      input = prompt("DEGATS");
      if (Number.isInteger(parseInt(input))) {
        document.getElementById(focused_item_id).value =
          document.getElementById(focused_item_id).value - parseInt(input);
      }
    }
  }
  document.getElementById("result").textContent = totalroll;
};

function hasfocus(id) {
  focused_item_id = id;
}

function hasnotfocus(id) {
  if (focused_item_id == id) {
    focused_item_id = "";
  }
}

function updateGrid() {
  document.getElementById("plagroundGRID").style.gridTemplateColumns = "";
  document.getElementById("plagroundGRID").style.gridTemplateRows = "";
  document.getElementById("plagroundGRID").innerHTML = "";

  for (let e = 0; e < document.getElementById("gridX").value; e++) {
    document.getElementById("plagroundGRID").style.gridTemplateColumns =
      document.getElementById("plagroundGRID").style.gridTemplateColumns +
      " " +
      document.getElementById("sizeXY").value +
      "px";

    document.getElementById("plagroundGRID").style.gridTemplateRows =
      document.getElementById("plagroundGRID").style.gridTemplateRows +
      " " +
      document.getElementById("sizeXY").value +
      "px";

    for (let i = 0; i < document.getElementById("gridY").value; i++) {
      var container = document.createElement("div");
      container.className = "item";
      document.getElementById("plagroundGRID").appendChild(container);
    }
  }
}
