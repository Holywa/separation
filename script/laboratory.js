function getLaboratoryMenu() {
	clearStage();
	setHomeBtn();
	
	alert("laboratory");
}var mainLayer;
var actionLayer;
var titleSize;
var textSize;
var wordSize;
var userWord;
var wordsArray;
var displayedWord;
var wordChoosenH;
var wordChoosenB;
var wordsKineticGroup;




function getLaboratoryMenu() {
	clearStage(); 
	
	displayedWord = prompt("gimme your text");

/*
	stage.on('click', function(evt) {
	   this.setText(prompt('New Text:'));
	   layer.draw(); //redraw the layer containing the textfield
	   
	});
*/
	

	
	var xhr=getXMLHttpRequest();
	xmlWordsFile=loadXMLDoc("words_requestResult.xml");
	
	wordsArray=new Array();
	wordsNodes=xmlWordsFile.getElementsByTagName("word");
	for(i=0;i<wordsNodes.length;i++){
		wordsArray.push(wordsNodes[i]);
	}
	initLaboMenu();
	//var wordsArraySorted=sort(wordsNodes);
	//alert(wordsArray[9].getAttribute("name"));

	setHomeBtn();
	
	stage.add(mainLayer);
	stage.add(actionLayer);
	mainLayer.draw();
	
}

function displayWordArray(){ // les mettre sur la droite
	//alert(wordsArray[1].getAttribute("name"));
	var x = 0;
	var y = 0;
	var last;
	wordsKineticGroup = new Kinetic.Group();
	for(var index = 0; index < wordsArray.length; index++) {
		var wordToChoose=new Array();
		if(index == 0) {
			wordToChoose[i] = new Kinetic.Text( {
				fontFamily : 'DemiHaut',
				fontSize : textSize,
				fill : "#FFF",
				text : wordsArray[index].getAttribute("name") + "\n",
				align : "top",
				x : stage.getWidth()*0.75,
				y : stage.getHeight()*0.2
			} );
		var word_size = wordToChoose[i].getWidth();
		wordToChoose[i].setOffset({ x: word_size });
		}

		else {
			wordToChoose[i] = new Kinetic.Text( {
				fontFamily : 'DemiHaut',
				fontSize : textSize,
				fill : "#FFF",
				text : wordsArray[index].getAttribute("name") + "  ",
				x : last.getX(),
				y : last.getY() + last.getHeight()
			} );
		}
		
		

		
		
		mainLayer.add(wordToChoose[i]);
		last = wordToChoose[i];		
		
		wordToChoose[i].on("tap click", function(evt) {
			//anim sur le mot wordChoosen *****************************************************************************************************
			//mettre les animations pour trouver le bon mot
			alert(wordToChoose[i].getText());
			wordChoosenH.setText(wordToChoose[i].getText()); 
			wordChoosenB.setText(wordToChoose[i].getText()); 
			//displayWordArray();
			//stage.add(mainLayer);
			//stage.add(actionLayer);
			mainLayer.draw();
		} );
		wordsKineticGroup.add(wordToChoose[i]);
	}
	
	//mainLayer.draw();
}


//Creating the main menu
function initLaboMenu() {
	mainLayer.removeChildren();
	actionLayer.removeChildren();

	title = new Kinetic.Text( {
		text : "Le laboratoire des mots",
		fontFamily : "Century Gothic",
		fontSize : titleSize,
		fill : "#FFF",
		align : "top",
		x : stage.getWidth()/2,
		y : stage.getHeight()*0.05
	} );
	title.setOffset( title.getWidth()/2, 0 );
	
	wordChoosenH = new Kinetic.Text( {
		text : displayedWord,
		fontFamily : "DemiHautH",
		fontSize : textSize/2,
		fill : "#FFF",
		align : "left",
		x : stage.getWidth()/2,
		y : stage.getHeight()*0.275
	} );
	wordChoosenH.setOffset( wordChoosenH.getWidth()/2, wordChoosenH.getHeight()/2 );
	
	wordChoosenB = new Kinetic.Text( {
		text : displayedWord,
		fontFamily : "DemiHautB",
		fontSize : textSize/2,
		fill : "#FFF",
		align : "left",
		offset : { x :wordChoosenH.getWidth()/2,
					y : wordChoosenH.getHeight()/2 },
		x : stage.getWidth()/2,
		y : wordChoosenH.getY()+stage.getHeight()*0.025
	} );
	
	wordChoosen = new Kinetic.Rect( {
		listening : true,
		width : wordChoosenH.getWidth()*1.5,
		height : wordChoosenH.getHeight() + wordChoosenB.getHeight(),
		x : wordChoosenH.getX()-(wordChoosenH.getWidth()*0.5)+(wordChoosenH.getWidth()*0.25),
		y : wordChoosenH.getY(),
		offset : wordChoosenH.getOffset(),
		opacity : 0.5,
	} );

	
	
	wordChoosen.on("tap click", function(evt) {
		//anim sur le mot wordChoosen *****************************************************************************************************
		//mettre les animations pour trouver le bon mot

		displayWordArray();
		stage.add(mainLayer);
		stage.add(actionLayer);
		mainLayer.draw();
	} );
	
	getLaboMenu();
}

function getLaboMenu() {
	mainLayer.add(title);
	mainLayer.add(wordChoosenH);
	mainLayer.add(wordChoosenB);

	actionLayer.add(wordChoosen);
	
	mainLayer.draw();
	actionLayer.draw();
}


/*
TODO
mettre groupe de mots dans un rectangle
scroller ce rectangle
modifier l'opacité de ce rectangle en haut, en bas...

*/