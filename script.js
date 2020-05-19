var speed = document.querySelector(".period-select");
var coorX = document.getElementById("coordinateX");
var coorY = document.getElementById("coordinateY");
var degree = 0;
var rightMove = document.querySelector(".arrowRight");
var leftMove = document.querySelector(".arrowLeft");
var forwardMove = document.querySelector(".arrowUp");
var backwardMove = document.querySelector(".arrowDown");
var blueRect = document.getElementById("robots_body");

console.log(speed);
console.log(rightMove);

rightMove.addEventListener("click", moveRectRight);
rightMove.addEventListener("mousemove", moveHover);
leftMove.addEventListener("click", moveRectLeft);
forwardMove.addEventListener("click", moveRectForward);
backwardMove.addEventListener("click", moveRectBackward);

function moveHover() {}

function moveRectRight() {
  degree = degree + 20 * (speed.value / 100);
  blueRect.style.transform = "rotate(" + degree + "deg)";
}

function moveRectLeft() {
  degree = degree - 20 * (speed.value / 100);
  blueRect.style.transform = "rotate(" + degree + "deg)";
}

function moveRectForward() {
  var cs = window.getComputedStyle(blueRect);
  var left = parseInt(cs.marginLeft);
  var top = parseInt(cs.marginTop);
  blueRect.style.marginTop =
    top + 40 * (speed.value / 100) * Math.sin((degree * Math.PI) / 180) + "px";
  blueRect.style.marginLeft =
    left + 40 * (speed.value / 100) * Math.cos((degree * Math.PI) / 180) + "px";
  coorY.innerHTML = -parseInt(
    top - ((40 * speed.value) / 100) * Math.sin((degree * Math.PI) / 180)
  );
  coorX.innerHTML = parseInt(
    left + 40 * (speed.value / 100) * Math.cos((degree * Math.PI) / 180)
  );
}

function moveRectBackward() {
  var cs = window.getComputedStyle(blueRect);
  var left = parseInt(cs.marginLeft);
  var top = parseInt(cs.marginTop);
  blueRect.style.marginTop =
    top - 40 * (speed.value / 100) * Math.sin((degree * Math.PI) / 180) + "px";
  blueRect.style.marginLeft =
    left - 40 * (speed.value / 100) * Math.cos((degree * Math.PI) / 180) + "px";
  coorY.innerHTML = -parseInt(
    top + 40 * (speed.value / 100) * Math.sin((degree * Math.PI) / 180)
  );
  coorX.innerHTML = parseInt(
    left - 40 * (speed.value / 100) * Math.cos((degree * Math.PI) / 180)
  );
}

function moveRect(e) {
  var blueRect = document.getElementById("robots_body");
  // получаем стиль для blueRect
  var cs = window.getComputedStyle(blueRect);
  var left = parseInt(cs.marginLeft);
  var top = parseInt(cs.marginTop);
  console.log("Влево: " + left);
  console.log("Вверх: " + top);
  switch (e.keyCode) {
    case 37: // если нажата клавиша влево
      degree = degree - 20 * (speed.value / 100);
      blueRect.style.transform = "rotate(" + degree + "deg)";
      break;
    case 38: // если нажата клавиша вверх
      if (top > -510 && left < 510) {
        blueRect.style.marginTop =
          top +
          10 * (speed.value / 100) * Math.sin((degree * Math.PI) / 180) +
          "px";
        blueRect.style.marginLeft =
          left +
          10 * (speed.value / 100) * Math.cos((degree * Math.PI) / 180) +
          "px";
        coorY.innerHTML = -parseInt(
          top - ((10 * speed.value) / 100) * Math.sin((degree * Math.PI) / 180)
        );
        coorX.innerHTML = parseInt(
          left + 10 * (speed.value / 100) * Math.cos((degree * Math.PI) / 180)
        );
      }
      break;
    case 39: // если нажата клавиша вправо
      degree = degree + 20 * (speed.value / 100);
      blueRect.style.transform = "rotate(" + degree + "deg)";
      break;
    case 40: // если нажата клавиша вниз
      if (top < -10 && left > -10) {
        blueRect.style.marginTop =
          top -
          10 * (speed.value / 100) * Math.sin((degree * Math.PI) / 180) +
          "px";
        blueRect.style.marginLeft =
          left -
          10 * (speed.value / 100) * Math.cos((degree * Math.PI) / 180) +
          "px";
        coorY.innerHTML = -parseInt(
          top + 10 * (speed.value / 100) * Math.sin((degree * Math.PI) / 180)
        );
        coorX.innerHTML = parseInt(
          left - 10 * (speed.value / 100) * Math.cos((degree * Math.PI) / 180)
        );
      }
      break;
  }
}
addEventListener("keydown", moveRect);

var output = document.getElementById("speedValue");
output.innerHTML = speed.value;
speed.oninput = function () {
  output.innerHTML = this.value;
};
