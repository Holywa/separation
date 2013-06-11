/*
var mainLayer;
var actionLayer;
var titleSize;
var textSize;
var wordSize;
var userWord;
var wordsArray;
var displayedWord;
var p1_2_a;
var p1_2_b;
var wordsKineticGroup;
var wordsRectKineticGroup;
var xmlWordsFile;
*/

//function ActiveWord(value, next, type);


function play_sound(elemId) {
	document.getElementById(elemId).play();
}

function getLaboratoryMenu() {

	// integrer video
	

	var screenWidth = window.innerWidth;
	var screenHeight = window.innerHeight;
	
	var titleSize = 0.1*screenHeight;
	var textSize = 0.05*screenHeight;
	var wordSize = 0.075*screenHeight;

	var downImg, upImg, downBtn, upBtn;
	var wordsKineticGroup, wordsRectKineticGroup;
	var xmlWordsFile;
	var wordsArray;
	var wordToChoose;
	var wordToChooseRect;
	var actualArrayNumber=0; 

	
	var p1_2_a, p1_2_b, p4_1_d, p4_1_c, p4_1_b, p4_1_a;
	var userWord;
	var displayedWord;	
	
	load_arrows(); //fleches haut et bas
	window.location='./video.html';
	
	
	displayedWord="betise";
	//displayedWord = prompt("Give me a word");
	
	var mainWord;
	var next="coucou";
	var type=0;
	mainWord = new ActiveWord( displayedWord, next, type );	//"up" : 0, "down" : 1, "central" : 2, "shadow" : 3, "err" : -1
	mainWord.value.group.setX(stage.getWidth()/2);
	mainWord.value.group.setY(stage.getHeight()/2);	
	mainLayer.add(mainWord.value.group);
	
	var xhr=getXMLHttpRequest();
	
	//xmlWordsFile=getXMLresult("0", displayedWord, "min_haut;min_bas"); //requete de la PR
	xmlWordsFile=loadXMLDoc("XML/words_requestResult.xml");
	
	
	
	clearStage(); 
	initLaboMenu();
	setHomeBtn();
	
	displayWordArray();
	
	stage.add(mainLayer);
	stage.add(actionLayer);
	mainLayer.draw();



	//Creating the main menu
	function initLaboMenu() {
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

		mainLayer.removeChildren();
		actionLayer.removeChildren();
		
		title = new Kinetic.Text( {
			text : "Le laboratoire des mots",
			fontFamily : "DemiHaut",
			fontSize : titleSize,
			fill : "#FFF",
			align : "top",
			x : stage.getWidth()/2,
			y : stage.getHeight()*0.05
		} );
		title.setOffset( title.getWidth()/2, 0 );
		
		
		p1_2_a = new Kinetic.Text( {
			text : displayedWord,
			x: col,
			y: 2*lines,
			fontSize: demihaut_part_font,
			fontFamily: 'DemiHautH',
			fill: '#FFF'
		} );
		
		p1_2_b = new Kinetic.Text( {
			text : displayedWord,
			x: col,
			y: 2*lines,
			fontSize: demihaut_part_font,
			fontFamily: 'DemiHautB',
			fill: '#FFF'
		} );
		
		
		var p1_2_c = new Kinetic.Text({
			x: col,
			y: lines,
			text: 'P^RC^PTION',
			fontSize: demihaut_part_font,
			fontFamily: 'DemiHautB',
			fill: '#FFF'
		})
		
		 var word_size_1 = (p1_2_a.getWidth()) / 2;

		  p1_2_a.setOffset({ 
			x: word_size_1,
			y: - p1_2_a.getHeight() + decal_h
		  });
		  p1_2_b.setOffset({ 
			x: word_size_1,
			y: - p1_2_b.getHeight() * 2 + decal_b
		  });
		  p1_2_c.setOffset({ 
			x: - col - p1_2_c.getWidth() / 2, 
			y: - p1_2_c.getHeight() * 2 + decal_b
		  });
		
		wordChoosen = new Kinetic.Rect( {
			listening : true,
			width : p1_2_a.getWidth()*1.5,
			height : p1_2_a.getHeight() + p1_2_b.getHeight(),
			offset : p1_2_a.getOffset(),
			opacity : 0.5,
		} );

		
		
	/*	
		  var cut_group = new Kinetic.Group();
		  cut_group.add(p1_2_a);
		  cut_group.add(p1_2_b);
		  cut_group.add(p1_2_c);

		  actionLayer.add(cut_group);

		//																															gnagnagna DEBUT
		
	  var p4_1_a = new Kinetic.Text({
		x: col,
		y: 4*lines,
		text: displayedWord,
		fontSize: centrale_font,
		fontFamily: 'CentraleH',
		fill: '#FFF'
	  });

	  var p4_1_b = new Kinetic.Text({
		x: col,
		y: 4*lines,
		text: displayedWord,
		fontSize: centrale_font,
		fontFamily: 'CentraleC',
		fill: '#FFF'
	  });

	  var p4_1_c = new Kinetic.Text({
		x: 1.5 * col,
		y: 4*lines,
		text: 'CHASES',
		fontSize: centrale_font,
		fontFamily: 'CentraleC',
		fill: '#FFF',
		scaleX: 0
	  });

	  var p4_1_d = new Kinetic.Text({
		x: col,
		y: 4*lines,
		text: displayedWord,
		fontSize: centrale_font,
		fontFamily: 'CentraleB',
		fill: 'red'
	  });


	  var word_size_4 = (p4_1_a.getWidth()) ;

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

	  var tear_group = new Kinetic.Group();
	  tear_group.add(p4_1_a);
	  tear_group.add(p4_1_b);
	  tear_group.add(p4_1_c);
	  tear_group.add(p4_1_d);

	  actionLayer.add(tear_group);

	  
	  
	  
	  
	  
	  
	  

	  
	  //////////////////////////////////////////////////////////////////////////////////////////////end tear
	 

	 
//	   * zooming functions
	   
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




	  var lock = 0; // permet de ne pas pouvoir jouer plusieurs animations en même temps

	  // cut
	  if(lock == 0 || lock == 1){
		var cut_activation = function(){
		  node_zoom(cut_group, - stage.getWidth() / 1.65, - stage.getHeight() / 100);
		  node_dark(tear_group); 
		}

		var cut_desactivation = function(){
		  node_unzoom(cut_group, 0, 0);
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
				offsetX: word_size_1
			  })
			  setTimeout(function(){
				tween2.play();
			  }, 400);

			  setTimeout(function(){
				tween1.finish();
				tween2.finish(); 

				node1.setAttrs({
				  y: lines,
				  offsetX: - col - p1_2_c.getWidth() 
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


	  // tear
	  if(lock == 0 || lock == 3){
		var tear_activation = function(){
		  node_dark(cut_group);
		  node_zoom(tear_group, - stage.getWidth() / 2.45, - stage.getHeight());
		}

		var tear_desactivation = function(){
		  node_light(cut_group);
		  node_unzoom(tear_group, 0, 0);
		}

		function tearing(){
		  if(lock == 0){
			lock = 3;
			tear_activation();

			var dechirer = new Separation.tear({
			  x: col - p4_1_a.getWidth(),
			  y: 2*lines - p4_1_a.getHeight() * 1.25,
			  width: p4_1_a.getWidth() * 2,
			  height: p4_1_a.getHeight() * 6 *1.5
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
	  */
		//																															gnagnagna FIN
		
		wordChoosen.on("tap click", function(evt) {
			//anim sur le mot wordChoosen *****************************************************************************************************
			//mettre les animations pour trouver le bon mot
			//node_zoom(wordChoosen, - stage.getWidth() / 1.65, - stage.getHeight() / 100);
			displayWordArray();
		} );
		
		getGoodStage();
		
	
	}
	



	function createWordsArray(){
		wordsArray=new Array();
		var xmlWordsFile=loadXMLDoc("XML/words_requestResult.xml");
	
		wordsNodes=xmlWordsFile.getElementsByTagName("word");
		for(i=0;i<wordsNodes.length;i++){
			wordsArray.push(wordsNodes[i].getAttribute("name"));
		}
		//var wordsArraySorted=sort(wordsNodes);	
	}


	function changeDisplayedArray(boolPlus){
		if(boolPlus==true){
			actualArrayNumber=actualArrayNumber+1;
		}
		else{
			actualArrayNumber=actualArrayNumber-1;
		}
		displayWordArray();
	}


	function displayWordArray(){
		var x = 0;
		var y = 0;
		var last;
		
		if(typeof(wordToChoose)!="undefined"){
			for(var index=0;index<wordToChoose.length;index++){
				wordToChoose[index].setText(""); //ICI
			}
		}
		wordToChoose=new Array();
		wordToChooseRect=new Array();
		
		createWordsArray();
		wordsRectKineticGroup=new Kinetic.Group();
		wordsKineticGroup = new Kinetic.Group();	
		
		
		for(var index = 0; index < 5; index++) {
			if (typeof(wordsArray[index+ 5*actualArrayNumber])!='undefined'){
				wordToChoose[index] = new Kinetic.Text( {
					fontFamily : 'DemiHaut',
					fontSize : textSize,
					fill : "#FFF",
					text : wordsArray[index+ 5*actualArrayNumber] + " ",
					x : stage.getWidth()*0.75,
					y : stage.getHeight()*0.2 + stage.getHeight()*0.1*index
				} );
				var word_size = wordToChoose[index].getWidth();
				wordToChoose[index].setOffset({ x: 0 });

				wordToChooseRect[index] = new Kinetic.Rect( {
					listening : true,
					width : wordToChoose[index].getWidth(),
					height : wordToChoose[index].getHeight(),
					x : wordToChoose[index].getX(),
					y : wordToChoose[index].getY(),
					opacity : 0,
					fill : "red",
					offset : wordToChoose[index].getOffset(),
				} );
				
				
				
				if(wordToChoose[index].getY()<stage.getHeight/2){
					wordToChoose[index].setOpactity(0.7);
				}
				if(wordToChoose[index].getY()<stage.getHeight/3){
					wordToChoose[index].setOpactity(0.5);
				}
				if(wordToChoose[index].getY()<stage.getHeight/4){
					wordToChoose[index].setOpactity(0.3);
				}
				
				wordsKineticGroup.add(wordToChoose[index]);
				//wordsRectKineticGroup.add(wordToChooseRect[i]);
				
				mainLayer.add(wordToChooseRect[index]);
				mainLayer.add(wordToChoose[index]);
				last = wordToChoose[index];
				
				if(actualArrayNumber==0){
					setDownArrow();
				}
				if (actualArrayNumber>wordsNodes.length/5){
					setUpArrow();
				}
				if(actualArrayNumber<=wordsNodes.length/5 && actualArrayNumber>0){
					setDownArrow();
					setUpArrow();
					for(var i=0;i<5;i++){
						//setText. remplacer l'ancien par le nouveau.  TODO TOUT DOUX TODOOOOO
						//penser à supprimer la fleche!!
						//supprimer les "undefined"
						//mainLayer.add(wordToChoose[i]);
					}
				}
			}
		}

		if (typeof(wordsArray[1])!='undefined')	{
			wordToChoose[1].on("tap click", function(evt) {
				p1_2_a.setText(wordToChoose[1].getText()); 
				p1_2_b.setText(wordToChoose[1].getText());
				//mainWord.setValue(wordToChoose[1].getText());
				//TODO: ActiveWord.prototype.setValue = function(arg1, arg2, ...) {}
				getGoodStage();
			} );
		}
		if (typeof(wordsArray[2])!='undefined')	{
			wordToChoose[2].on("tap click", function(evt) {
				p1_2_a.setText(wordToChoose[2].getText()); 
				p1_2_b.setText(wordToChoose[2].getText());
				getGoodStage();
			} );
		}
		if (typeof(wordsArray[3])!='undefined')	{
			wordToChoose[3].on("tap click", function(evt) {
				p1_2_a.setText(wordToChoose[3].getText()); 
				p1_2_b.setText(wordToChoose[3].getText());
				getGoodStage();
			} );
		}
		if (typeof(wordsArray[4])!='undefined')	{
			wordToChoose[4].on("tap click", function(evt) {
				p1_2_a.setText(wordToChoose[4].getText()); 
				p1_2_b.setText(wordToChoose[4].getText());
				getGoodStage();
			} );
		}
		if (typeof(wordsArray[0])!='undefined')	{
			wordToChoose[0].on("tap click", function(evt) {
				p1_2_a.setText(wordToChoose[0].getText()); 
				p1_2_b.setText(wordToChoose[0].getText());
				getGoodStage();
			} );
		}

		
		
		//wordsRectKineticGroup.setDraggable(true);
		getGoodStage();
		
	}




	function getGoodStage() {
		//clearStage();
		mainLayer.add(title);
		
		mainLayer.add(p1_2_a);
		mainLayer.add(p1_2_b);
		
		mainLayer.add(mainWord.value.group);
		
		if(wordsKineticGroup!=null){
			mainLayer.add(wordsKineticGroup);
			//mainLayer.add(wordsRectKineticGroup);
		}

		actionLayer.add(wordChoosen);
		mainLayer.draw();
		actionLayer.draw();
		stage.add(mainLayer);
		stage.add(actionLayer);

		setHomeBtn();
		
	}



	function load_arrows(){
		downImg = new Image();
		downImg.src = "imgs/fleche_bas.gif";
		
		downImg.onload = function() {
			downBtn = new Kinetic.Image({
			  x : screenWidth*3/4,
			  y : screenHeight*3/4,
			  listening : true,
			  image: downImg,
			  width : screenHeight*0.10,
			  height : screenHeight*0.10
			});
			downBtn.setOffset(0,downBtn.getHeight());
			downBtn.on("tap click", function() {
				changeDisplayedArray(true);
			} );
		};
		
		upImg = new Image();
		upImg.src = "imgs/fleche_haut.gif";
		
		upImg.onload = function() {
			upBtn = new Kinetic.Image({
			  x :  screenWidth*3/4,
			  y : screenHeight/5.5,
			  listening : true,
			  image: upImg,
			  width : screenHeight*0.10,
			  height : screenHeight*0.10
			});
			upBtn.setOffset(0,upBtn.getHeight());
			upBtn.on("tap click", function() {
				changeDisplayedArray(false);
			} );
		};
	}

	function setUpArrow() {
		actionLayer.add(upBtn);
		actionLayer.draw();
	}
	// test: if >0, if >length

	function setDownArrow() {
		actionLayer.add(downBtn);
		//actionLayer.draw();
	}

}



function getXMLresult(casse, mot, procede){
	var xmlhttp=new XMLHttpRequest();

	xmlhttp.open("POST"," http://i-trace.fr/2013/laseparation/P2MM/LaboDesMots/procedes.php",true);
	
	var stringToSend="casse=";
	stringToSend=stringToSend.concat(casse);
	stringToSend=stringToSend.concat("&mot=");
	stringToSend=stringToSend.concat(mot);
	stringToSend=stringToSend.concat("&procede=");
	stringToSend=stringToSend.concat(procede);
	
	xmlhttp.send(stringToSend);

	$XMLanswer=xmlhttp.responseText;
	return($XMLanswer);
}


/*
TODO
mettre groupe de mots dans un rectangle
scroller ce rectangle
modifier l'opacité de ce rectangle en haut, en bas...

			//anim sur le mot wordChoosen 
			//mettre les animations pour trouver le bon mot
ajouter rectangle actionLayer
*/


/*
mettre TOUT ce qui est possible en XML (bouchardon)
*/