class Lienzo {
  constructor() {
    this.cuadrados = [];
    this.columnas = floor(width / tamañoCuadricula);
    this.filas = floor(height / tamañoCuadricula);
    this.ultimoTiempoAgregado = 0;
    this.intervaloAgregado = 200;
    let indexIzquierdo = floor(random(imagenes.length));
    let indexDerecho = floor(random(imagenes.length));
    this.cuadrados.push(new Cuadrado(createVector(floor(this.columnas / 4), floor(this.filas / 2)), imagenes[indexIzquierdo], fondosCuadrados[indexIzquierdo], 'izquierdo'));
    this.cuadrados.push(new Cuadrado(createVector(floor(3 * this.columnas / 4), floor(this.filas / 2)), imagenes[indexDerecho], fondosCuadrados[indexDerecho], 'derecho'));
  }

  mostrar(scaledTreble) {
    noTint();
    image(imagenFondo, 0, 0, width, height);
    let colorFondo = lerpColor(color(255, 127), color(0, 127), scaledTreble);
    fill(colorFondo);
    rect(0, 0, width, height);
    for (let c of this.cuadrados) {
      c.mostrarFondo();
    }
    for (let c of this.cuadrados) {
      c.mostrarCuadrado();
    }
  }

  agregarCuadrado() {
    let tiempoActual = millis();
    if (tiempoActual - this.ultimoTiempoAgregado >= this.intervaloAgregado) {
      if (this.cuadrados.length >= maximoCuadrados) {
        this.cuadrados.shift();
      }
      let nuevoCuadrado = this.obtenerCuadradoValido();
      if (nuevoCuadrado) {
        this.cuadrados.push(nuevoCuadrado);
        this.ultimoTiempoAgregado = tiempoActual;
      }
    }
  }

  obtenerCuadradoValido() {
    let opciones = [];
    for (let c of this.cuadrados) {
      let x = c.pos.x;
      let y = c.pos.y;
      let cuadradosPotenciales = [
        createVector(x + 1, y + 1),
        createVector(x - 1, y - 1),
        createVector(x + 1, y - 1),
        createVector(x - 1, y + 1)
      ];
      for (let cp of cuadradosPotenciales) {
        if (this.esPosicionValida(cp) && !this.estaOcupado(cp)) {
          if (c.lado === 'izquierdo' && cp.x < this.columnas / 2) {
            let index = floor(random(imagenes.length));
            opciones.push(new Cuadrado(cp, imagenes[index], fondosCuadrados[index], 'izquierdo'));
          } else if (c.lado === 'derecho' && cp.x >= this.columnas / 2) {
            let index = floor(random(imagenes.length));
            opciones.push(new Cuadrado(cp, imagenes[index], fondosCuadrados[index], 'derecho'));
          }
        }
      }
    }
    if (opciones.length > 0) {
      return random(opciones);
    }
    return null;
  }

  esPosicionValida(pos) {
    return pos.x >= margen && pos.x < this.columnas - margen && pos.y >= margen && pos.y < this.filas - margen;
  }

  estaOcupado(posicion) {
    for (let c of this.cuadrados) {
      if (dist(c.pos.x, c.pos.y, posicion.x, posicion.y) < 1) {
        return true;
      }
    }
    return false;
  }
}
