
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

//Creamos un array que almacena la paleta de colores
let palette = [];

// Funcion para generar una paleta de 4 colores
function generatePalette() {
  const paletteSize = palette.length || 4;

  palette = [];

  for (let i = 0; i < paletteSize; i++) {
    const newColor = generateRandomHex();
    palette.push(newColor);
  }
}


// Funcion para renderizar la paleta random en DOM
function renderPalette() {
  const paletteContainer = document.querySelector("#palette");

  paletteContainer.innerHTML = "";

  for (let i = 0; i < palette.length; i++) {
    const colorCard = document.createElement("article");
    const colorPreview = document.createElement("div");
    const colorInfo = document.createElement("div");
    const colorHex = document.createElement("p");
    const deleteButton = document.createElement("button");

    colorCard.classList.add("color-card");
    colorPreview.classList.add("color-preview");
    colorInfo.classList.add("color-info");
    colorHex.classList.add("color-hex");
    deleteButton.classList.add("delete-color-button");

    colorPreview.style.backgroundColor = palette[i];
    colorHex.textContent = palette[i];

    deleteButton.type = "button";
    deleteButton.textContent = "×";
    deleteButton.setAttribute("aria-label", "Eliminar color");
    deleteButton.title = "Eliminar color";

    deleteButton.disabled = palette.length <= 2;

    deleteButton.addEventListener("click", function () {
      deleteColor(i);
    });

    colorInfo.appendChild(colorHex);

    colorCard.appendChild(deleteButton);
    colorCard.appendChild(colorPreview);
    colorCard.appendChild(colorInfo);

    paletteContainer.appendChild(colorCard);
  }
}

// Toast notification
function showToast() {
  const toast = document.querySelector("#toast");

  toast.classList.add("show");

  setTimeout(function () {
    toast.classList.remove("show");
  }, 2500);
}

// Funcion para generer una nueva paleta y mostrar el toast
function handleGeneratePalette() {
  generatePalette();
  renderPalette();
  showToast();
}

// Boton que genera una nueva paleta aleatoria
const generatePaletteBtn = document.querySelector("#generatePaletteBtn");
generatePaletteBtn.addEventListener("click", handleGeneratePalette);

// Generamos la paleta random inicial al cargar la pagina
generatePalette();
renderPalette();


// Funcion para agregar un color nuevo a la paleta
function addColor() {
  if (palette.length < 9) {
    const newColor = generateRandomHex();

    palette.push(newColor);

    renderPalette();
    updateAddButton();
  }
}

// Boton para agregar un nuevo color
const addColorBtn = document.querySelector("#addColorBtn");
addColorBtn.addEventListener("click", addColor);

// Disable boton de agregar color
function updateAddButton() {
  addColorBtn.disabled = palette.length >= 9;
}

// Funcion para eliminar un color de la paleta
function deleteColor(index) {
  if (palette.length > 2) {
    palette.splice(index, 1);

    renderPalette();
    updateAddButton();
  }
}