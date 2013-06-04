window.onload = function() {
	checkDevice();
};

var screenWidth;
var screenHeight;

var homeBtn;
var shuffleBtn;
var returnBtn;

var stage;
var mainLayer = new Kinetic.Layer();
var actionLayer = new Kinetic.Layer();

var titleSize;
var demiSize;
var entireSize;
var centraleSize;

var maxVisibleLines = 5;

var en = {"tuto" : "help", "story" : "story", "labo" : "labo", "concept" : "about", "lang" : "fr"};
var fr = {"tuto" : "aide", "story" : "recit", "labo" : "labo", "concept" : "a propos", "lang" : "en"};
var activeLang = fr;

function readjustSizes() {
	screenWidth = window.innerWidth;
	screenHeight = window.innerHeight;
	
	titleSize = 0.10*screenHeight;
	entireSize = 0.05*screenHeight;
	demiSize = (entireSize*6)/11;
	centraleSize = (entireSize*9)/11;
}

function checkDevice() {
	readjustSizes();

	//Creation of stage with the same size of the device's screen
	stage = new Kinetic.Stage( {
		container : 'main',
		width : screenWidth,
		height : screenHeight
	} );
	
	//Need to force style in block to not resize the div content of stage
	stage.getContent().style.display = 'block';
	
	loadButtons();
	
	initImages();
	
	//introductionStage();
	initMainMenu();
	
	stage.add(mainLayer);
	stage.add(actionLayer);
}

function initImages() {
	var hand_tuto_img = new Image();
	hand_tuto_img.src = "imgs/hand_tuto.png";
	hand_tuto_img.onload = function() {
		hand_tuto = new Kinetic.Image({
			x : 0,
			y : - screenHeight,
			listening : true,
			image: hand_tuto_img,
			offset: { x : 0 , y : 0}
			width : screenHeight*0.075,
			height : screenHeight*0.075
		});
	};
	//TODO: load images du tutoriel
}

function loadButtons() {
	var homeImg = new Image();
	homeImg.src = "imgs/btns/icon.png";
	homeImg.onload = function() {
		homeBtn = new Kinetic.Image({
			x : 0,
			y : screenHeight,
			listening : true,
			image: homeImg,
			width : screenHeight*0.075,
			height : screenHeight*0.075
		});
		homeBtn.setOffset(0,homeBtn.getHeight());
		homeBtn.on("tap click", function() {
			clearStage();
			getMainMenu();
		} );
	};

	var shuffleImg = new Image();
	shuffleImg.src = "imgs/btns/shuffle.png";
	shuffleImg.onload = function() {
		shuffleBtn = new Kinetic.Image({
			x : screenWidth,
			y : screenHeight,
			listening : true,
			image: shuffleImg,
			width : screenHeight*0.075,
			height : screenHeight*0.075
		});
		shuffleBtn.setOffset(shuffleBtn.getWidth(),shuffleBtn.getHeight());
		shuffleBtn.on("tap click", function() {
			clearStage();
			getRandomStory();
		} );
	};
	
	var returnImg = new Image();
	returnImg.src = "imgs/btns/arrow.png";
	returnImg.onload = function() {
		returnBtn = new Kinetic.Image({ 
			x : 0,
			y : 0,
			listening : true,
			image: returnImg,
			width : screenHeight*0.075,
			height : screenHeight*0.075
		});
	returnBtn.setOffset(0,0);
	returnBtn.on("tap click", function() {
		clearStage();
		getStoriesMenu();
		} );
	};
}

function setHomeBtn() {
	actionLayer.add(homeBtn);
	actionLayer.draw();
}

function setShuffleBtn() {
	actionLayer.add(shuffleBtn);
	actionLayer.draw();
}

function setReturnBtn() {
	actionLayer.add(returnBtn);
	actionLayer.draw();
}

function clearStage() {
	/*Faire de l'animation pour effacer le stage*/
	mainLayer.removeChildren();
	actionLayer.removeChildren();
	mainLayer.draw();
	actionLayer.draw();
}

function introductionStage(){
	mainLayer.removeChildren();
	actionLayer.removeChildren();
  	
	logo = new Logo();
	zoom_logo = 1/3 * stage.getHeight() / logo.getHeight();
	logo.overall.setAttrs({
		scaleX: zoom_logo,
		scaleY: zoom_logo,
		x: (stage.getWidth() - logo.getWidth()*zoom_logo) / 2,
		y: (stage.getHeight() - logo.getHeight()*zoom_logo) / 2
	});
	rect_logo = new Kinetic.Rect({
		x: (stage.getWidth() - logo.getWidth()*zoom_logo) / 2,
		y: (stage.getHeight() - logo.getHeight()*zoom_logo) / 2,
		width: logo.getWidth(),
		height: logo.getHeight()
	})

	separation_size_font = stage.getHeight() / 16;
	separ_haut = new Kinetic.Text({
		x: stage.getWidth() / 2,
    	y: stage.getHeight() / 2,
    	text: 'la separation',
    	fontSize: separation_size_font,
    	fontFamily: 'DemiHautH',
    	fill: '#FFF',
    	opacity: 0
	});
	separ_haut.setOffset({ 
    	x: separ_haut.getWidth() / 2,
    	y: separ_haut.getHeight()
  	});

	separ_bas = new Kinetic.Text({
    	x: stage.getWidth() / 2,
    	y: stage.getHeight() / 2,
    	text: 'la separation',
    	fontSize: separation_size_font,
    	fontFamily: 'DemiHautB',
    	fill: '#FFF', 
    	opacity: 0
  	});
  	separ_bas.setOffset({ 
    	x: separ_bas.getWidth() / 2,
    	y: - separ_bas.getHeight() + separation_size_font
  	});

  	function logo_anim(){
  		tween1 = new Kinetic.Tween({
      		node: logo.overall,
      		duration: 2,
      		easing: Kinetic.Easings.StrongEaseInOut,
      		rotation: Math.PI / 2,
      		x: logo.overall.getX() + logo.getWidth()
    	})
    	tween1.play();	

    	setTimeout(function(){
    		tween1.finish();

    		tween2 = new Kinetic.Tween({
    			node: logo.arc_haut,
    			duration: 6,
    			easing: Kinetic.Easings.StrongEaseInOut,
    			y: - stage.getWidth() * 2
    		})
    		tween2.play();

    		tween3 = new Kinetic.Tween({
    			node: logo.arc_bas,
    			duration: 6,
    			easing: Kinetic.Easings.StrongEaseInOut,
    			y: stage.getWidth() * 2
    		})
    		tween3.play();

    		tween4 = new Kinetic.Tween({
    			node: logo.line,
    			duration: 2,
    			easing: Kinetic.Easings.StrongEaseInOut,
    			opacity: 0
    		})
    		tween4.play();	
    	}, 2000);
  	}

  	function separ_anim(){
  		tween4.finish();

  		tween5 = new Kinetic.Tween({
  			node: separ_haut,
  			duration: 2,
  			easing: Kinetic.Easings.StrongEaseInOut,
  			opacity: 1
  		})
  		tween5.play();

  		tween6 = new Kinetic.Tween({
  			node: separ_bas,
  			duration: 2,
  			easing: Kinetic.Easings.StrongEaseInOut,
  			opacity: 1
  		})
  		tween6.play();
  	}

  	declenched = false;

  	function cut_animation(){
  		tween7 = new Kinetic.Tween({
  			node: separ_bas,
  			duration: 4,
  			easing: Kinetic.Easings.StrongEaseInOut,
  			y: - separ_bas.getHeight(),
  			opacity: 0
  		})
  		tween7.play();

  		tween8 = new Kinetic.Tween({
  			node: separ_haut,
  			duration: 4,
  			easing: Kinetic.Easings.StrongEaseInOut,
  			y: stage.getHeight() + separ_haut.getHeight(),
  			opacity: 0
  		})
  		tween8.play();	

  		setTimeout(function(){
  			initMainMenu();
  		}, 4000);
  	}

  	function separ_cut(){
  		cut = new Separation.cut({
  			x: separ_haut.getX() - separ_haut.getOffsetX(),
  			y:	separ_haut.getY() - separ_haut.getOffsetY(),
  			width: separ_haut.getWidth(),
  			height: separ_haut.getHeight() * 2
  		})

  		cut.on(function(){
  			declenched = true;

  			cut_animation();
  		});
  	}

	rect_logo.on('tap click', function(){
		logo_anim();

    	setTimeout(function(){
    		separ_anim();
    	}, 4000)

		setTimeout(function(){
			separ_cut();
		}, 6000);

		setTimeout(function(){
			if(declenched == false){ 
				cut_animation();
				declenched = true;
			}
		}, 16000);
	})	

	mainLayer.add(logo.overall);
	mainLayer.add(separ_haut);
	mainLayer.add(separ_bas);
	mainLayer.add(rect_logo);
	
	mainLayer.draw();
	actionLayer.draw();
}

//Creating the main menu
function initMainMenu() {
	mainLayer.removeChildren();
	actionLayer.removeChildren();

	opacite = 0.5;
	
	tutorielH = new Kinetic.Text( {
		text : activeLang["tuto"],
		fontFamily : "DemiHautH",
		fontSize : demiSize,
		fill : "#FFF",
		align : "center",
		x : stage.getWidth()/2,
		y : stage.getHeight()*0.75,
		opacity: opacite
	} );
	tutorielH.setOffset( tutorielH.getWidth()/2, tutorielH.getHeight()/2 );
	
	tutorielB = new Kinetic.Text( {
		text : activeLang["tuto"],
		fontFamily : "DemiHautB",
		fontSize : demiSize,
		fill : "#FFF",
		align : "center",
		offset : { x :tutorielH.getWidth()/2,
					y : tutorielH.getHeight()/2 },
		x : stage.getWidth()/2,
		y : tutorielH.getY()+stage.getHeight()*0.025,
		opacity: opacite
	} );
	
	tutoriel = new Kinetic.Rect( {
		listening : true,
		width : tutorielH.getWidth()*1.5,
		height : tutorielH.getHeight() + tutorielB.getHeight(),
		x : tutorielH.getX()-(tutorielH.getWidth()*0.5)+(tutorielH.getWidth()*0.25),
		y : tutorielH.getY(),
		offset : tutorielH.getOffset(),
		opacity : 0
	} );
	
	recitH = new Kinetic.Text( {
		text : activeLang["story"],
		fontFamily : "DemiHautH",
		fontSize : 4 * demiSize,
		fill : "#FFF",
		align : "center",
		x : stage.getWidth()/5,
		y : stage.getHeight()/2
	} );
	recitH.setOffset( recitH.getWidth()/2, recitH.getHeight()/2 );
	
	recitB = new Kinetic.Text( {
		text : activeLang["story"],
		fontFamily : "DemiHautB",
		fontSize : 4 * demiSize,
		fill : "#FFF",
		align : "center",
		offset : { x :recitH.getWidth()/2,
					y : recitH.getHeight()/2 },
		x : stage.getWidth()/5,
		y : recitH.getY()+stage.getHeight()*0.110
	} );
	
	recit = new Kinetic.Rect( {
		listening : true,
		width : recitH.getWidth()*1.5,
		height : recitH.getHeight() + recitB.getHeight(),
		x : recitH.getX()-(recitH.getWidth()*0.5)+(recitH.getWidth()*0.25),
		y : recitH.getY(),
		offset : recitH.getOffset(),
		opacity : 0
	} );
	
	laboratoireH = new Kinetic.Text( {
		text : activeLang["labo"],
		fontFamily : "DemiHautH",
		fontSize : 4 * demiSize,
		fill : "#FFF",
		align : "center",
		x : stage.getWidth() / 5 * 4,
		y : stage.getHeight()/2
	} );
	laboratoireH.setOffset( laboratoireH.getWidth()/2, laboratoireH.getHeight()/2 );
	laboratoireB = new Kinetic.Text( {
		text : activeLang["labo"],
		fontFamily : "DemiHautB",
		fontSize : 4 * demiSize,
		fill : "#FFF",
		align : "center",
		offset : { x :laboratoireH.getWidth()/2,
					y : laboratoireH.getHeight()/2 },
		x : stage.getWidth()/5 * 4,
		y : laboratoireH.getY() + stage.getHeight()*0.110
	} );
	
	laboratoire = new Kinetic.Rect( {
		listening : true,
		width : laboratoireH.getWidth()*1.5,
		height : laboratoireH.getHeight() + laboratoireB.getHeight(),
		x : laboratoireH.getX()-(laboratoireH.getWidth()*0.5)+(laboratoireH.getWidth()*0.25),
		y : laboratoireH.getY(),
		offset : laboratoireH.getOffset(),
		opacity : 0
	} );
	
	conceptH = new Kinetic.Text( {
		text : activeLang["concept"],
		fontFamily : "DemiHautH",
		fontSize : demiSize,
		fill : "#FFF",
		align : "center",
		x : stage.getWidth()/2,
		y : stage.getHeight()*0.85,
		opacity: opacite
	} );
	conceptH.setOffset( conceptH.getWidth()/2, conceptH.getHeight()/2 );
	conceptB = new Kinetic.Text( {
		text : activeLang["concept"],
		fontFamily : "DemiHautB",
		fontSize : demiSize,
		fill : "#FFF",
		align : "center",
		offset : { x :conceptH.getWidth()/2,
					y : conceptH.getHeight()/2 },
		x : stage.getWidth()/2,
		y : conceptH.getY()+ stage.getHeight()*0.025,
		opacity: opacite
	} );
	
	concept = new Kinetic.Rect( {
		listening : true,
		width : conceptH.getWidth()*1.5,
		height : conceptH.getHeight() + conceptB.getHeight(),
		x : conceptH.getX()-(conceptH.getWidth()*0.5)+(conceptH.getWidth()*0.25),
		y : conceptH.getY(),
		offset : conceptH.getOffset(),
		opacity : 0
	} );
	
	fr_w = new Kinetic.Text( {
		text : 'fr',
		fontFamily : "DemiHaut",
		fontSize : 1.2 * entireSize,
		fill : "#FFF",
		align : "center",
		x : stage.getWidth() / 2,
		y : stage.getHeight() * 0.2,
		listening : true,
		opacity: opacite
	} );
	
	en_w = new Kinetic.Text( {
		text : 'en',
		fontFamily : "DemiHaut",
		fontSize : 1.2 * entireSize,
		fill : "#FFF",
		align : "center",
		x : stage.getWidth() / 2,
		y : stage.getHeight() * 0.2,
		listening : true,
		opacity: opacite / 3
	} );

	trait = new Kinetic.Text( {
		text : '|',
		fontFamily : "DemiHaut",
		fontSize : 1.2 * entireSize,
		fill : "#FFF",
		align : "center",
		x : stage.getWidth() / 2,
		y : stage.getHeight() * 0.2,
		opacity: opacite
	} );

	lang_size = fr_w.getWidth() + en_w.getWidth() + trait.getWidth();
	fr_w.setOffset(lang_size / 2, 0);
	trait.setOffset(lang_size / 2 - fr_w.getWidth(), 0);
	en_w.setOffset(lang_size / 2 - fr_w.getWidth() - trait.getWidth(), 0);


	tutoriel.on("tap click", function() {
		var langue = "fr";
		if(activeLang == en) {
			langue = "en";
		}
		getTutorielMenu(langue);
	} );
	recit.on("tap click", function() {
		var langue = "fr";
		if(activeLang == en) {
			langue = "en";
		}
		getStoriesMenu(langue);
	} );
	laboratoire.on("tap click", function() {
		getLaboratoryMenu();
	} );
	concept.on("tap click", function() {
		getConceptMenu();
	} );
	fr_w.on("tap click", function() {
		fr_w.setOpacity(opacite);
		en_w.setOpacity(opacite/3);
		changeLanguage(fr);		
	});
	en_w.on("tap click", function(){
		en_w.setOpacity(opacite);
		fr_w.setOpacity(opacite/3);
		changeLanguage(en);
	});
	
	getMainMenu();
}

function changeLanguage(lang) {
	if(lang == fr) {
		activeLang = fr;
	}
	else {
		activeLang = en;
	}
	tutorielH.setText(activeLang["tuto"]);
	tutorielH.setOffset( tutorielH.getWidth()/2, tutorielH.getHeight()/2 );	
		
	tutorielB.setText(activeLang["tuto"]);
	tutorielB.setOffset( tutorielB.getWidth()/2 , tutorielB.getHeight()/2 );

	recitH.setText(activeLang["story"]);
	
	recitB.setText(activeLang["story"]);

	laboratoireH.setText(activeLang["labo"]);

	laboratoireB.setText(activeLang["labo"]);

	conceptH.setText(activeLang["concept"]);
	conceptH.setOffset( conceptH.getWidth()/2, conceptH.getHeight()/2 );
	
	conceptB.setText(activeLang["concept"]);
	conceptB.setOffset( conceptB.getWidth()/2 , conceptB.getHeight()/2 );

	mainLayer.draw();
}

function getMainMenu() {
	mainLayer.add(tutorielH);
	mainLayer.add(tutorielB);
	mainLayer.add(recitH);
	mainLayer.add(recitB);
	mainLayer.add(laboratoireH);
	mainLayer.add(laboratoireB);
	mainLayer.add(conceptH);
	mainLayer.add(conceptB);
	mainLayer.add(fr_w);
	mainLayer.add(en_w);
	mainLayer.add(trait);

	actionLayer.add(tutoriel);
	actionLayer.add(recit);
	actionLayer.add(laboratoire);
	actionLayer.add(concept);

	mainLayer.draw();
	actionLayer.draw();
}