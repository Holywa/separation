function getTutorielMenu() {
  clearStage();
  setHomeBtn();
  
  var lines = stage.getHeight() / 6;
  var col = stage.getWidth() / 2;

  var size_font = 5;
  var demihaut_font = 16 * size_font;
  var demihaut_part_font = 5 * size_font;
  var centrale_font = 4.2 * size_font;
  var decal_h = 1.2 * size_font;
  var decal_b = 2 * size_font;
  var image_y = 1.25 * size_font;
  var image_dimension = 0.05 * size_font; 
  var decal_c_h = 0.4 * size_font;
  var decal_c_c = 2.25 * size_font;
  var decal_c_b = 4.75 * size_font;

  /* 
   * ligne 1
   */
  var p1_1 = new Kinetic.Text({
    x: col,
    y: lines,
    text: 'THIS ',
    fontSize: demihaut_font,
    fontFamily: 'DemiHaut',
    fill: '#FFF'
  });

  var p1_2_a = new Kinetic.Text({
    x: col,
    y: lines,
    text: 'S^PARATION',
    fontSize: demihaut_part_font,
    fontFamily: 'DemiHautH',
    fill: '#FFF'
  });

  var p1_2_b = new Kinetic.Text({
    x: col,
    y: lines,
    text: 'S^PARATION',
    fontSize: demihaut_part_font,
    fontFamily: 'DemiHautB',
    fill: '#FFF'
  })

  var p1_2_c = new Kinetic.Text({
    x: col,
    y: lines,
    text: 'P^RC^PTION',
    fontSize: demihaut_part_font,
    fontFamily: 'DemiHautB',
    fill: '#FFF'
  })

  var word_size_1 = (p1_1.getWidth() + p1_2_a.getWidth()) / 2;

  p1_1.setOffset({ x: word_size_1 });
  p1_2_a.setOffset({ 
    x: word_size_1 - p1_1.getWidth(),
    y: - p1_2_a.getHeight() + decal_h
  });
  p1_2_b.setOffset({ 
    x: word_size_1 - p1_1.getWidth(),
    y: - p1_2_b.getHeight() * 2 + decal_b
  });
  p1_2_c.setOffset({ 
    x: - col - p1_2_c.getWidth() / 2, 
    y: - p1_2_c.getHeight() * 2 + decal_b
  });

  var cut_group = new Kinetic.Group();
  cut_group.add(p1_2_a);
  cut_group.add(p1_2_b);
  cut_group.add(p1_2_c);

  actionLayer.add(cut_group);
  actionLayer.add(p1_1);

  /*
   * ligne 2
   */
  var p2_1 = new Kinetic.Text({
    x: col,
    y: 2*lines,
    text: 'which crept',
    fontSize: demihaut_font,
    fontFamily: 'DemiHaut',
    fill: '#FFF'
  });

  p2_1.setOffset({ x: p2_1.getWidth() / 2 });

  actionLayer.add(p2_1);

  /*
   * ligne 3
   */
  var p3_1 = new Kinetic.Text({
    x: col,
    y: 3*lines,
    text: 'in the ',
    fontSize: demihaut_font,
    fontFamily: 'DemiHaut',
    fill: '#FFF'
  });

  var imageObj1 = new Image();
  imageObj1.src = 'imgs/shading.png';
  var p3_2_a = new Kinetic.Image({
    x: col,
    y: 3*lines + image_y,
    image: imageObj1,
    width: image_dimension * 921,
    height: image_dimension * 283
  });
  imageObj1.onload = function() { p3_2_a };

  var imageObj2 = new Image();
  imageObj2.src = 'imgs/slicing.png';
  var p3_2_b = new Kinetic.Image({
    x: col,
    y: 3*lines + image_y,
    image: imageObj2,
    width: image_dimension * 921,
    height: image_dimension * 283,
    opacity: 0
  });
  imageObj2.onload = function() { p3_2_b };

  var p3_3 = new Kinetic.Text({
    x: col,
    y: 3*lines,
    text: ' of words',
    fontSize: demihaut_font,
    fontFamily: 'DemiHaut',
    fill: '#FFF'
  });

  var word_size_3 = (p3_1.getWidth() + p3_2_a.getWidth() + p3_3.getWidth()) / 2;

  p3_1.setOffset({ x: word_size_3 });
  p3_2_a.setOffset({ x: word_size_3 - p3_1.getWidth() });
  p3_2_b.setOffset({ x: word_size_3 - p3_1.getWidth() });
  p3_3.setOffset({ x: word_size_3 - p3_1.getWidth() - p3_2_a.getWidth() });

  var rub_group = new Kinetic.Group();
  rub_group.add(p3_2_a);
  rub_group.add(p3_2_b);

  actionLayer.add(rub_group);
  actionLayer.add(p3_1);
  actionLayer.add(p3_3);

  /*
   * ligne 4
   */
  var p4_1_a = new Kinetic.Text({
    x: col,
    y: 4*lines,
    text: 'SHREDS',
    fontSize: centrale_font,
    fontFamily: 'CentraleH',
    fill: '#FFF'
  });

  var p4_1_b = new Kinetic.Text({
    x: col,
    y: 4*lines,
    text: 'SHREDS',
    fontSize: centrale_font,
    fontFamily: 'CentraleC',
    fill: '#FFF'
  });

  var p4_1_c = new Kinetic.Text({
    x: col,
    y: 4*lines,
    text: 'SHREDS',
    fontSize: centrale_font,
    fontFamily: 'CentraleC',
    fill: '#FFF',
    opacity: 0
  });

  var p4_1_d = new Kinetic.Text({
    x: col,
    y: 4*lines,
    text: 'SHREDS',
    fontSize: centrale_font,
    fontFamily: 'CentraleB',
    fill: '#FFF'
  });

  var p4_2 = new Kinetic.Text({
    x: col,
    y: 4*lines,
    text: ' ME',
    fontSize: demihaut_font,
    fontFamily: 'DemiHaut',
    fill: '#FFF' 
  });

  var word_size_4 = (p4_1_a.getWidth() + p4_2.getWidth()) / 2;

  p4_1_a.setOffset({ 
    x: word_size_4,
    y: - p4_1_a.getHeight() + decal_c_h
  });
  p4_1_b.setOffset({ 
    x: word_size_4,
    y: - 2 * p4_1_b.getHeight() + decal_c_c
  });
  p4_1_c.setOffset({ 
    x: word_size_4,
    y: - 2 * p4_1_c.getHeight() + decal_c_c
  });
  p4_1_d.setOffset({ 
    x: word_size_4,
    y: - 3 * p4_1_d.getHeight() + decal_c_b
  });
  p4_2.setOffset({ x: word_size_4 - p4_1_a.getWidth() });

  var tear_group = new Kinetic.Group();
  tear_group.add(p4_1_a);
  tear_group.add(p4_1_b);
  tear_group.add(p4_1_c);
  tear_group.add(p4_1_d);

  actionLayer.add(tear_group);
  actionLayer.add(p4_2);

  /*
   * zooming functions
   */
  // put in grey all words
  function node_dark(node){
    var tween = new Kinetic.Tween({
      node: node,
      duration: 1,
      opacity: node.getOpacity() / 4
    });
    tween.play();
  }

  function node_light(node){
    var tween = new Kinetic.Tween({
      node: node,
      duration: 1,
      opacity: node.getOpacity() * 4
    });
    tween.play();
  }

  function node_zoom(node, x, y){
    var tween = new Kinetic.Tween({
      node: node,
      duration: 1,
      scaleX: 2,
      scaleY: 2,
      x: x,
      y: y
    });
    tween.play();
  }

  function node_unzoom(node, x, y){
    var tween = new Kinetic.Tween({
      node: node,
      duration: 1,
      scaleX: 1,
      scaleY: 1,
      x: x,
      y: y
    });
    tween.play();
  }

  var darkenize = function(){
    node_dark(p1_1);
    node_dark(p2_1);
    node_dark(p3_1);
    node_dark(p3_3);
    node_dark(p4_2);
  }

  var illuminate = function(){
    node_light(p1_1);
    node_light(p2_1);
    node_light(p3_1);
    node_light(p3_3);
    node_light(p4_2);
  }

  var lock = 0; // permet de ne pas pouvoir jouer plusieurs animations en même temps

  // cut
  if(lock == 0 || lock == 1){
    var cut_activation = function(){
      darkenize();
      node_zoom(cut_group, - stage.getWidth() / 1.65, - stage.getHeight() / 100);
      node_dark(rub_group);
      node_dark(tear_group); 
    }

    var cut_desactivation = function(){
      illuminate();
      node_unzoom(cut_group, 0, 0);
      node_light(rub_group);
      node_light(tear_group);      
    }

    function cutting(){
      if(lock == 0){
        lock = 1;
        cut_activation();

        var couper = new Separation.cut({
          x: col - p1_2_b.getWidth(),
          y: 2*lines + p1_2_b.getHeight(),
          width: p1_2_a.getWidth() * 2,
          height: p1_2_a.getHeight() * 4
        });

        var sens = true; // quel mot doit-on faire apparaitre

        function animation_cut(node1, node2){
          var tween1 = new Kinetic.Tween({
            node: node1,
            duration: 2,
            easing: Kinetic.Easings.StrongEaseInOut,
            y: 7 * col
          })
          tween1.play();     

          var tween2 = new Kinetic.Tween({
            node: node2,
            duration: 2,
            easing: Kinetic.Easings.StrongEaseInOut,
            offsetX: word_size_1 - p1_1.getWidth()
          })
          setTimeout(function(){
            tween2.play();
          }, 400)  

          setTimeout(function(){
            tween1.finish();
            tween2.finish(); 

            node1.setAttrs({
              x: col - p1_2_a.getWidth() / 2,
              y: 2 * lines,
              offsetX: - col - p1_2_c.getWidth() / 2
            });
          }, 2000);       
        }

        couper.on(function(){
          if(lock == 1){
            if(sens == true){
              animation_cut(p1_2_b, p1_2_c);
              sens = false;
            } else {
              animation_cut(p1_2_c, p1_2_b);
              sens = true;
            }
          }
        });
      }
    }

    cut_group.on('tap click', function(){
      var test = new Date();
      cutting();
    });

    var cut_unZoom = new Separation.onZone({
      x: col - p1_2_b.getWidth(),
      y: 2*lines + p1_2_b.getHeight(),
      width: p1_2_a.getWidth() * 2,
      height: p1_2_a.getHeight() * 4
    });

    cut_unZoom.on(function(){
      if(lock == 1){
        cut_desactivation();
        lock = 0;
      }
    });
  }

  // rub
  if(lock == 0 || lock == 2){
    var rub_activation = function(){
      darkenize();
      node_dark(cut_group);
      node_zoom(rub_group, - stage.getWidth() / 2.40, - stage.getHeight() / 1.5);
      node_dark(tear_group);
    }

    var rub_desactivation = function(){
      illuminate();
      node_light(cut_group);
      node_unzoom(rub_group, 0, 0);
      node_light(tear_group);
    }

    rub_group.on('tap click', function(){
      if(lock == 0){
        lock = 2;
        rub_activation();

        var frotter = new Separation.rub({
          x: col - p3_2_b.getWidth(),
          y: 2*lines,
          width: p3_2_a.getWidth() * 2,
          height: p3_2_a.getHeight() * 2
        });

        var sens = true; // pour pouvoir inverser l'effet
        var velocity = 0.2; // vitesse d'effacement
        var tempo = 0; // pour ne pas réinverser l'effet tout de suite

        var new_opacity = function(){
          var op = p3_2_a.getOpacity()

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

        frotter.on(function(){
          if(lock == 2){
            var new_op = new_opacity();

            var tween_a = new Kinetic.Tween({
              node: p3_2_a,
              duration: 0,
              opacity: new_op
            });
            tween_a.play();

            var tween_b = new Kinetic.Tween({
              node: p3_2_b,
              duration: 0,
              opacity: 1 - new_op
            });
            tween_b.play();
          }
        });  
      } 
    });

    var rub_unZoom = new Separation.onZone({
      x: col - p3_2_b.getWidth(),
      y: 2*lines,
      width: p3_2_a.getWidth() * 2,
      height: p3_2_a.getHeight() * 2
    });

    rub_unZoom.on(function(){
      if(lock == 2){
        rub_desactivation();
        lock = 0;
      }
    });
  }

  // tear
  if(lock == 0 || lock == 3){
    var tear_activation = function(){
      darkenize();
      node_dark(cut_group);
      node_dark(rub_group);
      node_zoom(tear_group, - stage.getWidth() / 2.45, - stage.getHeight());
    }

    var tear_desactivation = function(){
      illuminate();
      node_light(cut_group);
      node_light(rub_group);
      node_unzoom(tear_group, 0, 0);
    }

    function tearing(){
      if(lock == 0){
        lock = 3;
        tear_activation();

        var dechirer = new Separation.tear({
          x: col - p4_1_a.getWidth(),
          y: 2*lines + p4_1_a.getHeight(),
          width: p4_1_a.getWidth() * 2,
          height: p4_1_a.getHeight() * 6
        });

        var sens  = true;

        function animation_tear(node1, node2){
          var tween1 = new Kinetic.Tween({
            node: node1,
            duration: 2,
            easing: Kinetic.Easings.StrongEaseInOut,
            x: 0
          })
          tween1.play();

          var tween2 = new Kinetic.Tween({
            node: node2,
            duration: 2,
            easing: Kinetic.Easings.StrongEaseInOut,
            x: 2
          })
          setTimeout(function(){
            tween2.play();
          }, 400)

          setTimeout(function(){
            tween1.finish();
            tween2.finish(); 

            node1.setAttrs({
              x: col - p1_2_a.getWidth() / 2,
              y: 2 * lines,
              offsetX: - col - p1_2_c.getWidth() / 2
            });
          }, 2000);
        }

        dechirer.on(function(){
          if(lock == 3){
            if(sens == true){
              animation_tear(p4_1_b, p4_1_c);
              sens = false;
            } else {
              animation_tear(p4_1_c, p4_1_b);
              sens = true;
            }
          }
        });
      }
    }

    tear_group.on('tap click', function(){
      tearing();
    });

    var tear_unZoom = new Separation.onZone({
      x: col - p4_1_a.getWidth(),
      y: 2*lines + p4_1_a.getHeight(),
      width: p4_1_a.getWidth() * 2,
      height: p4_1_a.getHeight() * 6
    });

    tear_unZoom.on(function(){
      if(lock == 3){
        tear_desactivation();
        lock = 0;
      }
    });
  }
  
  stage.add(actionLayer);

}