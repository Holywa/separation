/*
 * Toolkit for the Separation Project
 * 
 * Inlcudes the gestures and the animations
 */

var Separation = {};

/*
 * Geste qui détecte la séparation d'un mot
 *
 * paramètres :
 *  taille du rectangle
 *  location du rectangle sur le layer
 *  layer
 *  stage
 *
 * déclenche la fonction handler dès que la fonction repère un mouvement de coupure
 */
Separation.cut = function(parameters, actionLayer, stage){
  var rect = new Kinetic.Rect({
    x: parameters.x,
    y: parameters.y,
    width: parameters.width,
    height: parameters.height,
    opacity: 0
  });

  var x = 0;

  this.on = function(handler) { // CODER LA FONCTION DANS LES DEUX SENS
    rect.on('touchmove', function(){
      var touchPos = stage.getTouchPosition();

      if(touchPos.x >= (parameters.width + parameters.x - 20)) {
        x = parameters.width + parameters.x;
      }
      else if((x != 0) && (touchPos.x <= (parameters.x + 20))) {
        x = 0;
        handler()
      }  
      else if((touchPos.x < x) && ((touchPos.y < (parameters.height + parameters.y)) && (touchPos.y > parameters.y))){ 
        x = touchPos.x; 
      }
      else{ 
        x = 0; 
      }
    });
  }

  actionLayer.add(rect);
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