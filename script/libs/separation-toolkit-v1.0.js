/*
 * Toolkit for the Separation Project
 * 
 * Includes the gestures and the animations
 */

/*
 * @namespace Separation
 */
var Separation = {};

Separation.horizontal_move = function(params, actionLayer, stage){
  var rect = new Kinetic.Rect({
    x: params.x,
    y: params.y,
    width: params.width,
    height: params.height,
    opacity: 1,
    fill: 'blue'
  });

  var rTl = 0;
  var lTr = 0;
  var x = 0;
  var oldx = 0;

  var section = params.width / 4;

  this.rightToLeft = function(handler){
    switch(rTl){
      case 0:
        if(x > (params.x + section * 3)){ 
          rTl = 1; 
        }
        break;

      case 1:
        if(x < oldx){
          if((x > (params.x + section * 2)) && (x < (params.x + section * 3))){
            rTl = 2;
          }
        } else { rTl = 0; }
        break;

      case 2:
        if(x < oldx){
          if((x > (params.x + section)) && (x < (params.x + section * 2))){
            rTl = 3;
          }
        } else { rTl = 0; }
        break;

      case 3:
        if(x < oldx){
          if(x < (params.x + section)){
            handler()
            rTl = 0;
          }
        } else { rTl = 0; }
        break;
    };
  }

  this.leftToRight = function(handler){
    switch(lTr){
      case 0:
        if(x < params.x + section){ 
          lTr = 1; 
        }
        break;

      case 1:
        if(x > oldx){
          if((x > (params.x + section)) && (x < (params.x + section * 2))){
            lTr = 2;
          }
        } else { lTr = 0; }
        break;

      case 2:
        if(x > oldx){
          if((x > (params.x + section * 2)) && (x < (params.x + section * 3))){
            lTr = 3;
          }
        } else { lTr = 0; }
        break;

      case 3:
        if(x > oldx){
          if(x > params.x + section * 3){
            handler()
            lTr = 0;
          }
        } else { lTr = 0; }
        break;
    };
  }  

  this.on = function(handler){
    rect.on('touchmove', function(){
      x = stage.getTouchPosition().x;
      handler()
      oldx = x;
    });
  }

  actionLayer.add(rect);
}

/*
 * Geste qui détecte la séparation d'un mot
 *
 * @param {Object} paramètres pour dessiner le rectangle : taille du rectangle, placement du rectangle
 * @param {Text} type de coupure : "l_r" pour left to right, "r_l" pour le contraire, toutes les autres valeurs pour les deux sens
 * @param {Kinetic.Layer} layer sur lequel on va mettre le rectangle
 * @param {Kinetic.Stage} stage de la page
 * déclenche la fonction handler dès que la fonction repère un mouvement de coupure
 */
Separation.cut = function(params, type, actionLayer, stage){
  var detect = new Separation.horizontal_move(params, actionLayer, stage);

  this.on = function(handler) {
    detect.on(function(){
      if (type != "l_r") {detect.rightToLeft(handler);}
      if (type != "r_l") {detect.leftToRight(handler);} 
    });
  }
};

Separation.rub = function(params, actionLayer, stage){
  var detect = new Separation.horizontal_move(params, actionLayer, stage); 

  this.on = function(handler) {
    var state = true;

    detect.on(function(){
      if(state) {
        detect.rightToLeft(function(){
          handler()
          state = false;
        });
      } else {
        detect.leftToRight(function(){
          handler()
          state = true;
        }); 
      }
    });
  }
};

Separation.tear = function(params, type, actionLayer, stage){
  var rTl = 0;
  var lTr = 0;
  var x1 = 0;
  var x2 = 0;
  var oldx1 = 0;
  var oldx2 = 0;

  var section = params.width / 4;
  
  function inRectangle(touchPos){
    if(
      ((touchPos.x1 > params.x) && (touchPos.x1 < (params.x + params.width))) &&
      ((touchPos.x2 > params.x) && (touchPos.x2 < (params.x + params.width))) &&
      ((touchPos.y1 > params.y) && (touchPos.y1 < (params.y + params.height / 2))) &&
      ((touchPos.y2 > (params.y + params.height / 2)) && (touchPos.y2 < (params.y + params.height)))
    ){
      return true;
    } else { return false; }
  }

  function rightToLeft(handler){
    switch(rTl){
      case 0:
        if(
          (x1 > (params.x + section * 3)) &&
          (x2 > (params.x + section * 3))
        ){
          rTl = 1;
        }
        break;

      case 1:
        if((x1 < oldx1) && (x2 < oldx2)){
          if(
            ((x1 > (params.x + section * 2)) && (x1 < (params.x + section * 3))) &&
            ((x2 > (params.x + section * 2)) && (x2 < (params.x + section * 3)))
          ){
            rTl = 2;
          }
        } else { rTl = 0; }
        break;

      case 2:
        if((x1 < oldx1) && (x2 < oldx2)){
          if(
            ((x1 > (params.x + section)) && (x1 < (params.x + section * 2))) &&
            ((x2 > (params.x + section)) && (x2 < (params.x + section * 2)))
          ){
            rTl = 3;
          }
        } else { rTl = 0; }

      case 3:
        if((x1 < oldx1) && (x2 < oldx2)){
          if(
            (x1 < (params.x + section)) &&
            (x2 < (params.x + section))          
          ){
            handler()
            rTl = 0;
          }
        } else { rTl = 0; }
    };
  }

  function leftToRight(handler){
    switch(lTr){
      case 0:
        if(
          (x1 < (params.x + section)) &&
          (x2 < (params.x + section))
        ){
          lTr = 1;
        }
        break;

      case 1:
        if((x1 > oldx1) && (x2 > oldx2)){
          if(
            ((x1 > (params.x + section)) && (x1 < (params.x + section * 2))) &&
            ((x2 > (params.x + section)) && (x2 < (params.x + section * 2)))
          ){
            lTr = 2;
          }
        } else { lTr = 0; }
        break;

      case 2:
        if((x1 > oldx1) && (x2 > oldx2)){
          if(
            ((x1 > (params.x + section * 2)) && (x1 < (params.x + section * 3))) &&
            ((x2 > (params.x + section * 2)) && (x2 < (params.x + section * 3)))
          ){
            rTl = 3;
          }
        } else { lTr = 0; }

      case 3:
        if((x1 > oldx1) && (x2 > oldx2)){
          if(
            (x1 > (params.x + section * 3)) &&
            (x2 > (params.x + section * 3))          
          ){
            handler()
            lTr = 0;
          }
        } else { lTr = 0; }
    };
  }

  this.on = function(handler) {
    function detect(event){
      event.preventDefault;

      if(event.touches[1]){
        var touch1 = 0;
        var touch2 = 1;

        if(event.touches[0].pageY < event.touches[0].pageY) {
          touch1 = event.touches[0];
          touch2 = event.touches[1];
        } else {
          touch1 = event.touches[1];
          touch2 = event.touches[0];
        }

        var touchPos = {
          x1: touch1.pageX,
          y1: touch1.pageY,
          x2: touch2.pageX,
          y2: touch2.pageY
        };

        x1 = touch1.pageX;
        x2 = touch2.pageX;

        if(inRectangle(touchPos)){
          if (type != "l_r") { rightToLeft(handler); }
          if (type != "r_l") { leftToRight(handler); }
  
          actionLayer.add(rect_h);
          stage.add(actionLayer);
        }

        oldx1 = x1;
        oldx2 = x2;        
      }
    };

    window.addEventListener("touchmove", detect, false);
  }
};

/*
 * Création d'une classe word destinée à stocker les mots de tous nos textes
 * Les mots possèderons ainsi des fonctions spécifiques
 * hérite de la classe Kinetic.Text
 */
Separation.Word = function(params, layer){
  Kinetic.Text.call(this, params);

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