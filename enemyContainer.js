function EnemyContainerBar() {
  return (
    <div class="enemy-container-bar">
      <div class="enemy-container">
        <label for="input-Monster" class="addMonster">
          Add
        </label>
        <input
          id="input-Monster"
          class="addMonster"
          type="file"
          onChange={() => importData()}
          style={{ visibility: "hidden" }}
        />
        <div id="initiativeTracker">
          <h1>Initiative</h1>
          <h2 id="initiativeTrackerTEXTE">PAUSED</h2>
        </div>
        <div class="fakeDice">
          <h3>Roll</h3>
          <p id="result">0</p>
          <p>=</p>
          <ul class="rollLog" id="rollLog"></ul>
        </div>
        <p class="diceCheatSheet">
          1 = d4, 2 = d6, 3 = d8, 4 = d10, 5 = d12, 6 = d20, 7 = d100
        </p>
        <ul class="enemy-list" id="enemy-list"></ul>
      </div>
      <div class="bar"></div>
    </div>
  );
}

//name:"",  initiative:"", hitPoint:hitPoint, ac:""
function EnemyTemplate(parms) {
  return (
    <li class="enemy-template" id={parms.id} value={parms.initiative}>
      <div onClick={() => selectionned(parms.id)}>
        <input
          type="text"
          class="NameMod"
          name="fname"
          defaultValue="..."
          defaultValue={parms.name}
          id={parms.id + "Name"}
          onFocus={() => hasfocus(parms.id + "Init")}
        ></input>
        <ul class="stats">
          <li>
            <h3 class="stats-title">Initiative</h3>{" "}
            <input
              type="text"
              class="InitMod"
              name="fname"
              defaultValue={parms.initiative}
              id={parms.id + "Init"}
              onFocus={() => hasfocus(parms.id + "Init")}
            ></input>
          </li>
          <li>|</li>
          <li>
            <h3 class="stats-title">Hit Points</h3>{" "}
            <input
              type="text"
              class="hpMod"
              name="fname"
              defaultValue={parms.hitPoint}
              id={parms.id + "hpMod"}
              onFocus={() => hasfocus(parms.id + "hpMod")}
            ></input>
          </li>
          <li>|</li>
          <li>
            <h3 class="stats-title">Armor Class</h3>{" "}
            <input
              type="text"
              class="ACMod"
              name="fname"
              defaultValue={parms.ac}
              id={parms.id + "AC"}
              onFocus={() => hasfocus(parms.id + "AC")}
            ></input>
          </li>

          <li>
            <button class="delete-map" onClick={() => remove(parms.id)}>
              <i class="fa fa-trash" aria-hidden="true"></i>
            </button>{" "}
            <button
              class="copie-map"
              onClick={() =>
                addMonster(
                  document.getElementById(parms.id + "Name").value,
                  document.getElementById(parms.id + "Init").value,
                  document.getElementById(parms.id + "hpMod").value,
                  document.getElementById(parms.id + "AC").value,
                  parms.image
                )
              }
            >
              <i class="far fa-sticky-note" aria-hidden="true"></i>
            </button>{" "}
          </li>
        </ul>

        <svg height="5" width="100%" class="tapered-rule">
          <polyline points="0,0 400,2.5 0,5"></polyline>
        </svg>
      </div>
    </li>
  );
}
