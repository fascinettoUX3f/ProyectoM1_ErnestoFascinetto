function generateRandomHex() {
  const characters = "0123456789ABCDEF";
  let color = "#";

  for (let i = 0; i < 6; i++) {
    const randomPosition = Math.floor(Math.random() * 16);
    color += characters[randomPosition];
  }

  return color;
}

function generatePalette() {
  const palette = [];

  for (let i = 0; i < 4; i++) {
    const newColor = generateRandomHex();
    palette.push(newColor);
  }

  return palette;
}


console.log(generatePalette());