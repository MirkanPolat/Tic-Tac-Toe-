let currentShape = 'circle';

function init() {
  render();
}

function render() {
  const contentDiv = document.getElementById("content");
}

function render() {
    const contentDiv = document.getElementById('content');
    let tableHtml = '<table>';
    for (let i = 0; i < 3; i++) {
        tableHtml += '<tr>';
        for (let j = 0; j < 3; j++) {
            const index = i * 3 + j;
            let symbol = '';
            if (fields[index] === 'circle') {
                symbol = generateCircleSVG();
            } else if (fields[index] === 'cross') {
                symbol = generateCrossSVG();
            }

            // onclick hinzufügen, wenn das Feld noch leer ist
            const clickHandler = fields[index] === null
                ? `onclick="handleClick(this, ${index})"`
                : '';

            tableHtml += `<td ${clickHandler}>${symbol}</td>`;
        }
        tableHtml += '</tr>';
    }
    tableHtml += '</table>';
    contentDiv.innerHTML = tableHtml;
}

function handleClick(tdElement, index) {
    // Setze das Feld im Array
    fields[index] = currentShape;

    // Füge das SVG ins angeklickte td ein
    tdElement.innerHTML = currentShape === 'circle' ? generateCircleSVG() : generateCrossSVG();

    // Entferne onclick-Funktion
    tdElement.onclick = null;

    // Wechsle zur nächsten Form
    currentShape = currentShape === 'circle' ? 'cross' : 'circle';
}


function generateCircleSVG() {
    const color = '#00B0EF';
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
  
    return svgHtml;
  }

  function generateCrossSVG() {
    const color = '#FFC000';
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
  
    return svgHtml;
  }
  