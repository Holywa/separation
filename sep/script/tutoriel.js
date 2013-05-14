function getTutorielMenu() {
	clearStage();
	setHomeBtn();
	
	alert("tutoriel");
	
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
        fontFamily: 'Demihaut',
        fill: 'white'
      });

      var p1_2 = new Kinetic.Text({
        x: col,
        y: lines,
        text: 'S^PARATION',
        fontSize: size_font,
        fontFamily: 'Demihaut_haut',
        fill: 'white'
      });

      var p1_3 = new Gestures.Word({
        x: col,
        y: lines,
        text: 'S^PARATION',
        fontSize: size_font,
        fontFamily: 'Demihaut_bas',
        fill: 'white'
      });

      var p1_4 = new Kinetic.Text({
        x: stage.getWidth(),
        y: lines,
        text: 'P^RC^PTION',
        fontSize: size_font,
        fontFamily: 'Demihaut_bas',
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

      this.start = function(){
        p1_3.on('click', function(){
          p1_4.setX(stage.getWidth() + p1_4.getWidth() / 2);

          p1_3.transitionTo({
            x : - p1_3.getWidth(),
            duration : 2
          });

          setTimeout(function(){ 
            p1_4.transitionTo({
              x : stage.getWidth()/2 - word_size + p1_1.getWidth() - p1_4.getWidth()/2,
              duration : 2
            })
          }, 400)
        })    

        p1_4.on('click', function(){
          p1_3.setX(stage.getWidth() + p1_3.getWidth() / 2 + word_size - p1_1.getWidth());

          p1_4.transitionTo({
            x : - p1_4.getWidth() * 2,
            duration : 2
          });

          setTimeout(function(){ 
            p1_3.transitionTo({
              x : stage.getWidth()/2,
              duration : 2
            })
          }, 400)
        })     

        layer.add(p1_1);
        layer.add(p1_2);
        layer.add(p1_3);
        layer.add(p1_4);
        stage.add(layer);
      }

      this.stop = function(){
        old_gone.stop();
        new_back.stop();
        p1_1.destroy();
        p1_2.destroy();
        p1_3.destroy();
        p1_4.destroy();
        stage.add(layer);
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

      this.start = function(){  
        p2_2.on('click', function(){
          p2_3.transitionTo({
            opacity: 0,
            duration: 2
          }) 

          p2_2.transitionTo({
            opacity: 1,
            duration: 2
          }) 

          p2_3.moveToTop();
        })

        p2_3.on('click', function(){
          p2_2.transitionTo({
            opacity: 0,
            duration: 2
          }) 

          p2_3.transitionTo({
            opacity: 1,
            duration: 2
          }) 

          p2_2.moveToTop();
        })

        layer.add(p2_1);
        layer.add(p2_2);
        layer.add(p2_3);
        layer.add(p2_4);
        stage.add(layer);
      }

      this.stop = function(){
        p2_1.destroy();
        p2_2.destroy();
        p2_3.destroy();
        p2_4.destroy();
        stage.add(layer);
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

      this.start = function(){  
        i = 0; 

        p3_1.on('click', function(){
          var rect = new Kinetic.Rect({
            x: 800,
            y: 3*lines + 21,
            width: 300,
            height: 15,
            fill: 'black'
          });

          layer.add(rect);
          stage.add(layer);

          setTimeout(function(){
            if(i==0){
              p3_1.setText('CHASES');
              i = 1;
            }
            else{
              p3_1.setText('SHREDS');
              i = 0;
            }
            stage.add(layer);   
          }, 2000)

          rect.transitionTo({
            x : -300,
            duration: 4
          })           
        })

        layer.add(p3_1);
        layer.add(p3_2);
        stage.add(layer);
      }

      this.stop = function(){
        p3_1.destroy();
        p3_2.destroy();
        stage.add(layer);
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