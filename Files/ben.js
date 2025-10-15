var spriteBen = document.getElementById("benContainer");
var rightPos = rightMostPos(spriteBen);
// Flag to track whether the game is active. Set to false when game over.
var gameRunning = true;

// Show GameStart initially and hide after 5 seconds
(function manageGameStartVisibility() {
  var gs = document.getElementById("GameStart");
  if (!gs) return;
  // Ensure it's visible on load
  gs.style.display = "";
  // After 5 seconds hide the element
  window.setTimeout(function () {
    gs.style.display = "none";
  }, 5000);
})();

function uniCharCode(event) {
  var char = event.which || event.keyCode;
  console.log(char);
  // If the game is over only allow restart with 'r' (114)
  if (!gameRunning) {
    if (char == 114) {
      // reload page to restart quickly
      window.location.reload();
    }
    return;
  }
  if (char == 120) {
    // ===========================CHAR IS X======================================
    benClasslist = spriteBen.classList;
    if (
      !(
        benClasslist.contains("benWalk") ||
        benClasslist.contains("benTransform") ||
        benClasslist.contains("transform") ||
        benClasslist.contains("attack")
      )
    )
      DiamondHeadAttack();
  } else if (char == 122) {
    // ===========================CHAR IS Y======================================
    transformBen();
  } else if (char == 121) {
    var body = document.getElementsByClassName("mainBody")[0];
    var roadLine = document.getElementById("line");
    body.classList.remove("start");
    body.classList.add("paused");
    roadLine.style.animationPlayState = "paused";
  } else if (char == 115) {
    var body = document.getElementsByClassName("mainBody")[0];
    var roadLine = document.getElementById("line");
    body.classList.remove("paused");
    body.classList.add("start");
    roadLine.style.animationPlayState = "running";
    console.log(body.classList);
  }
}

function rightMostPos(sprite) {
  var leftPos = sprite.offsetLeft;
  var rightPos = sprite.offsetWidth + leftPos;

  return rightPos;
}

function transformBen() {
  //  var spriteBen=document.getElementById("BEN");

  //  var container=spriteBen.parentNode;
  //  var containerWidth=getComputedStyle(container,null).getPropertyValue("width");
  //  var containerHeight=getComputedStyle(container,null).getPropertyValue("height");
  //  var pixelSize= getComputedStyle(document.documentElement).getPropertyValue('--pixel-sizeb');
  //  container.style.width=(pixelSize*15)+"px";
  //  container.style.height=(pixelSize*29)+"px";
  spriteBen.classList.remove("benWalk");
  spriteBen.classList.add("benTransform");

  //  var DH=document.getElementById("diamondHead");

  window.setTimeout(() => {
    // container.classList.remove("spriteDiv");
    // container.removeChild(spriteBen);

    // var DH=document.createElement("img");
    // var DH_id=document.createAttribute("id");
    // container.classList.add("div");
    // container.appendChild(DH);
    // DH_id.value="diamondHead";
    // DH.setAttributeNode(DH_id);
    spriteBen.classList.remove("benTransform");
    spriteBen.classList.add("transform");
  }, 2000);
  window.setTimeout(() => {
    spriteBen.classList.remove("transform");
    spriteBen.classList.add("walk");
  }, 4000);

  rightPos = rightMostPos(spriteBen);
}
function DiamondHeadAttack() {
  //   var spriteBG=document.getElementsByClassName("div")[0];

  //   //gCS property's 1st para should be an element
  //   var widthTemp=window.getComputedStyle(spriteBG,null).getPropertyValue("width");

  //  var attackSize= getComputedStyle(document.documentElement).getPropertyValue('--pixel-size')*40;

  //  spriteBG.style.width=attackSize+"px";

  //  var sprite=document.getElementById("diamondHead");

  // sprite.classList.remove("walk");
  // sprite.classList.add("attack");

  spriteBen.classList.remove("walk");
  spriteBen.classList.add("attack");

  window.setTimeout(() => {
    spriteBen.classList.remove("attack");
    spriteBen.classList.add("walk");
    // spriteBG.style.width=widthTemp;
  }, 1000);
  window.setTimeout(diamonds, 1000);

  rightPos = rightMostPos(spriteBen);
}
function diamonds() {
  var parent = document.getElementById("road");
  // var diamondsDiv=document.createElement("div");
  // parent.appendChild(diamondsDiv);
  var diamonds = document.createElement("img");
  // diamondsDiv.appendChild(diamonds);
  parent.appendChild(diamonds);
  diamonds.src = "diamonds.png";
  var diamondsClass = document.createAttribute("class");
  diamondsClass.value = "diamonds";
  diamonds.setAttributeNode(diamondsClass);
}
var spawnHybrid = window.setInterval(start, 5000);
// Score tracking
var score = 0;
function updateScoreDisplay() {
  try {
    var s = document.getElementById("score");
    if (s) s.textContent = score;
  } catch (e) {}
}

// GET WINDOW RELATIVE OFFSET

function start() {
  var hybrid = document.getElementById("hybrid");
  var coordsHybrid = hybrid.getBoundingClientRect();
  var coordsBen = spriteBen.getBoundingClientRect();
  var road = document.getElementById("road");
  var coordsRoad = road.getBoundingClientRect();

  // console.log(road.childNodes);

  hybrid.classList.add("hybridWalk");

  // Keep a reference to the hybrid movement interval so it can be cleared on game over
  window.hybridInterval = window.setInterval(() => {
    coordsHybrid = hybrid.getBoundingClientRect();
    // Recompute player's bounds in case it changed
    coordsBen = spriteBen.getBoundingClientRect();
    // console.log(hybrid.offsetLeft);
    // console.log(coords);
    var d = document.getElementsByClassName("diamonds");
    // Check for intersection (collision) between hybrid and player
    function rectsIntersect(a, b) {
      return !(
        a.right < b.left ||
        a.left > b.right ||
        a.bottom < b.top ||
        a.top > b.bottom
      );
    }

    if (rectsIntersect(coordsHybrid, coordsBen)) {
      // Hybrid touched the player -> GAME OVER
      gameOver(hybrid);
      return;
    } else if (d[0] !== undefined) {
      var coordsD = d[0].getBoundingClientRect();
      // console.log(coordsD.left);
      if (coordsD.left > coordsRoad.right) {
        road.removeChild(d[0]);
        // d.style.visibility="none";
      } else if (coordsD.right - 70 >= coordsHybrid.left) {
        // Diamond hit the hybrid: increment score and kill hybrid
        hybrid.classList.remove("hybridWalk");
        hybrid.classList.add("hybridDead");
        try {
          road.removeChild(d[0]);
        } catch (e) {}
        // stop the hybrid movement
        window.clearInterval(window.hybridInterval);

        // increment score and update display
        score += 1;
        updateScoreDisplay();

        // hide/remove hybrid visually after short delay and respawn a fresh hybrid
        setTimeout(function () {
          try {
            // reset hybrid classes and position
            hybrid.className = "pixelart";
            hybrid.style.left = "";
            // ensure hybrid is present in DOM (if removed earlier)
            if (!document.getElementById("hybrid")) {
              var newH = document.createElement("div");
              newH.id = "hybrid";
              newH.className = "pixelart";
              document.getElementById("road").appendChild(newH);
            }
          } catch (e) {}
        }, 300);
      }
    }
  }, 15);
}

// Called when the hybrid touches the player. Stops the game and shows Game Over UI.
function gameOver(hybridElement) {
  if (!gameRunning) return;
  gameRunning = false;

  // Stop spawn and hybrid movement
  try {
    if (window.hybridInterval) window.clearInterval(window.hybridInterval);
    if (typeof spawnHybrid !== "undefined") window.clearInterval(spawnHybrid);
  } catch (e) {
    console.warn("Error clearing intervals on game over", e);
  }

  // Pause any CSS animations (road line)
  var body = document.getElementsByClassName("mainBody")[0];
  var roadLine = document.getElementById("line");
  if (roadLine) roadLine.style.animationPlayState = "paused";
  if (body) {
    body.classList.remove("start");
    body.classList.add("paused");
  }

  // Optionally add hybrid attack pose and freeze its position
  if (hybridElement) {
    try {
      hybridElement.classList.remove("hybridWalk");
      hybridElement.classList.add("hybridAttack");
      // freeze position
      var coords = hybridElement.getBoundingClientRect();
      hybridElement.style.left = coords.left + "px";
    } catch (e) {}
  }

  // Create overlay
  var overlay = document.createElement("div");
  overlay.id = "GameOver";
  Object.assign(overlay.style, {
    position: "fixed",
    left: "0",
    top: "0",
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.75)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
    fontFamily: "sans-serif",
    textAlign: "center",
  });

  overlay.innerHTML =
    '<div style="font-size:48px;line-height:1.2">Game Over<br><small style="font-size:18px">Press R to restart</small></div>';
  document.body.appendChild(overlay);
}
