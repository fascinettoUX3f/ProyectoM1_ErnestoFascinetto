// Funcion para generar un random hex color
function generateRandomHex() {
  const characters = "0123456789ABCDEF";
  let color = "#";

  for (let i = 0; i < 6; i++) {
    const randomPosition = Math.floor(Math.random() * 16);
    color += characters[randomPosition];
  }

  return color;
}

// Funcion para generar una paleta de 4 colores
function generatePalette() {
  const palette = [];

  for (let i = 0; i < 4; i++) {
    const newColor = generateRandomHex();
    palette.push(newColor);
  }

  return palette;
}

// Funcion para renderizar la paleta random en DOM
function renderPalette() {
  const palette = generatePalette();

  const colorPreviews = document.querySelectorAll(".color-preview");
  const colorHexTexts = document.querySelectorAll(".color-hex");

  for (let i = 0; i < palette.length; i++) {
    colorPreviews[i].style.backgroundColor = palette[i];
    colorHexTexts[i].textContent = palette[i];
  }
}

renderPalette();


// Boton que genera una nueva paleta aleatoria
const generatePaletteBtn = document.querySelector("#generatePaletteBtn");
generatePaletteBtn.addEventListener("click", renderPalette);