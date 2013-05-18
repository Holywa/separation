function getTutorielMenu() {
	clearStage();
	setHomeBtn();
	
	var lines = stage.getHeight() / 5;
  var col = stage.getWidth() / 2;

  var size_font = 20;

  // phrase 1
  function Phrase1(){
    var p1_1 = new Kinetic.Text({
      x: col,
      y: lines,
      text: 'THIS ',
      fontSize: 3 * size_font,
      fontFamily: 'DemiHaut',
      fill: 'white'
    });

    var p1_2 = new Kinetic.Text({
      x: col,
      y: lines,
      text: 'S^PARATION',
      fontSize: size_font,
      fontFamily: 'DemiHautH',
      fill: 'white'
    });

    var p1_3 = new Kinetic.Text({
      x: col,
      y: lines,
      text: 'S^PARATION',
      fontSize: size_font,
      fontFamily: 'DemiHautB',
      fill: 'white'
    });

    var p1_4 = new Kinetic.Text({
      x: stage.getWidth(),
      y: lines,
      text: 'P^RC^PTION',
      fontSize: size_font,
      fontFamily: 'DemiHautB',
      fill: 'white'
    });

    var word_size = (p1_1.getWidth() + p1_2.getWidth())/2;

    p1_1.setOffset({ x: word_size });

    p1_2.setOffset({ 
      x: word_size - p1_1.getWidth(),
      y: - p1_2.getHeight() + (size_font / 10)
    });

    p1_3.setOffset({
      x: word_size - p1_1.getWidth(),
      y: - p1_3.getHeight() * 2 + 6
    });

    p1_4.setOffset({
      x: - p1_4.getWidth() / 2,
      y: - p1_4.getHeight() * 2 + 6
    });

    function cut_word(x){
      switch(x){
        case 0:
        p1_4.setX(stage.getWidth() + p1_4.getWidth() / 2);

        var tween1 = new Kinetic.Tween({
          node: p1_3,
          duration: 2,
          x: - p1_3.getWidth()
        });

        var tween2 = new Kinetic.Tween({
          node: p1_4,
          duration: 2,
          x : stage.getWidth()/2 - word_size + p1_1.getWidth() - p1_4.getWidth()/2
        });

        tween1.play();

        setTimeout(function(){
          tween2.play();
        }, 400)   
        break;

        default: 
        p1_3.setX(stage.getWidth() + p1_3.getWidth() / 2 + word_size - p1_1.getWidth());

        var tween3 = new Kinetic.Tween({
          node: p1_4,
          duration: 2,
          x: - p1_4.getWidth() * 2
        });

        var tween4 = new Kinetic.Tween({
          node: p1_3,
          duration: 2,
          x : stage.getWidth()/2
        });

        tween3.play();

        setTimeout(function(){ 
          tween4.play();
        }, 400)
        break;
      }
      
    }

    this.start = function(){
      actionLayer.add(p1_1);
      actionLayer.add(p1_2);
      actionLayer.add(p1_3);
      actionLayer.add(p1_4);

      var couper = new Separation.cut({
          x: col - word_size + p1_1.getTextWidth(), 
          y: lines + 20, 
          width: p1_2.getTextWidth(), 
          height: 25
        }, "", actionLayer, stage);
        
      var x = 0;

      couper.on(function(){
        cut_word(x)
        if(x == 0) {x++;}
        else {x = 0;}
      });


      stage.add(actionLayer);
    }
  }

    // phrase 2
    function Phrase2(){
      var p2_1 = new Kinetic.Text({
        x: col,
        y: 2*lines,
        text: 'WHICH CREPT IN THE ',
        fontSize: 60,
        fontFamily: 'Demihaut',
        fill: 'white'
      });

      var p2_2 = new Kinetic.Text({
        x: col,
        y: 2*lines,
        text: 'SHADING',
        fontSize: 60,
        fontFamily: 'Demihaut',
        fill: 'white'
      });

      var p2_3 = new Kinetic.Text({
        x: col,
        y: 2*lines,
        text: 'SLICING',
        fontSize: 60,
        fontFamily: 'Demihaut',
        fill: 'white',
        opacity: 0
      });

      var p2_4 = new Kinetic.Text({
        x: col,
        y: 2*lines,
        text: ' OF WORDS',
        fontSize: 60,
        fontFamily: 'Demihaut',
        fill: 'white'
      });

      var word_size = (p2_1.getWidth() + p2_2.getWidth() + p2_3.getWidth())/2;

      p2_1.setOffset({ x: word_size });

      p2_2.setOffset({ x: word_size - p2_1.getWidth() });

      p2_3.setOffset({ x: word_size - p2_1.getWidth() });

      p2_4.setOffset({ x: word_size - p2_1.getWidth() - p2_2.getWidth() });

      function rub_word(x){
        var tween1 = new Kinetic.Tween({
            node: p2_2,
            duration: 0,
            opacity: p2_2.getOpacity() - 0.5
          });
        
        tween1.play();
      }

      this.start = function(){  
        actionLayer.add(p2_1);
        actionLayer.add(p2_2);
        actionLayer.add(p2_3);
        actionLayer.add(p2_4);

        var frotter = new Separation.rub({
          x: col - word_size + p2_1.getTextWidth(), 
          y: 2* lines + 20, 
          width: p2_2.getTextWidth(), 
          height: 25
        }, actionLayer, stage);

        var x = 0;

        frotter.on(function(){
          rub_word(x)
          if(x == 0){x++;}
          else{x = 0;}
        });

        stage.add(actionLayer);
      }
    }

    // phrase 3
    function Phrase3(){
      var p3_1 = new Kinetic.Text({
        x: col,
        y: 3*lines,
        text: 'SHREDS ',
        fontSize: 60,
        fontFamily: 'Demihaut',
        fill: 'white'
      });

      var p3_2 = new Kinetic.Text({
        x: col,
        y: 3*lines,
        text: 'ME',
        fontSize: 60,
        fontFamily: 'Demihaut',
        fill: 'white'
      });

      var word_size = (p3_1.getWidth() + p3_2.getWidth())/2;

      p3_1.setOffset({ x: word_size });

      p3_2.setOffset({ x: word_size - p3_1.getWidth() });

      function activated(i){
        var rect = new Kinetic.Rect({
            x: 800,
            y: 3*lines + 21,
            width: 300,
            height: 20,
            fill: 'black'
          });

          actionLayer.add(rect);
          stage.add(actionLayer);

          setTimeout(function(){
            if(i==0){
              p3_1.setText('CHASES');
              i = 1;
            }
            else{
              p3_1.setText('SHREDS');
              i = 0;
            }
            stage.add(actionLayer);   
          }, 2000)

          var tween = new Kinetic.Tween({
            node: rect,
            duration: 2,
            x: -300
          })
          
          tween.play();       
      }

      this.start = function(){  
        i = 0; 
        actionLayer.add(p3_1);
        actionLayer.add(p3_2);

        var coup = new Separation.tear({
          x: col - word_size,
          y: 3 * lines - 75,
          width: p3_1.getTextWidth(),
          height: 200
        }, "", actionLayer, stage);

        coup.on(activated);

        stage.add(actionLayer);
      }
    }        

    // Animation
    var phrase1 = new Phrase1();
    var phrase2 = new Phrase2();
    var phrase3 = new Phrase3();

    phrase1.start();
    phrase2.start();
    phrase3.start();   

  }