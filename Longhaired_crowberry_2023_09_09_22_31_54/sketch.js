//Variaveis da bolinha
let xBolinha = 350;
let yBolinha = 250;
let diametro = 20;
let raio = diametro/2;

//Variaveis da raquete
let xRaquete = 5;
let yRaquete = 180;
let compRaquete = 10;
let alturaRaquete = 90;

//Raquete Oponente
let xRaqueteOponente = 685;
let yRaqueteOponente = 180;
let compRaqueteOponente = 10;
let alturaRaqueteOponente = 90;
let velocidadeYRaquete;

let colidiu = false;

//Variaveis da velocidade da bolinha
let velocidadeX = 10;
let velocidadeY = 10;

//Placar do jogo
let meusPontos = 0;
let pontosOponente = 0;

//Variaveis sons do jogo
let somRaquetada;
let trilha;
let ponto;

//Variavel chance de erro
let chanceDeErrar = 0;

//Função para carregar os sons antes do jogo

  function preload(){
  trilha = loadSound("trilha.mp3");
  raquetada = loadSound("raquetada.mp3");
  ponto = loadSound("ponto.mp3");
}

function setup() {
  createCanvas(700, 450);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaBorda();
  mostraRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  //mostraRaqueteOponente(); - Reaproveitamos a função existente
  movimentaRaquete();
  movimentaRaqueteOponente();
  //verificaColisaoRaquete(); - Utilizamos a função baixada da bibilioteca do github
  colisaoRaqueteBiblioteca(xRaquete, yRaquete);
  colisaoRaqueteBiblioteca(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
  }

function mostraBolinha(){
  circle(xBolinha,yBolinha,diametro);
}

function movimentaBolinha(){
  xBolinha += velocidadeX;
  yBolinha += velocidadeY;  
}

function verificaBorda(){
  if (xBolinha + raio > width || xBolinha - raio < 0){
    velocidadeX *= -1
  }
  
  if (yBolinha + raio > height || yBolinha - raio < 0){
    velocidadeY *=-1
  }
}

function mostraRaquete(x, y){
  rect(x,y,compRaquete,alturaRaquete)
}

function mostraRaqueteOponente(){
  rect(xRaqueteOponente,yRaqueteOponente,compRaqueteOponente,alturaRaqueteOponente)
}

function movimentaRaquete(){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10;}
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
  yRaquete = constrain(yRaquete,0, 360);
}

//Modo jogo multiplayer
/*function movimentaRaqueteOponente(){
  if (keyIsDown(87)){
    yRaqueteOponente -= 10;}
  if (keyIsDown(83)){
    yRaqueteOponente += 10;
  }
  yRaqueteOponente = constrain(yRaqueteOponente,0, 365);
}*/

function calculaChanceDeErrar() {
  if (pontosOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}

function movimentaRaqueteOponente(){
  velocidadeYRaquete = yBolinha - yRaqueteOponente - compRaquete/2 - 30;
  yRaqueteOponente += velocidadeYRaquete + chanceDeErrar;
  calculaChanceDeErrar();
  yRaqueteOponente = constrain(yRaqueteOponente, 0, 365)

}

function verificaColisaoRaquete(){
  if (xBolinha - raio < xRaquete + compRaquete && yBolinha - raio < yRaquete + alturaRaquete && yBolinha + raio > yRaquete){
    velocidadeX *= -1;
    raquetada.play();
  }
}

function colisaoRaqueteBiblioteca(x, y){
  
  colidiu = 
collideRectCircle(x, y, compRaquete, alturaRaquete, xBolinha, yBolinha, raio);
  if(colidiu){
    velocidadeX *= -1;
    raquetada.play();
  }
  
}

function incluiPlacar(){
  stroke(255);
  textSize(18);
  textAlign(CENTER);
  fill(color(255, 140, 0));
  rect(255, 5, 45, 30);
  fill(255);
  text(meusPontos, 278, 27)
  fill(color(255, 140, 0));
  rect(378, 5, 45, 30);
  fill(255);
  text(pontosOponente, 400, 27)
}

function marcaPonto(){
  if(xBolinha > 690){
    meusPontos +=1;
    ponto.play();
  }
  if(xBolinha < 10){
    pontosOponente +=1;
    ponto.play();
  }
}
