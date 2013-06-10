function getTutorielMenu(langage) {
  clearStage();
  setHomeBtn();

  var lang = ((langage == 'fr') ? 'fr' : 'en');
  
  var lines = stage.getHeight() / 6;
  var col = stage.getWidth() / 2;

  var size_font = 0.010*screenHeight;
  var demihaut_font = 16 * size_font;
  var demihaut_part_font = 5 * size_font;
  var centrale_font = 4.2 * size_font;
  var image_y = 1.25 * size_font;
  var image_dimension = 0.05 * size_font; 

  var word1_1;

  var img_a, img_b, img_x, img_y, img_width, img_height;
  var word3_fr = 'QUI GLISSE';
  var word2_en = 'which crept';
  var word3_1_en = 'in the ';
  var word3_2_en = ' of words';

  var word_tear_a, word_tear_b, word4_2;

  if(lang == 'fr'){
    word1_1 = 'CETTE ';

    img_a = 'imgs/stories/OMBRE.png';
    img_b = 'imgs/stories/CYGNE.png';
    img_x = col;
    img_y = 2*lines + image_y * 3.2;
    img_width = image_dimension * 891 * 0.8;
    img_height = image_dimension * 214 * 0.8;

    word_tear_a = 'SABRE';
    word_tear_b = 'SACRE';
    word4_2 = ' NOTRE UNION';
  } else {
    word1_1 = 'THIS ';

    img_a = 'imgs/stories/shading.png';
    img_b = 'imgs/stories/slicing.png';
    img_x = col;
    img_y = 3*lines + image_y;
    img_width = image_dimension * 921;
    img_height = image_dimension * 283;

    word_tear_a = 'SHREDS';
    word_tear_b = 'CHASES';
    word4_2 = ' ME';
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

  var cut_word = new word_demihaut({
    x: col,
    y: lines,
    mot1: 'S^PARATION',
    mot2: 'P^RC^PTION',
    fontSize: demihaut_part_font,
    fill: '#FFF',
    offsetMot2: - stage.getWidth()*2
  });

  var word_size_1 = (p1_1.getWidth() + cut_word.group.getWidth()) / 2;

  p1_1.setOffset({ x: word_size_1 });
  cut_word.group.setX(cut_word.group.getX() - word_size_1 + p1_1.getWidth());

  actionLayer.add(cut_word.group);

  /*
   * ligne 2 et 3
   */
  var rub_word = new word_ombre({
    img1: img_a,
    img2: img_b,
    x: img_x,
    y: img_y,
    width: img_width,
    height: img_height
  })

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

  var word_size_3_en = (p3_1_en.getWidth() + rub_word.group.getWidth() + p3_2_en.getWidth()) / 2;
  p3_1_en.setOffset({ x: word_size_3_en });
  p3_2_en.setOffset({ x: word_size_3_en - p3_1_en.getWidth() - rub_word.group.getWidth() });

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


  rub_x = ((lang == 'fr') ? rub_word.group.getWidth() / 2 : word_size_3_en - p3_1_en.getWidth());
  rub_word.group.setX(rub_word.group.getX() - rub_x);

  actionLayer.add(rub_word.group);

  /*
   * ligne 4
   */
  var p4_2 = new Kinetic.Text({
    x: col,
    y: 4*lines,
    text: word4_2,
    fontSize: demihaut_font,
    fontFamily: 'DemiHaut',
    fill: '#FFF' 
  });

  var tear_word = new word_centrale({
    x: col,
    y: 4*lines,
    mot1: word_tear_a,
    mot2: word_tear_b,
    fontSize: centrale_font,
    fill: '#FFF'
  });

  var word_size_4 = (tear_word.group.getWidth() + p4_2.getWidth()) / 2;

  tear_word.group.setX(tear_word.group.getX() - word_size_4);
  p4_2.setOffset({ x: word_size_4 - tear_word.group.getWidth() });

  actionLayer.add(tear_word.group);

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
   * Animation functions
   */
  var lock = 0; // permet de ne pas pouvoir jouer plusieurs animations en même temps


  // cut
  if(lock == 0 || lock == 1){
    var anim;

    var cut_activation = function(){
      node_dark(normal_words);
      zooming_center(cut_word.group, 2);
      node_set_opacity(rub_word.group, 0.25 * rub_word.group.getOpacity());
      node_dark(tear_word.group); 

      setTimeout(function(){ // attente pour récupérer les bons zooms
        anim = new Separation.cut_animation(cut_word);
        anim.start(); 
		play_sound('centraleSound');
      }, 2000);
    }

    var cut_desactivation = function(){
      node_light(normal_words);
      node_unzoom(cut_word.group, col - word_size_1 + p1_1.getWidth(), lines);
      node_set_opacity(rub_word.group, 4 * rub_word.group.getOpacity());
      node_light(tear_word.group);      
      anim.stop();
    }

    cut_word.group.on('tap', function(){
      if(lock == 0){
        lock = 1;
        cut_activation();
        setTimeout(function(){ // attente pour récupérer les bons zooms
          anim.play();          

          var cut_unZoom = new Separation.onCorner();
          cut_unZoom.on(function(){
            cut_desactivation();
            lock = 0;
          });
        }, 2000);
      }
    });
  }

  // rub
  if(lock == 0 || lock == 2){
    var anim;

    var rub_activation = function(){
      node_dark(normal_words);
      node_dark(cut_word.group);
      zooming_center(rub_word.group, 2);
      node_dark(tear_word.group);

      setTimeout(function(){ // attente pour récupérer les bons zooms
        anim = new Separation.rub_animation(rub_word);
        anim.start();          
		play_sound('coupableSound');
      }, 2000);
    }

    var rub_desactivation = function(){
      node_light(normal_words);
      node_light(cut_word.group);
      node_unzoom(rub_word.group, img_x - rub_x, img_y);
      node_light(tear_word.group);
      anim.stop();
    }

    rub_word.group.on('tap', function(){
      if(lock == 0){
        lock = 2;
        rub_activation();
        setTimeout(function(){
          anim.play();

          var rub_unZoom = new Separation.onCorner();
          rub_unZoom.on(function(){
            rub_desactivation();
            lock = 0;
          });
        }, 2000); 
      }
    });
  }

  // tear
  if(lock == 0 || lock == 3){
    var anim;
    
    var tear_activation = function(){
      node_dark(normal_words);
      node_dark(cut_word.group);
      node_set_opacity(rub_word.group, 0.25 * rub_word.group.getOpacity());
      zooming_center(tear_word.group, 2);

      setTimeout(function(){
        anim = new Separation.tear_animation(tear_word);
        anim.start();
		play_sound('ombreSound');
      }, 2000)
    }

    var tear_desactivation = function(){
      node_light(normal_words);
      node_light(cut_word.group);
      node_set_opacity(rub_word.group, 4 * rub_word.group.getOpacity());
      node_unzoom(tear_word.group, col - word_size_4, 4*lines);
    }

    tear_word.group.on('tap', function(){
      if(lock == 0){
        lock = 3;
        tear_activation();

        setTimeout(function(){ // attente pour récupérer les bons zooms
          anim.play();       

          var tear_unZoom = new Separation.onCorner();
          tear_unZoom.on(function(){
            tear_desactivation();
            lock = 0;
          });
        }, 2000);
      }
    });
  }
  
  stage.add(actionLayer);

}