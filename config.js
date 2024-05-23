const MAX_GENERATION = 200;
const MAX_COMBINATION = 3_628_800;

// Custom error that'll stop the rendering once the MAX_GENERATION was reached
const stopRendering = new Error("ITERATION DONE.");
stopRendering.name = "Render Stopped";
stopRendering.stack = "";

// let coords = [
//   // x, y
//   [410, 305, "Pasig"],
//   [461, 248, "Antipolo"],
//   [367, 200, "QuezonCity"],
//   [280, 555, "Dasmarinas"],
//   [450, 289, "Cainta"],
//   [330, 270, "Manila"],
//   [390, 510, "SanPedro"],
//   [436, 228, "Marikina"],
//   [149, 60, "Bulakan"],
//   [370, 120, "Caloocan"],
// ];
let coords = [
  [2, 5, "Gate"],
  [7, 15, "Tennis Court"],
  [15, 8, "Information Desk"],
  [13, 12, "Obelisk"],
  [19, 15, "Lagoon"],
  [2, 10, "Gymnasium"],
  [5, 9, "Oval"],
  [7, 18, "Interfaith Chapel"],
  [13, 5, "Pool"],
  [20, 4, "Main Building"],
]

// UI-related
let textColor = { r: 0, g: 0, b: 0 };
let red = { r: 255, g: 0, b: 0 };
let blue = { r: 0, g: 0, b: 255 };
let pathColor = { r: 255, g: 255, b: 255 };
let labelTextSize = 15;
let labelTextWeight = 3;
let labelTextPos = { x: 15, y: 30 };
