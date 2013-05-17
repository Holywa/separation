/*
 * Toolkit for the Separation Project
 * 
 * Includes the gestures and the animations
 */

/*
 * @namespace Separation
 */
var Separation = {};

/*
 * Geste qui détecte la séparation d'un mot
 *
 * @param {Object} paramètres pour dessiner le rectangle : taille du rectangle, placement du rectangle
 * @param {Text} type de coupure : "l_r" pour left to right, "r_l" pour le contraire, toutes les autres valeurs pour les deux sens
 * @param {Kinetic.Layer} layer sur lequel on va mettre le rectangle
 * @param {Kinetic.Stage} stage de la page
 * déclenche la fonction handler dès que la fonction repère un mouvement de coupure
 */
Separation.cut = function(parameters, type, actionLayer, stage){
  var rect = new Kinetic.Rect({
    x: parameters.x,
    y: parameters.y,
    width: parameters.width,
    height: parameters.height,
    opacity: 0
  });

  var rTl = 0;
  var lTr = 0;

  function cutRightToLeft(touchPos, handler){
    if(touchPos.x >= (parameters.width + parameters.x - 20)) {
      rTl = parameters.width + parameters.x;
    }
    else if((rTl != 0) && (touchPos.x <= (parameters.x + 20))) {
      rTl = 0;
      handler()
    }  
    else if((touchPos.x < rTl) && ((touchPos.y < (parameters.height + parameters.y)) && (touchPos.y > parameters.y))){ 
      rTl = touchPos.x; 
    }
    else{ 
      rTl = 0; 
    }  
  }

  function cutLeftToRight(touchPos, handler){
    if(touchPos.x <= (parameters.x + 20)) {
      lTr = parameters.x;
    }
    else if((lTr != 0) && (touchPos.x >= (parameters.width + parameters.x - 20))) {
      lTr = 0;
      handler()
    }
    else if((touchPos.x > lTr) && ((touchPos.y < (parameters.height + parameters.y)) && (touchPos.y > parameters.y))){
      lTr = touchPos.x;
    }
    else{ 
      lTr = 0;
    }  
  }

  this.on = function(handler) {
    rect.on('touchmove', function(){
      touchPos = stage.getTouchPosition();

      if (type != "l_r") {cutRightToLeft(touchPos, handler);}
      if (type != "r_l") {cutLeftToRight(touchPos, handler);} 
    });
  }

  actionLayer.add(rect);
};

Separation.tear = function(){

};

Separation.rub = function(){

};

Separation.scroll = function(){

};

/*
 * Création d'une classe word destinée à stocker les mots de tous nos textes
 * Les mots possèderons ainsi des fonctions spécifiques
 * hérite de la classe Kinetic.Text
 */
Separation.Word = function(parameters, layer){
  Kinetic.Text.call(this, parameters);

  /*
   * Fonction tap qui permet d'agrandir un mot dès que celui-ci est sélectionné
   */
  this.on('tap', function(){ // REACTUALISER EN FONCTION DE KINETIC
      /*TweenLite.to(this, 1, {
        setScaleX: 2,
        setScaleY: 2,
        delay: 0,
        onUpdate: function() {
          layer.batchDraw() 
        }
      })*/
  });
};

Separation.Word.prototype = new Kinetic.Text();

/*
 * CREER LES CLASSES POLICES MAJ MIN CENTRALE ...
 */