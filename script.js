let currentShape = "circle";
let AUDIO_PlAYER1 = new Audio("sound/player1.mp3")
let AUDIO_PLAYER2 = new Audio("sound/player2.mp3")

function init() {
  render();
}

function render() {
  const contentDiv = document.getElementById("content");
  let tableHtml = "<table>";
  for (let i = 0; i < 3; i++) {
    tableHtml += "<tr>";
    for (let j = 0; j < 3; j++) {
      const index = i * 3 + j;
      let symbol = "";
      if (fields[index] === "circle") {
        symbol = generateCircleSVG();
      } else if (fields[index] === "cross") {
        symbol = generateCrossSVG();
      }

      // onclick hinzufügen, wenn das Feld noch leer ist
      const clickHandler =
        fields[index] === null ? `onclick="handleClick(this, ${index})"` : "";

      tableHtml += `<td ${clickHandler}>${symbol}</td>`;
    }
    tableHtml += "</tr>";
  }
  tableHtml += "</table>";
  contentDiv.innerHTML = tableHtml;
}

function handleClick(tdElement, index) {
  // Setze das Feld im Array
  fields[index] = currentShape;

  // Füge das SVG ins angeklickte td ein
  tdElement.innerHTML =
    currentShape === "circle" ? generateCircleSVG() : generateCrossSVG();

  // Entferne onclick-Funktion
  tdElement.onclick = null;

  // Wechsle zur nächsten Form
  currentShape = currentShape === "circle" ? "cross" : "circle";

  checkWin();
}

function generateCircleSVG() {
  const color = "#00B0EF";
  const width = 70;
  const height = 70;
  const radius = width / 2 - 4;
  const circumference = 2 * Math.PI * radius;

  const svgHtml = `
      <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
        <circle
          cx="${width / 2}"
          cy="${height / 2}"
          r="${radius}"
          fill="none"
          stroke="${color}"
          stroke-width="4"
          stroke-dasharray="${circumference}"
          stroke-dashoffset="${circumference}"
        >
          <animate
            attributeName="stroke-dashoffset"
            values="${circumference}; 0"
            dur="0.65s"
            fill="freeze"
          />
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 ${width / 2} ${height / 2}"
            to="360 ${width / 2} ${height / 2}"
            dur="0.65s"
            fill="freeze"
          />
        </circle>
      </svg>
    `;
    AUDIO_PlAYER1.play();

  return svgHtml;
}

function generateCrossSVG() {
  const color = "#FFC000";
  const width = 70;
  const height = 70;

  const svgHtml = `
      <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
        <g transform="rotate(0 ${width / 2} ${height / 2})">
          <line x1="10" y1="10" x2="60" y2="60"
            stroke="${color}" stroke-width="5"
            stroke-dasharray="70" stroke-dashoffset="70">
            <animate attributeName="stroke-dashoffset" values="70;0" dur="1.25s" fill="freeze" />
          </line>
          <line x1="60" y1="10" x2="10" y2="60"
            stroke="${color}" stroke-width="5"
            stroke-dasharray="70" stroke-dashoffset="70">
            <animate attributeName="stroke-dashoffset" values="70;0" dur="1.25s" fill="freeze" />
          </line>
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 ${width / 2} ${height / 2}"
            to="360 ${width / 2} ${height / 2}"
            dur="1.25s"
            fill="freeze"
          />
        </g>
      </svg>
    `;
     AUDIO_PLAYER2.play();

  return svgHtml;
}

function checkWin() {
  const winLines = [
    [0, 1, 2], // oben
    [3, 4, 5], // mitte
    [6, 7, 8], // unten
    [0, 3, 6], // links
    [1, 4, 7], // mitte
    [2, 5, 8], // rechts
    [0, 4, 8], // diagonal \
    [2, 4, 6], // diagonal /
  ];

  for (const [a, b, c] of winLines) {
    if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
      drawWinLine(a, c); // Start und Ende der Linie
      disableAllClicks(); // kein weiterer Zug möglich
      return true;
    }
  }

  return false;
}

function drawWinLine(startIndex, endIndex) {
    const startCell = document.querySelectorAll("td")[startIndex];
    const endCell = document.querySelectorAll("td")[endIndex];
  
    const contentRect = document.getElementById("content").getBoundingClientRect();
  
    const startRect = startCell.getBoundingClientRect();
    const endRect = endCell.getBoundingClientRect();
  
    const container = document.getElementById("content");
  
    const line = document.createElement("div");
    line.classList.add("line");
  
    const x1 = startRect.left + startRect.width / 2 - contentRect.left;
    const y1 = startRect.top + startRect.height / 2 - contentRect.top;
    const x2 = endRect.left + endRect.width / 2 - contentRect.left;
    const y2 = endRect.top + endRect.height / 2 - contentRect.top;
  
    const length = Math.hypot(x2 - x1, y2 - y1);
    const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
  
    line.style.width = `${length}px`;
    line.style.transform = `rotate(${angle}deg)`;
    line.style.left = `${x1}px`;
    line.style.top = `${y1}px`;
    line.style.transformOrigin = "left center";
    line.style.zIndex = "1000";
  
    container.appendChild(line);
  }
  

function disableAllClicks() {
  document.querySelectorAll("td").forEach((td) => {
    td.onclick = null;
  });
}

function restartGame() {
  // Spielfeld zurücksetzen
  for (let i = 0; i < fields.length; i++) {
    fields[i] = null;
  }

  // Spieler zurücksetzen
  currentShape = "circle";

  // Gewinnlinie(n) entfernen
  document.querySelectorAll(".line").forEach((el) => el.remove());


  // Neu rendern
  document.getElementById("winner-text").textContent = "";
document.getElementById("winner-text").style.opacity = "0";

  render();
  
}

function checkWin() {
    const winLines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
  
    for (const [a, b, c] of winLines) {
      if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
        drawWinLine(a, c);
        disableAllClicks();
  
        // Anzeige, wer gewonnen hat
        const winner = fields[a] === "circle" ? "⭕ Kreis hat gewonnen!" : "❌ Kreuz hat gewonnen!";
        showWinnerText(winner);
  
        return true;
      }
    }
  
    return false;
  }
  function showWinnerText(text) {
    const winnerText = document.getElementById("winner-text");
    winnerText.textContent = text;
    winnerText.style.opacity = "1";
  }
    