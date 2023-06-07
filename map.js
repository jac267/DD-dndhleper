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
  for (const e of document.getElementsByClassName("token")) {
    console.log(e.id);
  }
});

$(document).ready(function () {
  $("#token-size").resizable();
});

$("#input-Monster").change(function () {
  filename = this.files[0].name;
  console.log(filename);
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

document.body.onkeyup = function (e) {
  if (e.key == " " || e.code == "Space" || e.keyCode == 32) {
    tracker = document.getElementById("initiativeTrackerTEXTE");

    tour = tracker.textContent;

    if (tour == "PAUSED") {
      max = 0;
      for (const e of document.getElementsByClassName("InitMod")) {
        if (max < e.value) {
          max = e.value;
        }
      }

      value = max;
    } else if (parseInt(tour) - 1 == -1) {
      value = "PAUSED";
    } else {
      max = 0;
      for (const e of document.getElementsByClassName("InitMod")) {
        console.log(parseInt(tour));
        if (max < e.value && e.value < parseInt(tour)) {
          max = e.value;
        }
      }
      value = max;
    }
    tracker.value = value;
    document.getElementById("initiativeTrackerTEXTE").textContent = value;

    clearCurrentTurn();
    for (const e of document.getElementsByClassName("InitMod")) {
      if (e.value == value) {
        console.log(String(e.id).replace("Init", ""));
        currentTurn(String(e.id).replace("Init", ""));
      }
    }
  }
};

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
  }
  for (const e of document.getElementsByClassName("currentTurnToken")) {
    e.className = e.className.replace(" currentTurnToken", "");
  }
}
