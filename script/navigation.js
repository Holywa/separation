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
	
	initMainMenu();
	
	stage.add(mainLayer);
	stage.add(actionLayer);
}

function loadButtons() {
	var homeImg = new Image();
	homeImg.src = "imgs/icon.png";
	homeImg.onload = function() {
		homeBtn = new Kinetic.Image({
			x : 0,
			y : screenHeight,
			listening : true,
			image: homeImg,
			width : screenHeight*0.10,
			height : screenHeight*0.10
		});
		homeBtn.setOffset(0,homeBtn.getHeight());
		homeBtn.on("tap click", function() {
			clearStage();
			getMainMenu();
		} );
	};

	var shuffleImg = new Image();
	shuffleImg.src = "imgs/shuffle.png";
	shuffleImg.onload = function() {
		shuffleBtn = new Kinetic.Image({
			x : screenWidth,
			y : screenHeight,
			listening : true,
			image: shuffleImg,
			width : screenHeight*0.10,
			height : screenHeight*0.10
		});
		shuffleBtn.setOffset(shuffleBtn.getWidth(),shuffleBtn.getHeight());
		shuffleBtn.on("tap click", function() {
			clearStage();
			getRandomStory();
		} );
	};
	
	var returnImg = new Image();
	returnImg.src = "imgs/arrow.png";
	returnImg.onload = function() {
		returnBtn = new Kinetic.Image({ 
			x : 0,
			y : 0,
			listening : true,
			image: returnImg,
			width : screenHeight*0.10,
			height : screenHeight*0.10
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

//Creating the main menu
function initMainMenu() {
	mainLayer.removeChildren();
	actionLayer.removeChildren();

	title = new Kinetic.Text( {
		text : "La Séparation",
		fontFamily : "Century Gothic",
		fontSize : titleSize,
		fill : "#FFF",
		align : "center",
		x : stage.getWidth()/2,
		y : stage.getHeight()*0.05
	} );
	title.setOffset( title.getWidth()/2, 0 );
	
	tutorielH = new Kinetic.Text( {
		text : "tutoriel",
		fontFamily : "DemiHautH",
		fontSize : demiSize,
		fill : "#FFF",
		align : "center",
		x : stage.getWidth()/2,
		y : stage.getHeight()*0.275
	} );
	tutorielH.setOffset( tutorielH.getWidth()/2, tutorielH.getHeight()/2 );
	
	tutorielB = new Kinetic.Text( {
		text : "tutoriel",
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
		text : "le  recit  des  mots",
		fontFamily : "DemiHautH",
		fontSize : demiSize,
		fill : "#FFF",
		align : "center",
		x : stage.getWidth()/2,
		y : stage.getHeight()*0.475
	} );
	recitH.setOffset( recitH.getWidth()/2, recitH.getHeight()/2 );
	
	recitB = new Kinetic.Text( {
		text : "le  recit  des  mots",
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
		text : "le  laboratoire  des  mots",
		fontFamily : "DemiHautH",
		fontSize : demiSize,
		fill : "#FFF",
		align : "center",
		x : stage.getWidth()/2,
		y : stage.getHeight()*0.675
	} );
	laboratoireH.setOffset( laboratoireH.getWidth()/2, laboratoireH.getHeight()/2 );
	laboratoireB = new Kinetic.Text( {
		text : "le  laboratoire  des  mots",
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
		text : "concept  poetique",
		fontFamily : "DemiHautH",
		fontSize : demiSize,
		fill : "#FFF",
		align : "center",
		x : stage.getWidth()/2,
		y : stage.getHeight()*0.875
	} );
	conceptH.setOffset( conceptH.getWidth()/2, conceptH.getHeight()/2 );
	conceptB = new Kinetic.Text( {
		text : "concept  poetique",
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
	
	tutoriel.on("tap click", function() {
		getTutorielMenu();
	} );
	recit.on("tap click", function() {
		getStoriesMenu();
	} );
	laboratoire.on("tap click", function() {
		getLaboratoryMenu();
	} );
	concept.on("tap click", function() {
		getConceptMenu();
	} );
	
	getMainMenu();
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
	
	actionLayer.add(tutoriel);
	actionLayer.add(recit);
	actionLayer.add(laboratoire);
	actionLayer.add(concept);
	
	mainLayer.draw();
	actionLayer.draw();
}