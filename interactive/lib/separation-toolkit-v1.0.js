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
 * détecter des mouvements horizontaux
 *
 * @param {Object} paramètres pour dessiner le rectangle : taille du rectangle, placement du rectangle
 * fonction utilisée pour coder cut et rub
 */
Separation.horizontal_move = function(params){
  var rTl = 0;
  var lTr = 0;
  var x = 0;
  var oldx = 0;

  var section = params.width / 4;

  function inRectangle(touchPos){
    if(
      ((touchPos.x > params.x) && (touchPos.x < (params.x + params.width))) &&
      ((touchPos.y > params.y) && (touchPos.y < (params.y + params.height))) 
    ){
      return true;
    } else { return false; }
  }

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
    function corpus(touchPos){
      x = touchPos.x;

      if(inRectangle(touchPos) == true){
        handler()
      }
      else {
        rTl = 0;
        lTr = 0;
      }

      oldx = x;
    };

    // touch event
    function detect_touch(event){
      event.preventDefault;

      var touchPos = {
        x: event.touches[0].pageX,
        y: event.touches[0].pageY
      }
      corpus(touchPos);
    };

    window.addEventListener("touchmove", detect_touch, false);

    // mouse event
    function detect_mouse(event){
      if(event.which == 1){ // la souris est clickée
        var touchPos = {
          x: event.clientX,
          y: event.clientY
        }
        corpus(touchPos);
      }
    };

    window.addEventListener("mousemove", detect_mouse, false);
  }
}


/*																!----------------------------------------------------------------!
 * détecter des mouvements verticaux
 *
 * @param {Object} paramètres pour dessiner le rectangle : taille du rectangle, placement du rectangle
 * fonction utilisée pour coder cut et rub
 */
Separation.vertical_move = function(params){
  var rTl = 0;
  var lTr = 0;
  var x = 0;
  var oldx = 0;

  var section = params.width / 4;

  function inRectangle(touchPos){
    if(
      ((touchPos.x > params.x) && (touchPos.x < (params.x + params.width))) &&
      ((touchPos.y > params.y) && (touchPos.y < (params.y + params.height))) 
    ){
      return true;
    } else { return false; }
  }

  this.downToUp = function(handler){
    switch(rTl){
      case 0:
        if(y > (params.y + section * 3)){ 
          rTl = 1; 
        }
        break;

      case 1:
        if(y < oldy){
          if((y > (params.y + section * 2)) && (y < (params.y + section * 3))){
            rTl = 2;
          }
        } else { rTl = 0; }
        break;

      case 2:
        if(y < oldy){
          if((y > (params.y + section)) && (y < (params.y + section * 2))){
            rTl = 3;
          }
        } else { rTl = 0; }
        break;

      case 3:
        if(y < oldy){
          if(y < (params.y + section)){
            handler()
            rTl = 0;
          }
        } else { rTl = 0; }
        break;
    };
  }

  this.upToDown = function(handler){
    switch(lTr){
      case 0:
        if(y < params.y + section){ 
          lTr = 1; 
        }
        break;

      case 1:
        if(y > oldx){
          if((y > (params.y + section)) && (y < (params.y + section * 2))){
            lTr = 2;
          }
        } else { lTr = 0; }
        break;

      case 2:
        if(y > oldx){
          if((y > (params.y + section * 2)) && (y < (params.y + section * 3))){
            lTr = 3;
          }
        } else { lTr = 0; }
        break;

      case 3:
        if(y > oldy){
          if(y > params.y + section * 3){
            handler()
            lTr = 0;
          }
        } else { lTr = 0; }
        break;
    };
  }  

  this.on = function(handler){
    function corpus(touchPos){
      y = touchPos.y;

      if(inRectangle(touchPos) == true){
        handler()
      }
      else {
        rTl = 0;
        lTr = 0;
      }

      oldy = y;
    };

    // touch event
    function detect_touch(event){
      event.preventDefault;

      var touchPos = {
        x: event.touches[0].pageX,
        y: event.touches[0].pageY
      }
      corpus(touchPos);
    };

    window.addEventListener("touchmove", detect_touch, false);

    // mouse event
    function detect_mouse(event){
      if(event.which == 1){ // la souris est clickée
        var touchPos = {
          x: event.clientX,
          y: event.clientY
        }
        corpus(touchPos);
      }
    };

    window.addEventListener("mousemove", detect_mouse, false);
  }
}





/*
 * Geste qui détecte la séparation d'un mot
 *
 * @param {Object} paramètres pour dessiner le rectangle : taille du rectangle, placement du rectangle
 * @param {Text} type de coupure : "l_r" pour left to right, "r_l" pour le contraire, toutes les autres valeurs pour les deux sens
 * déclenche la fonction handler dès que la fonction repère un mouvement de coupure
 * faire attention à définir la fonction après les autres variables pour que le rectangle soit au premier plan
 */
Separation.cut = function(params, type){
  var detect = new Separation.horizontal_move(params);

  this.on = function(handler) {
    detect.on(function(){
      if (type != "l_r") {detect.rightToLeft(handler);}
      if (type != "r_l") {detect.leftToRight(handler);} 
    });
  }
};

/*
 * Geste qui détecte le frottement d'un mot
 *
 * @param {Object} paramètres pour dessiner le rectangle : taille du rectangle, placement du rectangle
 * déclenche la fonction handler dès que la fonction repère un mouvement de frottement
 * penser à coder une fonction qui procède par paliers
 * faire attention à définir la fonction après les autres variables pour que le rectangle soit au premier plan
 */
Separation.rub = function(params){
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

/*
 * Geste qui détecte la déchirure d'un mot (coupure à deux doigts)
 *
 * @param {Object} paramètres pour dessiner le rectangle : taille du rectangle, placement du rectangle
 * @param {Text} type de coupure : "l_r" pour left to right, "r_l" pour le contraire, toutes les autres valeurs pour les deux sens
 * déclenche la fonction handler dès que la fonction repère un mouvement de déchirure
 */
Separation.tear = function(params, type){
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
    function detect_touch(event){
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
        }

        oldx1 = x1;
        oldx2 = x2;        
      }
    };

    window.addEventListener("touchmove", detect_touch, false);

    function detect_mouse(event){
      var detect_mouse = new Separation.cut(params, type);

      detect_mouse.on(handler);
    }

    window.addEventListener("mousemove", detect_mouse, false);
  }
};

/*
 * Detecter si un mouvement est sur une zone
 *
 * @param {Object} pamètres pour dessiner le rectangle
 * renvoie vrai si le toucher est dans le rectangle, et faux sinon
 */
Separation.onZone = function(params){
  var tolerance = stage.getWidth() / 20;

  function inRectangle(touchPos){
    if(
      ((touchPos.x > (params.x - tolerance)) && (touchPos.x < (params.x + params.width + tolerance))) &&
      ((touchPos.y > (params.y - tolerance)) && (touchPos.y < (params.y + params.height + tolerance)))
    ){
      return true;
    } else { return false; }
  }

  this.on = function(handler){
    function detect_touch(event){
      var touchPos = {
        x: event.touches[0].pageX,
        y: event.touches[0].pageY
      }

      if(!inRectangle(touchPos)){ handler() };

    }

    window.addEventListener('touchmove', detect_touch, false);

    function detect_mouse(event){
      if(event.which == 1){ // la souris est clickée
        var touchPos = {
          x: event.clientX,
          y: event.clientY
        }
        
        if(!inRectangle(touchPos)){ handler() };
      }
    };

    window.addEventListener("mousemove", detect_mouse, false);

  }
};







/*
 * Geste qui détecte le scroll sur un mot  !----------------------------------------------------------------!
 *
 * @param {Object} paramètres pour dessiner le rectangle : taille du rectangle, placement du rectangle
 * @param {Text} type de coupure : "u_d" pour up to down, "d_u" pour le contraire, toutes les autres valeurs pour les deux sens
 * déclenche la fonction handler dès que la fonction repère un mouvement de coupure
 * faire attention à définir la fonction après les autres variables pour que le rectangle soit au premier plan
 */
Separation.scroll = function(params, type){
  var detect = new Separation.horizontal_move(params);

  this.on = function(handler) {
    detect.on(function(){
      if (type != "u_d") {detect.upToDown(handler);}
      if (type != "d_u") {detect.downToUp(handler);} 
    });
  }
};
