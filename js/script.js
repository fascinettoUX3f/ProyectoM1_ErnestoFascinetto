
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
  const newPalette = [];

  for (let i = 0; i < paletteSize; i++) {

    if (palette[i] && palette[i].locked) {
      newPalette.push(palette[i]);
    } else {
      const newColor = {
        hex: generateRandomHex(),
        locked: false
      };

      newPalette.push(newColor);
    }
  }

  palette = newPalette;
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
    const lockButton = document.createElement("button");
    const copyHexButton = document.createElement("button");

    colorCard.classList.add("color-card");
    colorPreview.classList.add("color-preview");
    colorInfo.classList.add("color-info");
    colorHex.classList.add("color-hex");
    deleteButton.classList.add("delete-color-button");

    colorPreview.style.backgroundColor = palette[i].hex;
    colorHex.textContent = palette[i].hex;

    deleteButton.type = "button";
    deleteButton.textContent = "×";
    deleteButton.setAttribute("aria-label", "Eliminar color");
    deleteButton.title = "Eliminar color";

    deleteButton.disabled = palette.length <= 2;

    deleteButton.addEventListener("click", function () {
      deleteColor(i);
    });

    lockButton.classList.add("lock-color-button");
    lockButton.type = "button";
    lockButton.textContent = palette[i].locked ? "🔒" : "🔓";
    lockButton.setAttribute(
      "aria-label",
      palette[i].locked ? "Desbloquear color" : "Bloquear color"
    );
    lockButton.title = palette[i].locked
      ? "Desbloquear color"
      : "Bloquear color";

    lockButton.addEventListener("click", function () {
      toggleLock(i);
    });

    copyHexButton.classList.add("copy-button");
    copyHexButton.type = "button";
    copyHexButton.textContent = "Copiar";
    copyHexButton.setAttribute("aria-label", `Copiar color ${palette[i].hex}`);
    copyHexButton.title = "Copiar HEX";

    copyHexButton.addEventListener("click", function () {
      copyHex(i);
    });


    colorInfo.appendChild(colorHex);
    colorInfo.appendChild(copyHexButton);

    colorCard.appendChild(deleteButton);
    colorCard.appendChild(colorPreview);
    colorCard.appendChild(colorInfo);

    colorCard.appendChild(lockButton);
    colorCard.appendChild(deleteButton);
    colorCard.appendChild(colorPreview);
    colorCard.appendChild(colorInfo);

    paletteContainer.appendChild(colorCard);
  }
}

// Toast notification
function showToast(message) {
  const toast = document.querySelector("#toast");
  const toastMessage = document.querySelector("#toastMessage");

  toastMessage.textContent = message;

  toast.classList.add("show");

  setTimeout(function () {
    toast.classList.remove("show");
  }, 2500);
}

// Funcion para generer una nueva paleta y mostrar el toast
function handleGeneratePalette() {
  generatePalette();
  renderPalette();
  showToast("¡Nueva paleta generada!");
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
    const newColor = {
      hex: generateRandomHex(),
      locked: false
    };

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

//Toggle bloquear color
function toggleLock(index) {
  palette[index].locked = !palette[index].locked;

  renderPalette();
}

// Funcion para copiar Hex
function copyHex(index) {
  const hex = palette[index].hex;

  navigator.clipboard.writeText(hex);

  showToast(`HEX ${hex} copiado`);
}