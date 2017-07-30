/**
* @fileoverview Se encarga del renderizado
*
* @author Jose Wilson Capera Castaño
* @author Estefania Alzate Daza
* @version 1.0
*/

var render;
var escena;
var camara;

//Foco de luz
var foco = new KPTF.PuntoDeLuz(0xFFFFFF);

//Luz ambiente predeterminada por el framework
var ambiente = new KPTF.LuzAmbiente();

//Es el suelo con textura de cesped
var suelo = new KPTF.ElementoFisico(KPTF.Geometria.obtenerCubo(25, 0.5, 25), "img/texturas/grass.jpg", 0.8, 0.3, 0);

//Es la esfera que se comporta como si fuera de caucho
var bola1 = new KPTF.ElementoFisico(KPTF.Geometria.obtenerEsfera(0.5, 20, 20), "img/texturas/wood.jpg", 0.6, 2, 1);

//Es la esfera que se comporta como si fuera de piedra
var bola2 = new KPTF.ElementoFisico(KPTF.Geometria.obtenerEsfera(0.5, 20, 20), "img/texturas/rocks.jpg", 0.6, 0.3, 1);

/*
 * Se encarga iniciar el renderizado
 */
function iniciarRenderizado() {
    render = new KPTF.Renderizador();
    escena = new KPTF.Escena(true);
    camara = new KPTF.Camara();
    
    camara.cambiarAspecto(window.innerWidth / window.innerHeight);

    KPTF.Renderizador.lienzo("canvas", render);
    
    render.activarSombras();
    
    camara.ubicar(0, 20, 20);
    
    escena.cambiarGravedad(0, -9.8, 0);
    
    foco.posicion(0, 100, 0);
    foco.objeto.target.position.set(0, 0, 0);
    foco.activarSombras();
    
    bola1.posicion(0, 12.5, 0);
    bola2.posicion(0, 20, -0.05);
    
    suelo.activarSombras();
    bola1.activarSombras();
    bola2.activarSombras();
    
    escena.añadir(foco);
    escena.añadir(ambiente);
    escena.añadir(suelo);
    escena.añadir(bola1);
    escena.añadir(bola2);

    KPTF.miHilo.añadirTarea(frender, 0, true);
    
    window.addEventListener('resize', onWindowResize, false);
}

/*
 * Funcion encargada del resposive design
 */
function onWindowResize() {
    KPTF.Renderizador.ANCHO = window.innerWidth - 5;
    KPTF.Renderizador.ALTO = window.innerHeight - 5;

    KPTF.Camara.ANCHO = window.innerWidth;
    KPTF.Camara.ALTO = window.innerHeight;

    camara.cambiarAspecto(window.innerWidth / window.innerHeight);
    render.cambiarTamaño(window.innerWidth, window.innerHeight);
}
/*
 * Renderiza las dos camara
 */
function frender() {
    camara.mirarA(bola1.objeto);
    escena.objeto.simulate();
    //render.renderizarEnZona(0, 0, KPTF.Camara.ANCHO, KPTF.Camara.ALTO);
    render.renderizar(escena, camara);
}