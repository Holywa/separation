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
 * Logo de la Separation à utiliser comme on veut
 *
 * l'ajouter comme un node normal en appelant "layer.add(logo.overall)"
 * on peut modifier tous les attributs via logo.overall qui est un groupe
 */
function Logo(){
  border = 20;
  radius = 6 * border;
  x = 6 * border;
  y = 6 * border;

  function draw(){
    arc_haut = new Kinetic.Spline({
      points: [{
        x: x - radius,
        y: y - Math.sin(Math.PI - 0.1) * radius
      }, {
        x: x + Math.cos(3 * Math.PI / 4) * radius,
        y: y - Math.sin(3 * Math.PI / 4) * radius 
      }, {
        x: x,
        y: y - radius
      }, {
        x: x + Math.cos(Math.PI / 4) * radius,
        y: y - Math.sin(Math.PI / 4) * radius 
      }, {
        x: x + radius,
        y: y - Math.sin(0.1) * radius
      }],
      stroke: '#FFF',
      strokeWidth: border,
      lineCap: 'square',
      tension: 0.4
    });

    arc_bas = new Kinetic.Spline({
      points: [{
        x: x - radius,
        y: 1.2*y - Math.sin(Math.PI + 0.1) * radius
      }, {
        x: x + Math.cos(3 * Math.PI / 4) * radius,
        y: 1.2*y + Math.sin(3 * Math.PI / 4) * radius 
      }, {
        x: x,
        y: 1.2*y + radius
      }, {
        x: x + Math.cos(Math.PI / 4) * radius,
        y: 1.2*y + Math.sin(Math.PI / 4) *radius 
      }, {
        x: x + radius,
        y: 1.2*y - Math.sin(-0.1) * radius
      }],
      stroke: '#FFF',
      strokeWidth: border,
      lineCap: 'square',
      tension: 0.4
    });

    line = new Kinetic.Line({
      points: [x - 4.5*border, 1.05*y, x + 4.5*border, 1.05*y],
      stroke: "#FFF",
      strokeWidth: border,
    });

    logo_group = new Kinetic.Group();
    logo_group.add(arc_haut);
    logo_group.add(arc_bas);
    logo_group.add(line);
  }
  
  draw();

  this.arc_haut = arc_haut;
  this.arc_bas = arc_bas;
  this.line = line;
  this.overall = logo_group;

  this.getWidth = function(){ return 12 * border; }
  this.getHeight = function(){ return (12*border + 0.1*y);}
};

/////////////////////////////////////////////////////////////////////
//                              Gestes                             //
/////////////////////////////////////////////////////////////////////

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
    // touch event
    function detect_touch(event){
      event.preventDefault;

      var touchPos = {
        x: event.touches[0].pageX,
        y: event.touches[0].pageY
      }
      
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

    window.addEventListener("touchmove", detect_touch, false);
  }
}


/*					
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
    // touch event
    function detect_touch(event){
      event.preventDefault;

      var touchPos = {
        x: event.touches[0].pageX,
        y: event.touches[0].pageY
      }
      
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

    window.addEventListener("touchmove", detect_touch, false);
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
  }
};

/*
 * Geste qui détecte le scroll sur un mot
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

/*
 * Detecter si un mouvement est sur une zone
 *
 * @param {Object} pamètres pour dessiner le rectangle
 * renvoie vrai si le toucher est dans le rectangle, et faux sinon
 */
Separation.onZone = function(params){
  function inRectangle(touchPos){
    if(
      ((touchPos.x > (params.x)) && (touchPos.x < (params.x + params.width))) &&
      ((touchPos.y > (params.y)) && (touchPos.y < (params.y + params.height)))
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
  }
};

Separation.onCorner = function(){
  var lines = stage.getHeight() / 6;
  var cols = stage.getWidth() / 6;

  var detect = new Separation.onZone({
    x: cols,
    y: lines,
    width: 4*cols,
    height: 4*lines
  });

  this.on = function(handler){
    detect.on(handler);
  }
}


/////////////////////////////////////////////////////////////////////
//                           Words Types                           //
/////////////////////////////////////////////////////////////////////
/*
 *  Demihaut word constructor
 */
function word_demihaut(params){
  this.haut = new Kinetic.Text({
    text: params.mot1,
    fontSize:  params.fontSize,
    fontFamily: 'DemiHautH',
    fill: params.fill
  });

  this.bas_a = new Kinetic.Text({
    text: params.mot1,
    fontSize:  params.fontSize,
    fontFamily: 'DemiHautB',
    fill: params.fill
  });

  this.bas_b = new Kinetic.Text({
    text: params.mot2,
    fontSize:  params.fontSize,
    fontFamily: 'DemiHautB',
    fill: params.fill
  });

  this.bas_a.setOffset({ y: - this.bas_a.getHeight() + 0.1 * params.fontSize });
  this.bas_b.setOffset({ 
    x: params.offsetMot2, 
    y: - this.bas_a.getHeight() + 0.1 * params.fontSize 
  });

  this.group = new Kinetic.Group({
    x: params.x,
    y: params.y,
    offsetY: - 0.7*params.fontSize,
    width: this.haut.getWidth(),
    height: this.haut.getHeight() + this.bas_a.getHeight() - 0.1 * params.fontSize
  });

  this.group.add(this.haut);
  this.group.add(this.bas_a);
  this.group.add(this.bas_b);
};

function word_demibas(params){
  this.bas = new Kinetic.Text({
    text: params.mot1,
    fontSize:  params.fontSize,
    fontFamily: 'DemiBasB',
    fill: params.fill
  });

  this.haut_a = new Kinetic.Text({
    text: params.mot1,
    fontSize:  params.fontSize,
    fontFamily: 'DemiBasH',
    fill: params.fill
  });

  this.haut_b = new Kinetic.Text({
    text: params.mot2,
    fontSize:  params.fontSize,
    fontFamily: 'DemiBasH',
    fill: params.fill
  });

  this.haut_b.setOffset({ 
    x: params.offsetMot2 });
  this.bas.setOffset({
	y : - this.bas.getHeight() + 0.1 * params.fontSize
   });

  this.group = new Kinetic.Group({
    x: params.x,
    y: params.y,
    offsetY: - 0.7*params.fontSize,
    width: this.bas.getWidth(),
    height: this.bas.getHeight() + this.haut_a.getHeight() - 0.1 * params.fontSize
  });

  this.group.add(this.bas);
  this.group.add(this.haut_a);
  this.group.add(this.haut_b);
};


/*
 *  Ombre word constructor
 */
function word_ombre(params){
  var imageObj1 = new Image();
  imageObj1.src = params.img1;
  var imageObj2 = new Image();
  imageObj2.src = params.img2;
  
  this.img_a = new Kinetic.Image({
    image: imageObj1,
    width: params.width,
    height: params.height
  });
  imageObj1.onload = function() { this.img_a };
  
  this.img_b = new Kinetic.Image({
    image: imageObj2,
    width: params.width,
    height: params.height,
    opacity: 0
  });
  imageObj2.onload = function() { this.img_b };

  this.group = new Kinetic.Group({
    x: params.x,
    y: params.y,
    width: params.width,
    height: params.height
  });

  this.group.add(this.img_a);
  this.group.add(this.img_b);
 };


/*
 *  Centrale word constructor
 */
function word_centrale(params){
  this.haut = new Kinetic.Text({
    text: params.mot1,
    fontSize:  params.fontSize,
    fontFamily: 'CentraleH',
    fill: params.fill
  });

  this.center_a = new Kinetic.Text({
    text: params.mot1,
    fontSize:  params.fontSize,
    fontFamily: 'CentraleC',
    fill: params.fill
  });

  this.center_b = new Kinetic.Text({
    text: params.mot2,
    fontSize:  params.fontSize,
    fontFamily: 'CentraleC',
    fill: params.fill,
    scaleX: 0
  });

  this.bas = new Kinetic.Text({
    text: params.mot1,
    fontSize:  params.fontSize,
    fontFamily: 'CentraleB',
    fill: params.fill
  });

  this.center_a.setOffset({ 
    y: - this.haut.getHeight() + 0.5 * params.fontSize 
  });
  this.center_b.setOffset({ 
    x: - stage.getWidth() / 4,
    y: - this.haut.getHeight() + 0.5 * params.fontSize
  });
  this.bas.setOffset({ 
    y: - this.haut.getHeight() - this.center_a.getHeight() + 1.1 * params.fontSize 
  });

  this.group = new Kinetic.Group({
    x: params.x,
    y: params.y,
    offsetY: - 0.95*params.fontSize,
    width: this.haut.getWidth(),
    height: this.haut.getHeight() + this.center_a.getHeight() + this.bas.getHeight() - 1.1*params.fontSize
  });

  this.group.add(this.haut);
  this.group.add(this.center_a);
  this.group.add(this.center_b);
  this.group.add(this.bas);
};



/////////////////////////////////////////////////////////////////////
//                        Play with nodes                          //
/////////////////////////////////////////////////////////////////////
/*
 *  Tweens for opacity settings
 */
function node_set_opacity(node, opacity){
  var tween = new Kinetic.Tween({
    node: node,
    duration: 1,
    opacity: opacity
  });
  tween.play();
};

function node_dark(node){ node_set_opacity(node, 0.25); };

function node_light(node){ node_set_opacity(node, 1); };

/*
 *  Tweens for zooming
 */
function node_set_zoom(node, x, y, zoom){
  var tween = new Kinetic.Tween({
    node: node,
    duration: 1,
    scaleX: zoom,
    scaleY: zoom,
    x: x,
    y: y
  });
  tween.play(); 
};

function node_zoom(node, x, y){ node_set_zoom(node, x, y, 2); };

function node_unzoom(node, x, y){ node_set_zoom(node, x, y, 1); };

function zooming_center(node, zoom){
  var x = 0.5 * (stage.getWidth() - node.getWidth()*zoom + node.getOffsetX());
  var y = 0.5 * (stage.getHeight() - node.getHeight()*zoom + node.getOffsetY());

  node_set_zoom(node, x, y, zoom);
};

/*
 * Get position and size of a node after scaling
 */
function node_position(node){
  params = {
    x: node.getX() - node.getOffsetX(),
    y: node.getY() - node.getOffsetY(),
    width: node.getWidth() * node.getScaleX(),
    height: node.getHeight() * node.getScaleY()
  };

  return params;
};


/////////////////////////////////////////////////////////////////////
//                            Animations                           //
/////////////////////////////////////////////////////////////////////
/*
 * Animation associated to cut movement
 */
Separation.cut_animation = function(cut_word){
  var shape_position = node_position(cut_word.group);

  var couper = new Separation.cut({
    x: shape_position.x,
    y: shape_position.y,
    width: shape_position.width,
    height: shape_position.height
  });

  var params1 = {
    x: cut_word.bas_a.getX(),
    y: cut_word.bas_a.getY(),
    offsetX: cut_word.bas_a.getOffsetX(), 
    offsetY: cut_word.bas_a.getOffsetY()
  };

  var params2 = {
    x: cut_word.bas_b.getX(),
    y: cut_word.bas_b.getY(),
    offsetX: cut_word.bas_b.getOffsetX(), 
    offsetY: cut_word.bas_b.getOffsetY()
  };

  var sens = true; // quel mot doit-on faire apparaitre

  function animation_cut(node1, node2){
    var tween1 = new Kinetic.Tween({
      node: node1,
      duration: 2,
      easing: Kinetic.Easings.StrongEaseInOut,
      y: 2 * stage.getHeight()
    })
    tween1.play();     

    var tween2 = new Kinetic.Tween({
      node: node2,
      duration: 2,
      easing: Kinetic.Easings.StrongEaseInOut,
      x: params1.x,
      offsetX: params1.offsetX
    })
    setTimeout(function(){
      tween2.play();
    }, 400)  

    setTimeout(function(){
      tween1.finish();
      tween2.finish(); 

      node1.setAttrs({
        x: params2.x,
        offsetX: params2.offsetX,
        y: params2.y,
        offsetY: params2.offsetY
      });
    }, 2000);       
  }

  this.start = function(lock){
    if(lock == true){
      couper.on(function(){
        if(sens == true){
          animation_cut(cut_word.bas_a, cut_word.bas_b);
          sens = false;
        } else {
          animation_cut(cut_word.bas_b, cut_word.bas_a);
          sens = true;
        }
      });
    }
  }
}

/*
 *  Animation associated to rub movement
 */
Separation.rub_animation = function(rub_word){
  var shape_position = node_position(rub_word.group);

  var frotter = new Separation.rub({
    x: shape_position.x,
    y: shape_position.y,
    width: shape_position.width,
    height: shape_position.height
  });

  var sens = true; // quel mot doit-on faire apparaitre

  var velocity = 0.2; // vitesse d'effacement
  var tempo = 0; // pour ne pas réinverser l'effet tout de suite

  var new_opacity = function(){
    var op = rub_word.img_a.getOpacity()

    if(sens == true){
      if(op >= velocity){ return (op - velocity); }
      else {
        if(tempo < 10){
          tempo = tempo + 1;
          return 0;
        } else {
          tempo = 0;
          sens = false;
          return 0; 
        } 
      }
    } else {
      if(op <= (1 - velocity)){ return (op + velocity); }
      else {
        if(tempo < 10){
          tempo = tempo + 1;
          return 1;
        } else {
          tempo = 0;
          sens = true;
          return 1; 
        } 
      }
    }
  }

  this.start = function(lock){
    if(lock == true){
      frotter.on(function(){
        var new_op = new_opacity();

        var tween_a = new Kinetic.Tween({
          node: rub_word.img_a,
          duration: 0,
          opacity: new_op
        });
        tween_a.play();

        var tween_b = new Kinetic.Tween({
          node: rub_word.img_b,
          duration: 0,
          opacity: 1 - new_op
        });
        tween_b.play();
      });  
    }
  } 
};

/*
 *  Animation associated to tear movement
 */
Separation.tear_animation = function(tear_word){
  var shape_position = node_position(tear_word.group);

  var dechirer = new Separation.tear({
    x: shape_position.x,
    y: shape_position.y,
    width: shape_position.width,
    height: shape_position.height
  });

  var sens = true; // quel mot doit-on faire apparaitre

  function animation_tear(node1, node2){
    var tween1 = new Kinetic.Tween({
      node: node1,
      duration: 3,
      easing: Kinetic.Easings.StrongEaseInOut,
      offsetX: stage.getWidth() / 4,
      scaleX: 0
    })
    tween1.play();

    var tween2 = new Kinetic.Tween({
      node: node2,
      duration: 3,
      easing: Kinetic.Easings.StrongEaseInOut,
      offsetX: 0,
      scaleX: 1
    })
    setTimeout(function(){
      tween2.play();
    }, 400)

    setTimeout(function(){
      tween1.finish();
      tween2.finish(); 

      node1.setAttrs({
        offsetX: - stage.getWidth()/4
      });
    }, 2000);
  }

  this.start = function(lock){
    if(lock == true){
      dechirer.on(function(){
        if(sens == true){
          animation_tear(tear_word.center_a, tear_word.center_b);
          sens = false;
        } else {
          animation_tear(tear_word.center_b, tear_word.center_a);
          sens = true;
        }
      });
    }
  }
}