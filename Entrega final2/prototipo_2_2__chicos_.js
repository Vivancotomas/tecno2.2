let tamañoCuadricula = 140; 
let maximoCuadrados = 17; 
let imagenes = []; 
let fondosCuadrados = []; 
let margen = 0.2; 
let mic, fft;
let lienzo;
let smoothedTreble = 0; 
let smoothingFactor = 0.05; 
let imagenFondo; 

function preload() {
  for (let i = 1; i < 12; i++) {
    imagenes.push(loadImage('data/imagen' + i + '.png'));
    fondosCuadrados.push(loadImage('data/fondo' + i + '.png')); 
  }
  imagenFondo = loadImage('data/textura.jpg'); 
}

function setup() {
  createCanvas(1200, 900);
  lienzo = new Lienzo();
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);
  userStartAudio();
}

function draw() {
  let volume = mic.getLevel();
  let spectrum = fft.analyze();
  let treble = fft.getEnergy('treble');
  let scaledTreble = map(treble, 70, 0, 0, 1);
  scaledTreble = constrain(scaledTreble, 0, 1);
  smoothedTreble += (scaledTreble - smoothedTreble) * smoothingFactor;
  lienzo.mostrar(smoothedTreble);
  if (volume > 0.1) {
    lienzo.agregarCuadrado();
  }
}
