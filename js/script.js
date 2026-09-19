
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
let draggedColorIndex = null;

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
    const colorCard = document.createElement("article");colorCard.draggable = true;
    const colorPreview = document.createElement("div");
    const colorInfo = document.createElement("div");
    const colorHex = document.createElement("p");
    const colorRgb = document.createElement("p");
    const colorHsl = document.createElement("p");
    const deleteButton = document.createElement("button");
    const lockButton = document.createElement("button");
    const copyHexButton = document.createElement("button");
    const copyRgbButton = document.createElement("button");
    const copyHslButton = document.createElement("button");
    const copyHexIcon = document.createElement("img");
    const copyRgbIcon = document.createElement("img");
    const copyHslIcon = document.createElement("img");

    //Convertir colores -----------------------------------
    const hexRow = document.createElement("div");
    const rgbRow = document.createElement("div");
    const hslRow = document.createElement("div");
    hexRow.classList.add("color-value-row");
    rgbRow.classList.add("color-value-row");
    hslRow.classList.add("color-value-row");
    const hexLabel = document.createElement("span");
    const rgbLabel = document.createElement("span");
    const hslLabel = document.createElement("span");
    hexLabel.textContent = "HEX";
    rgbLabel.textContent = "RGB";
    hslLabel.textContent = "HSL";
    hexLabel.classList.add("color-format");
    rgbLabel.classList.add("color-format");
    hslLabel.classList.add("color-format");
    hexRow.appendChild(hexLabel);
    hexRow.appendChild(colorHex);
    hexRow.appendChild(copyHexButton);
    rgbRow.appendChild(rgbLabel);
    rgbRow.appendChild(colorRgb);
    rgbRow.appendChild(copyRgbButton);
    hslRow.appendChild(hslLabel);
    hslRow.appendChild(colorHsl);
    hslRow.appendChild(copyHslButton);
    colorInfo.appendChild(hexRow);
    colorInfo.appendChild(rgbRow);
    colorInfo.appendChild(hslRow);

    const rgb = hexToRgb(palette[i].hex);  
    const hsl = rgbToHsl(
      rgb.red,
      rgb.green,
      rgb.blue
    );
    const hexText = palette[i].hex;
    const rgbText =
      `rgb(${rgb.red}, ${rgb.green}, ${rgb.blue})`;
    const hslText = hsl;

    colorCard.classList.add("color-card");
    colorPreview.classList.add("color-preview");
    colorInfo.classList.add("color-info");
    colorHex.classList.add("color-hex");
    colorRgb.classList.add("color-rgb");
    colorHsl.classList.add("color-hsl");
    deleteButton.classList.add("delete-color-button");

    colorPreview.style.backgroundColor = palette[i].hex;
    colorHex.textContent = hexText;
    colorRgb.textContent = rgbText;
    colorHsl.textContent = hslText;

    //Herramientas Color -----------------------------------
    const colorTools = document.createElement("div");
    colorTools.classList.add("color-tools");


    //Borrar -----------------------------------
    const deleteIcon = document.createElement("img");
    deleteIcon.src = "imgs/Delete.svg";
    deleteIcon.alt = "";
    deleteButton.type = "button";
    deleteButton.setAttribute("aria-label", "Eliminar color");
    deleteButton.title = "Eliminar color";

    deleteButton.disabled = palette.length <= 2;
    
    deleteButton.appendChild(deleteIcon);

    deleteButton.addEventListener("click", function () {
      deleteColor(i);
    });

    //Bloquear -----------------------------------
    lockButton.classList.add("lock-color-button");
    lockButton.type = "button";

    const lockIcon = document.createElement("img");
    lockIcon.src = palette[i].locked
    ? "imgs/Lock.svg"
    : "imgs/Unlock.svg";
    lockIcon.alt = "";

    lockButton.appendChild(lockIcon);

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

    //Mover -----------------------------------
    const moveButton = document.createElement("button");
    const moveIcon = document.createElement("img");

    moveButton.type = "button";
    moveButton.classList.add("move-color-button");

    moveButton.setAttribute(
      "aria-label",
      "Mover color"
    );

    moveButton.title = "Mover color";

    moveIcon.src = "imgs/Move.svg";
    moveIcon.alt = "";

    moveButton.appendChild(moveIcon);

    //Funcionalidad Mover 
    colorCard.draggable = true;
    colorCard.addEventListener("dragstart", function () {
      draggedColorIndex = i;
      console.log("Origen:", draggedColorIndex);
      colorCard.classList.add("dragging");
    });
    colorCard.addEventListener("dragend", function () {
      colorCard.classList.remove("dragging");
    });

    colorCard.addEventListener("dragover", function (event) {
      event.preventDefault();
    });

    colorCard.addEventListener("drop", function () {
      if (draggedColorIndex === i) {
        return;
      }
      const movedColor =
        palette.splice(draggedColorIndex, 1)[0];
      palette.splice(i, 0, movedColor);
      console.log("Destino:", i);
      renderPalette();
    });

    colorCard.addEventListener("dragend", function () {
      colorCard.classList.remove("dragging");
      draggedColorIndex = null;
    });

    

    //Copiar -----------------------------------

    copyHexIcon.src = "imgs/Copy.svg";
    copyRgbIcon.src = "imgs/Copy.svg";
    copyHslIcon.src = "imgs/Copy.svg";

    copyHexIcon.alt = "";
    copyRgbIcon.alt = "";
    copyHslIcon.alt = "";

    copyHexButton.classList.add("copy-button");
    copyRgbButton.classList.add("copy-button");
    copyHslButton.classList.add("copy-button");

    copyHexButton.type = "button";
    copyRgbButton.type = "button";
    copyHslButton.type = "button";

    //copyHexButton.textContent = "Copiar";
    //copyRgbButton.textContent = "Copiar";
    //copyHslButton.textContent = "Copiar";

    copyHexButton.setAttribute(
      "aria-label",
      `Copiar HEX ${hexText}`
    );
    copyRgbButton.setAttribute(
      "aria-label",
      `Copiar RGB ${rgbText}`
    );
    copyHslButton.setAttribute(
      "aria-label",
      `Copiar HSL ${hslText}`
    );

    copyHexButton.title = "Copiar HEX";
    copyRgbButton.title = "Copiar RGB";
    copyHslButton.title = "Copiar HSL";

    copyHexButton.addEventListener("click", function () {
      copyColorValue(hexText, "HEX");
    });

    copyRgbButton.addEventListener("click", function () {
      copyColorValue(rgbText, "RGB");
    });

    copyHslButton.addEventListener("click", function () {
      copyColorValue(hslText, "HSL");
    });

    //Estructura General -----------------------------------
    colorCard.appendChild(deleteButton);
    colorCard.appendChild(colorPreview);
    colorCard.appendChild(colorInfo);

    colorCard.appendChild(colorTools);
    colorCard.appendChild(colorPreview);
    colorCard.appendChild(colorInfo);

    colorTools.appendChild(moveButton);
    colorTools.appendChild(lockButton);
    colorTools.appendChild(deleteButton);

    copyHexButton.appendChild(copyHexIcon);
    copyRgbButton.appendChild(copyRgbIcon);
    copyHslButton.appendChild(copyHslIcon);

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

// Funcion para copiar el valor del color
function copyColorValue(value, format) {
  navigator.clipboard.writeText(value)
    .then(function () {
      showToast(`${format} ${value} copiado`);
    })
    .catch(function () {
      showToast("No se pudo copiar el color");
    });
}

// Funcion para convertir Hex a RGB
function hexToRgb(hex) {
  const red = parseInt(hex.substring(1, 3), 16);
  const green = parseInt(hex.substring(3, 5), 16);
  const blue = parseInt(hex.substring(5, 7), 16);

  //return `rgb(${red}, ${green}, ${blue})`;
  return {
    red: red,
    green: green,
    blue: blue
  };
}

// Funcion convertir RGB a HSL
function rgbToHsl(red, green, blue) {
  red = red / 255;
  green = green / 255;
  blue = blue / 255;

  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const difference = max - min;

  let hue;
  let saturation;
  let lightness;

  lightness = (max + min) / 2;

  if (difference === 0) {
    hue = 0;
    saturation = 0;
  } else {
    saturation =
      difference /
      (1 - Math.abs(2 * lightness - 1));

    if (max === red) {
      hue = 60 * (((green - blue) / difference) % 6);
    } else if (max === green) {
      hue = 60 * (((blue - red) / difference) + 2);
    } else {
      hue = 60 * (((red - green) / difference) + 4);
    }
  }

  if (hue < 0) {
    hue += 360;
  }

  hue = Math.round(hue);
  saturation = Math.round(saturation * 100);
  lightness = Math.round(lightness * 100);

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}


// Funcion Preparar datos para exportar paleta de colores
function createPaletteExport() {
  const colors = [];

  for (let i = 0; i < palette.length; i++) {
    const rgb = hexToRgb(palette[i].hex);

    const rgbText =
      `rgb(${rgb.red}, ${rgb.green}, ${rgb.blue})`;

    const hslText = rgbToHsl(
      rgb.red,
      rgb.green,
      rgb.blue
    );

    const colorData = {
      hex: palette[i].hex,
      rgb: rgbText,
      hsl: hslText
    };

    colors.push(colorData);
  }

  return {
    name: "Colorfly Palette",
    colors: colors
  };
}

// Funcion Exportar paleta de colores
function exportPalette() {
  const exportData = createPaletteExport();

  const jsonData = JSON.stringify(
    exportData,
    null,
    2
  );

  const blob = new Blob(
    [jsonData],
    { type: "application/json" }
  );

  const url = URL.createObjectURL(blob);

  const downloadLink = document.createElement("a");

  downloadLink.href = url;
  downloadLink.download = "colorfly-palette.json";

  downloadLink.click();

  showToast("¡Paleta exportada!");

  URL.revokeObjectURL(url);
}

const exportPaletteBtn =
  document.querySelector("#exportPaletteBtn");

exportPaletteBtn.addEventListener(
  "click",
  exportPalette
);