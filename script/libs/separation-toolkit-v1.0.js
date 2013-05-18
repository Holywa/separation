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
    opacity: 0
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

      case 3:
        if(x < oldx){
          if(x < (params.x + section)){
            handler()
            rTl = 0;
          }
        } else { rTl = 0; }
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

      case 3:
        if(x > oldx){
          if(x > params.x + section * 3){
            handler()
            lTr = 0;
          }
        } else { lTr = 0; }
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

Separation.tear = function(params, actionLayer, stage){
  var rect_h = new Kinetic.Rect({
    x: params.x,
    y: params.y,
    width: params.width,
    height: params.height / 2,
    fill: "blue",
    opacity: 1
  });

  var rect_b = new Kinetic.Rect({
    x: params.x,
    y: params.y + params.height / 2,
    width: params.width,
    height: params.height / 2,
    fill: "red",
    opacity: 1
  });

  var rTl_1 = 0;
  var rTl_2 = 0;
  //var lTr = 0;

  function tearRightToLeft(touchPos, handler){
    handler()
    /*if( 
      (touchPos.touch1_x >= (params.width + params.x - 20) &&       
      (touchPos.touch2_x >= (params.width + params.x - 20)     
    ) {
      rTl_1 = params.width + params.x;
      rTl_2 = params.width + params.x;
    }
    else if(
      (rTl1 != 0) && (touchPos.touch1_x <= (params.x + 20)) &&
      (rTl2 != 0) && (touchPos.touch2_x <= (params.x + 20))
    ) {
      rTl_1 = 0;
      rTl_2 = 0;
      handler()
    }  
    else if(
      (touchPos.touch1_x < rTl_1) && 
        ((touchPos.touch1_y < (params.height / 2 + params.y)) && (touchPos.touch1_y > params.y)) &&
      (touchPos.touch2_x < rTl_2) && 
        ((touchPos.touch2_y < (params.height + params.y)) && (touchPos.touch2_y > params.y + params.height / 2))
    ){ 
      rTl_1 = touchPos.touch1_x; 
      rTl_2 = touchPos.touch2_x;
    }
    else{ 
      rTl = 0; 
    }  */
  }

  function tearLeftToRight(touchPos, handler){
    /*if(touchPos.x <= (params.x + 20)) {
      lTr = params.x;
    }
    else if((lTr != 0) && (touchPos.x >= (params.width + params.x - 20))) {
      lTr = 0;
      handler()
    }
    else if((touchPos.x > lTr) && ((touchPos.y < (params.height + params.y)) && (touchPos.y > params.y))){
      lTr = touchPos.x;
    }
    else{ 
      lTr = 0;
    }  */
  }

  this.on = function(handler) {
    function detect(event){
      handler()
      event.preventDefault

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
        touch1_x: touch1.pageX,
        touch1_y: touch1.pageY,
        touch2_x: touch2.pageX,
        touch2_y: touch2.pageY
      };

      if (type != "l_r") {cutRightToLeft(touchPos, handler);}
      if (type != "r_l") {cutLeftToRight(touchPos, handler);} 
    };

    window.addEventListener("gestureend", detect, false);
  }

  actionLayer.add(rect_h);
  actionLayer.add(rect_b);
};

Separation.scroll = function(){

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