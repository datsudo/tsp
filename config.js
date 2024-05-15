const MAX_GENERATION = 100;
const MAX_COMBINATION = 3_628_800;

// Custom error that'll stop the rendering once the MAX_GENERATION was reached
const stopRendering = new Error("ITERATION DONE.");
stopRendering.name = "Render Stopped";
stopRendering.stack = "";

let coords = [
  // x, y
  [410, 305, "Pasig"], // 0
  [461, 248, "Antipolo"], // 1
  [367, 200, "QuezonCity"], // 2
  [280, 555, "Dasmarinas"], // 3
  [450, 289, "Cainta"], // 4
  [330, 270, "Manila"],
  [390, 510, "SanPedro"],
  [436, 228, "Marikina"],
  [149, 60, "Bulakan"],
  [370, 120, "Caloocan"], // 9
];

// UI-related
let textColor = { r: 0, g: 0, b: 0 };
let red = { r: 255, g: 0, b: 0 };
let blue = { r: 0, g: 0, b: 255 };
let pathColor = { r: 255, g: 255, b: 255 };
let labelTextSize = 15;
let labelTextWeight = 3;
let labelTextPos = { x: 15, y: 30 };
