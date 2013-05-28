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

var maxVisibleLines = 10;

var en = {"tuto" : "Tutorial", "story" : "Tale of words", "labo" : "The word laboratory", "concept" : "Poetic concept", "lang" : "Français"};
var fr = {"tuto" : "Tutoriel", "story" : "Le recit des mots", "labo" : "Le laboratoire des mots", "concept" : "Concept poetique", "lang" : "English"};
var activeLang = fr;

function readjustSizes() {
	screenWidth = window.innerWidth;
	screenHeight = window.innerHeight;
	
	titleSize = 0.10*screenHeight;
	entireSize = 0.05*screenHeight;
	demiSize = (entireSize*6)/11;
	centraleSize = (entireSize*9)/11;
	
	/*var size_font = 4;
	var demihaut_font = 16 * size_font;
	var demihaut_part_font = 5 * size_font;
	var decal_h = 1.5 * size_font;
	var decal_b = 2 * size_font;*/
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
	
	initMainMenu();
	
	stage.add(mainLayer);
	stage.add(actionLayer);
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
		homeBtn.on("tap", function() {
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
		shuffleBtn.on("tap", function() {
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
	returnBtn.on("tap", function() {
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

//Creating the main menu
function initMainMenu() {
	mainLayer.removeChildren();
	actionLayer.removeChildren();

	title = new Kinetic.Text( {
		text : "La Séparation",
		fontFamily : "DemiBas",
		fontSize : titleSize,
		fill : "#FFF",
		align : "center",
		x : stage.getWidth()/2,
		y : stage.getHeight()*0.05
	} );
	title.setOffset( title.getWidth()/2, 0 );
	
	tutorielH = new Kinetic.Text( {
		text : activeLang["tuto"],
		fontFamily : "DemiHautH",
		fontSize : demiSize,
		fill : "#FFF",
		align : "center",
		x : stage.getWidth()/2,
		y : stage.getHeight()*0.275
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
		y : tutorielH.getY()+stage.getHeight()*0.025
	} );
	
	tutoriel = new Kinetic.Rect( {
		listening : true,
		width : tutorielH.getWidth()*1.5,
		height : tutorielH.getHeight() + tutorielB.getHeight(),
		x : tutorielH.getX()-(tutorielH.getWidth()*0.5)+(tutorielH.getWidth()*0.25),
		y : tutorielH.getY(),
		offset : tutorielH.getOffset(),
		opacity : 0,
		fill : "red"
	} );
	
	recitH = new Kinetic.Text( {
		text : activeLang["story"],
		fontFamily : "DemiHautH",
		fontSize : demiSize,
		fill : "#FFF",
		align : "center",
		x : stage.getWidth()/2,
		y : stage.getHeight()*0.475
	} );
	recitH.setOffset( recitH.getWidth()/2, recitH.getHeight()/2 );
	
	recitB = new Kinetic.Text( {
		text : activeLang["story"],
		fontFamily : "DemiHautB",
		fontSize : demiSize,
		fill : "#FFF",
		align : "center",
		offset : { x :recitH.getWidth()/2,
					y : recitH.getHeight()/2 },
		x : stage.getWidth()/2,
		y : recitH.getY()+stage.getHeight()*0.025
	} );
	
	recit = new Kinetic.Rect( {
		listening : true,
		width : recitH.getWidth()*1.5,
		height : recitH.getHeight() + recitB.getHeight(),
		x : recitH.getX()-(recitH.getWidth()*0.5)+(recitH.getWidth()*0.25),
		y : recitH.getY(),
		offset : recitH.getOffset(),
		opacity : 0,
		fill : "red"
	} );
	
	laboratoireH = new Kinetic.Text( {
		text : activeLang["labo"],
		fontFamily : "DemiHautH",
		fontSize : demiSize,
		fill : "#FFF",
		align : "center",
		x : stage.getWidth()/2,
		y : stage.getHeight()*0.675
	} );
	laboratoireH.setOffset( laboratoireH.getWidth()/2, laboratoireH.getHeight()/2 );
	laboratoireB = new Kinetic.Text( {
		text : activeLang["labo"],
		fontFamily : "DemiHautB",
		fontSize : demiSize,
		fill : "#FFF",
		align : "center",
		offset : { x :laboratoireH.getWidth()/2,
					y : laboratoireH.getHeight()/2 },
		x : stage.getWidth()/2,
		y : laboratoireH.getY() + stage.getHeight()*0.025
	} );
	
	laboratoire = new Kinetic.Rect( {
		listening : true,
		width : laboratoireH.getWidth()*1.5,
		height : laboratoireH.getHeight() + laboratoireB.getHeight(),
		x : laboratoireH.getX()-(laboratoireH.getWidth()*0.5)+(laboratoireH.getWidth()*0.25),
		y : laboratoireH.getY(),
		offset : laboratoireH.getOffset(),
		opacity : 0,
		fill : "red"
	} );
	
	conceptH = new Kinetic.Text( {
		text : activeLang["concept"],
		fontFamily : "DemiHautH",
		fontSize : demiSize,
		fill : "#FFF",
		align : "center",
		x : stage.getWidth()/2,
		y : stage.getHeight()*0.875
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
		y : conceptH.getY()+ stage.getHeight()*0.025
	} );
	
	concept = new Kinetic.Rect( {
		listening : true,
		width : conceptH.getWidth()*1.5,
		height : conceptH.getHeight() + conceptB.getHeight(),
		x : conceptH.getX()-(conceptH.getWidth()*0.5)+(conceptH.getWidth()*0.25),
		y : conceptH.getY(),
		offset : conceptH.getOffset(),
		opacity : 0,
		fill : "red"
	} );
	
	lang = new Kinetic.Text( {
		text : activeLang["lang"],
		fontFamily : "DemiHaut",
		fontSize : entireSize,
		fill : "#FFF",
		align : "center",
		x : 0,
		y : screenHeight,
		listening : true
	} );
	lang.setOffset(0, lang.getHeight());
	
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
	laboratoire.on("tap", function() {
		getLaboratoryMenu();
	} );
	concept.on("tap", function() {
		getConceptMenu();
	} );
	lang.on("tap", function() {
		changeLanguage();
	});
	
	getMainMenu();
}

function changeLanguage() {
	if(activeLang == fr) {
		activeLang = en;
	}
	else {
		activeLang = fr;
	}
	tutorielH.setText(activeLang["tuto"]);
	tutorielH.setPosition( { x : stage.getWidth()/2,
		y : stage.getHeight()*0.275 } );
	tutorielH.setOffset( tutorielH.getWidth()/2, tutorielH.getHeight()/2 );	
		
	tutorielB.setText(activeLang["tuto"]);
	tutorielB.setOffset( tutorielB.getWidth()/2 , tutorielB.getHeight()/2 );
	tutorielB.setPosition( stage.getWidth()/2 , tutorielH.getY()+ stage.getHeight()*0.025 );
	
	recitH.setText(activeLang["story"]);
	recitH.setPosition( { x : stage.getWidth()/2,
		y : stage.getHeight()*0.475 } );
	recitH.setOffset( recitH.getWidth()/2, recitH.getHeight()/2 );
	
	recitB.setText(activeLang["story"]);
	recitB.setOffset( recitB.getWidth()/2 , recitB.getHeight()/2 );
	recitB.setPosition( stage.getWidth()/2 , recitH.getY()+ stage.getHeight()*0.025 );
	
	laboratoireH.setText(activeLang["labo"]);
	laboratoireH.setPosition( { x : stage.getWidth()/2,
		y : stage.getHeight()*0.675 } );
	laboratoireH.setOffset( laboratoireH.getWidth()/2, laboratoireH.getHeight()/2 );
	
	laboratoireB.setText(activeLang["labo"]);
	laboratoireB.setOffset( laboratoireB.getWidth()/2 , laboratoireB.getHeight()/2 );
	laboratoireB.setPosition( stage.getWidth()/2 , laboratoireH.getY()+ stage.getHeight()*0.025 );
	
	conceptH.setText(activeLang["concept"]);
	conceptH.setPosition( { x : stage.getWidth()/2,
		y : stage.getHeight()*0.875 } );
	conceptH.setOffset( conceptH.getWidth()/2, conceptH.getHeight()/2 );
	
	conceptB.setText(activeLang["concept"]);
	conceptB.setOffset( conceptB.getWidth()/2 , conceptB.getHeight()/2 );
	conceptB.setPosition( stage.getWidth()/2 , conceptH.getY()+ stage.getHeight()*0.025 );
	
	lang.setText(activeLang["lang"]);
	
	mainLayer.draw();
}

function getMainMenu() {
	mainLayer.add(title);
	mainLayer.add(tutorielH);
	mainLayer.add(tutorielB);
	mainLayer.add(recitH);
	mainLayer.add(recitB);
	mainLayer.add(laboratoireH);
	mainLayer.add(laboratoireB);
	mainLayer.add(conceptH);
	mainLayer.add(conceptB);
	mainLayer.add(lang);
	
	actionLayer.add(tutoriel);
	actionLayer.add(recit);
	actionLayer.add(laboratoire);
	actionLayer.add(concept);
	
	mainLayer.draw();
	actionLayer.draw();
}