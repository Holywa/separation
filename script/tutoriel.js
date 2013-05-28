function getTutorielMenu(langage) {
  clearStage();
  setHomeBtn();

  var lang = ((langage == 'fr') ? 'fr' : 'en');
  
  var lines = stage.getHeight() / 6;
  var col = stage.getWidth() / 2;

  var size_font = 5;
  var demihaut_font = 16 * size_font;
  var demihaut_part_font = 5 * size_font;
  var centrale_font = 4.2 * size_font;
  var decal_h = 1.5 * size_font;
  var decal_b = 2 * size_font;
  var image_y = 1.25 * size_font;
  var image_dimension = 0.05 * size_font; 
  var decal_c_h = 0.4 * size_font;
  var decal_c_c = 2.25 * size_font;
  var decal_c_b = 4.75 * size_font;

  var word1_1;

  var img_a, img_b, img_x, img_y, img_width, img_height, rub_zoom_x, rub_zoom_y;
  var word3_fr = 'QUI GLISSE';
  var word2_en = 'which crept';
  var word3_1_en = 'in the ';
  var word3_2_en = ' of words';

  var word_tear_a, word_tear_b, word4_2, tear_zoom_x;

  if(lang == 'fr'){
    word1_1 = 'CETTE ';

    img_a = 'imgs/stories/OMBRE.png';
    img_b = 'imgs/stories/CYGNE.png';
    img_x = col;
    img_y = 2*lines + image_y * 3.2;
    img_width = image_dimension * 891 * 0.8;
    img_height = image_dimension * 214 * 0.8;
    rub_zoom_x = - stage.getWidth() / 2;
    rub_zoom_y = - stage.getHeight() / 3;

    word_tear_a = 'SABRE';
    word_tear_b = 'SACRE';
    word4_2 = ' NOTRE UNION';
    tear_zoom_x = - stage.getWidth() / 4.8;
  } else {
    word1_1 = 'THIS ';

    img_a = 'imgs/stories/shading.png';
    img_b = 'imgs/stories/slicing.png';
    img_x = col;
    img_y = 3*lines + image_y;
    img_width = image_dimension * 921;
    img_height = image_dimension * 283;
    rub_zoom_x = - stage.getWidth() / 2.40;
    rub_zoom_y = - stage.getHeight() / 1.5;

    word_tear_a = 'SHREDS';
    word_tear_b = 'CHASES';
    word4_2 = ' ME';
    tear_zoom_x = - stage.getWidth() / 2.45;
  }

  /* 
   * ligne 1
   */
  var p1_1 = new Kinetic.Text({
    x: col,
    y: lines,
    text: word1_1,
    fontSize: demihaut_font,
    fontFamily: 'DemiHaut',
    fill: '#FFF'
  });

  var p_cut_a = new Kinetic.Text({
    x: col,
    y: lines,
    text: 'S^PARATION',
    fontSize: demihaut_part_font,
    fontFamily: 'DemiHautH',
    fill: '#FFF'
  });

  var p_cut_b = new Kinetic.Text({
    x: col,
    y: lines,
    text: 'S^PARATION',
    fontSize: demihaut_part_font,
    fontFamily: 'DemiHautB',
    fill: '#FFF'
  })

  var p_cut_c = new Kinetic.Text({
    x: col,
    y: lines,
    text: 'P^RC^PTION',
    fontSize: demihaut_part_font,
    fontFamily: 'DemiHautB',
    fill: '#FFF'
  })

  var word_size_1 = (p1_1.getWidth() + p_cut_a.getWidth()) / 2;

  p1_1.setOffset({ x: word_size_1 });
  p_cut_a.setOffset({ 
    x: word_size_1 - p1_1.getWidth(),
    y: - p_cut_a.getHeight() + decal_h
  });
  p_cut_b.setOffset({ 
    x: word_size_1 - p1_1.getWidth(),
    y: - p_cut_b.getHeight() * 2 + decal_b
  });
  p_cut_c.setOffset({ 
    x: - col - p_cut_c.getWidth() / 2, 
    y: - p_cut_c.getHeight() * 2 + decal_b
  });

  var cut_group = new Kinetic.Group();
  cut_group.add(p_cut_a);
  cut_group.add(p_cut_b);
  cut_group.add(p_cut_c);
  actionLayer.add(cut_group);

  /*
   * ligne 2 et 3
   */
  var imageObj1 = new Image();
  imageObj1.src = img_a;
  var p_rub_a = new Kinetic.Image({
    x: img_x,
    y: img_y,
    image: imageObj1,
    width: img_width,
    height: img_height
  });
  imageObj1.onload = function() { p_rub_a };

  var imageObj2 = new Image();
  imageObj2.src = img_b;
  var p_rub_b = new Kinetic.Image({
    x: img_x,
    y: img_y,
    image: imageObj2,
    width: img_width,
    height: img_height,
    opacity: 0
  });
  imageObj2.onload = function() { p_rub_b };

    ////////////////////////////
    // Anglais
    ////////////////////////////
  var p2_1_en = new Kinetic.Text({
    x: col,
    y: 2*lines,
    text: word2_en,
    fontSize: demihaut_font,
    fontFamily: 'DemiHaut',
    fill: '#FFF'
  });
  p2_1_en.setOffset({ x: p2_1_en.getWidth() / 2 });

  var p3_1_en = new Kinetic.Text({
    x: col,
    y: 3*lines,
    text: word3_1_en,
    fontSize: demihaut_font,
    fontFamily: 'DemiHaut',
    fill: '#FFF'
  });
  var p3_2_en = new Kinetic.Text({
    x: col,
    y: 3*lines,
    text: word3_2_en,
    fontSize: demihaut_font,
    fontFamily: 'DemiHaut',
    fill: '#FFF'
  });

  var word_size_3_en = (p3_1_en.getWidth() + p_rub_a.getWidth() + p3_2_en.getWidth()) / 2;
  p3_1_en.setOffset({ x: word_size_3_en });
  p3_2_en.setOffset({ x: word_size_3_en - p3_1_en.getWidth() - p_rub_a.getWidth() });

    ////////////////////////////
    // Français
    ////////////////////////////
  var p3_1_fr = new Kinetic.Text({
    x: col,
    y: 3*lines,
    text: word3_fr,
    fontSize: demihaut_font,
    fontFamily: 'DemiHaut',
    fill: '#FFF'
  });
  p3_1_fr.setOffset({ x: p3_1_fr.getWidth() / 2 });


  if(lang == 'fr'){
    p_rub_a.setOffset({ x: p_rub_a.getWidth() / 2 });
    p_rub_b.setOffset({ x: p_rub_a.getWidth() / 2 });
  } else {
    p_rub_a.setOffset({ x: word_size_3_en - p3_1_en.getWidth() });
    p_rub_b.setOffset({ x: word_size_3_en - p3_1_en.getWidth() });
  }

  var rub_group = new Kinetic.Group();
  rub_group.add(p_rub_a);
  rub_group.add(p_rub_b);
  actionLayer.add(rub_group);

  /*
   * ligne 4
   */
  var p_tear_a = new Kinetic.Text({
    x: col,
    y: 4*lines,
    text: word_tear_a,
    fontSize: centrale_font,
    fontFamily: 'CentraleH',
    fill: '#FFF'
  });

  var p_tear_b = new Kinetic.Text({
    x: col,
    y: 4*lines,
    text: word_tear_a,
    fontSize: centrale_font,
    fontFamily: 'CentraleC',
    fill: '#FFF'
  });

  var p_tear_c = new Kinetic.Text({
    x: 1.5 * col,
    y: 4*lines,
    text: word_tear_b,
    fontSize: centrale_font,
    fontFamily: 'CentraleC',
    fill: '#FFF',
    scaleX: 0
  });

  var p_tear_d = new Kinetic.Text({
    x: col,
    y: 4*lines,
    text: word_tear_a,
    fontSize: centrale_font,
    fontFamily: 'CentraleB',
    fill: '#FFF'
  });

  var p4_2 = new Kinetic.Text({
    x: col,
    y: 4*lines,
    text: word4_2,
    fontSize: demihaut_font,
    fontFamily: 'DemiHaut',
    fill: '#FFF' 
  });

  var word_size_4 = (p_tear_a.getWidth() + p4_2.getWidth()) / 2;

  p_tear_a.setOffset({ 
    x: word_size_4,
    y: - p_tear_a.getHeight() + decal_c_h
  });
  p_tear_b.setOffset({ 
    x: word_size_4,
    y: - 2 * p_tear_b.getHeight() + decal_c_c
  });
  p_tear_c.setOffset({ 
    x: word_size_4,
    y: - 2 * p_tear_c.getHeight() + decal_c_c
  });
  p_tear_d.setOffset({ 
    x: word_size_4,
    y: - 3 * p_tear_d.getHeight() + decal_c_b
  });
  p4_2.setOffset({ x: word_size_4 - p_tear_a.getWidth() });

  var tear_group = new Kinetic.Group();
  tear_group.add(p_tear_a);
  tear_group.add(p_tear_b);
  tear_group.add(p_tear_c);
  tear_group.add(p_tear_d);
  actionLayer.add(tear_group);

  normal_words = new Kinetic.Group();
  normal_words.add(p1_1);
  if(lang == 'fr'){ normal_words.add(p3_1_fr); } 
  else {
    normal_words.add(p2_1_en);
    normal_words.add(p3_1_en);
    normal_words.add(p3_2_en);
  }
  normal_words.add(p4_2);
  actionLayer.add(normal_words);

  /*
   * zooming functions
   */
  // put in grey all words
  function node_set_opacity(node, opacity){
    var tween = new Kinetic.Tween({
      node: node,
      duration: 1,
      opacity: opacity
    });
    tween.play();
  }

  function node_dark(node){ node_set_opacity(node, 0.25); }
  function node_light(node){ node_set_opacity(node, 1); }

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
  }

  function node_zoom(node, x, y){ node_set_zoom(node, x, y, 2); }

  function node_unzoom(node, x, y){ node_set_zoom(node, x, y, 1); }

  var lock = 0; // permet de ne pas pouvoir jouer plusieurs animations en même temps

  // cut
  if(lock == 0 || lock == 1){
    var cut_activation = function(){
      node_dark(normal_words);
      node_zoom(cut_group, - stage.getWidth() / 1.65, - stage.getHeight() / 100);
      node_set_opacity(rub_group, 0.25 * rub_group.getOpacity());
      node_dark(tear_group); 
    }

    var cut_desactivation = function(){
      node_light(normal_words);
      node_unzoom(cut_group, 0, 0);
      node_set_opacity(rub_group, 4 * rub_group.getOpacity());
      node_light(tear_group);      
    }

    cut_group.on('tap', function(){
      if(lock == 0){
        lock = 1;
        cut_activation();

        var couper = new Separation.cut({
          x: col - p_cut_b.getWidth(),
          y: 2*lines + p_cut_b.getHeight(),
          width: p_cut_a.getWidth() * 2,
          height: p_cut_a.getHeight() * 4
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
              y: lines,
              offsetX: - col - p_cut_c.getWidth() 
            });
          }, 2000);       
        }

        couper.on(function(){
          if(lock == 1){
            if(sens == true){
              animation_cut(p_cut_b, p_cut_c);
              sens = false;
            } else {
              animation_cut(p_cut_c, p_cut_b);
              sens = true;
            }
          }
        });
      }
    });

    var cut_unZoom = new Separation.onZone({
      x: col - p_cut_b.getWidth(),
      y: 2*lines + p_cut_b.getHeight(),
      width: p_cut_a.getWidth() * 2,
      height: p_cut_a.getHeight() * 4
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
      node_dark(normal_words);
      node_dark(cut_group);
      node_zoom(rub_group, rub_zoom_x, rub_zoom_y);
      node_dark(tear_group);
    }

    var rub_desactivation = function(){
      node_light(normal_words);
      node_light(cut_group);
      node_unzoom(rub_group, 0, 0);
      node_light(tear_group);
    }

    rub_group.on('tap', function(){
      if(lock == 0){
        lock = 2;
        rub_activation();

        var frotter = new Separation.rub({
          x: col - p_rub_b.getWidth(),
          y: 2*lines,
          width: p_rub_a.getWidth() * 2,
          height: p_rub_a.getHeight() * 2
        });

        var sens = true; // pour pouvoir inverser l'effet
        var velocity = 0.2; // vitesse d'effacement
        var tempo = 0; // pour ne pas réinverser l'effet tout de suite

        var new_opacity = function(){
          var op = p_rub_a.getOpacity()

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
              node: p_rub_a,
              duration: 0,
              opacity: new_op
            });
            tween_a.play();

            var tween_b = new Kinetic.Tween({
              node: p_rub_b,
              duration: 0,
              opacity: 1 - new_op
            });
            tween_b.play();
          }
        });  
      } 
    });

    var rub_unZoom = new Separation.onZone({
      x: col - p_rub_b.getWidth(),
      y: 2*lines,
      width: p_rub_a.getWidth() * 2,
      height: p_rub_a.getHeight() * 2
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
      node_dark(normal_words);
      node_dark(cut_group);
      node_set_opacity(rub_group, 0.25 * rub_group.getOpacity());
      node_zoom(tear_group, tear_zoom_x, - stage.getHeight());
    }

    var tear_desactivation = function(){
      node_light(normal_words);
      node_light(cut_group);
      node_set_opacity(rub_group, 4 * rub_group.getOpacity());
      node_unzoom(tear_group, 0, 0);
    }

    tear_group.on('tap', function(){
      if(lock == 0){
        lock = 3;
        tear_activation();

        var dechirer = new Separation.tear({
          x: col - p_tear_a.getWidth(),
          y: 2*lines - p_tear_a.getHeight() * 1.25,
          width: p_tear_a.getWidth() * 2,
          height: p_tear_a.getHeight() * 6 *1.5
        });

        var sens  = true;

        function animation_tear(node1, node2){
          var tween1 = new Kinetic.Tween({
            node: node1,
            duration: 3,
            easing: Kinetic.Easings.StrongEaseInOut,
            x: col / 2,
            scaleX: 0
          })
          tween1.play();

          var tween2 = new Kinetic.Tween({
            node: node2,
            duration: 3,
            easing: Kinetic.Easings.StrongEaseInOut,
            x: col,
            scaleX: 1
          })
          setTimeout(function(){
            tween2.play();
          }, 400)

          setTimeout(function(){
            tween1.finish();
            tween2.finish(); 

            node1.setAttrs({
              x: 1.5 * col
            });
          }, 2000);
        }

        dechirer.on(function(){
          if(lock == 3){
            if(sens == true){
              animation_tear(p_tear_b, p_tear_c);
              sens = false;
            } else {
              animation_tear(p_tear_c, p_tear_b);
              sens = true;
            }
          }
        });
      }
    });

    var tear_unZoom = new Separation.onZone({
      x: col - p_tear_a.getWidth(),
      y: 2*lines + p_tear_a.getHeight(),
      width: p_tear_a.getWidth() * 2,
      height: p_tear_a.getHeight() * 6
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