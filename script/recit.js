var storyGroup;

var blank = new Kinetic.Text( {
	fontFamily : 'DemiHaut',
	fontSize : entireSize,
	fill : "#FFF",
	text : "  ",
	listening : false,
	} );
		
function getStoriesMenu(lang) {
	clearStage();
	setHomeBtn();
	
	if(!alreadyReadXML) {
		var xmlPath = ((activeLang == fr) ? frXmlPath : enXmlPath);
		xmlFile = loadXMLDoc(xmlPath);
		storiesFromXML();
	}
	
	var x = 0;
	var y = 0;
	var last;
	for(var index = 0; index < stories.length; index++) {
		var title = new Kinetic.Text( {
				fontFamily : 'DemiHaut',
				fontSize : entireSize,
				fill : "#FFF",
				text : stories[index].title
				} );
		if(index == 0) {
				title.setX(blank.getWidth()*3);
				title.setY(0);
		}
		else {
			title.setX(last.getX() + last.getWidth() + blank.getWidth()*3);
			title.setY(last.getY());
		}
		if(title.getX() > screenWidth) {
			title.setX(0);
			title.setY(last.getHeight() + blank.getHeight());
		}
		title.on('tap', function (evt) {
			getStoryLayout(this.getText());
		});
		mainLayer.add(title);
		last = title;
	}
	
	/*For performance*/
	var elo = new Kinetic.Text( {
				fontFamily : 'DemiHaut',
				fontSize : entireSize,
				fill : "#FFF",
				text : "ELO"
				} );
	elo.on('tap', function (evt) {
			getStoryLayout(this.getText());
		});
		
	elo.setX(last.getX() + last.getWidth() + blank.getWidth()*3);
	elo.setY(last.getY());
	if(elo.getX() > screenWidth) {
		elo.setX(0);
		elo.setY(last.getHeight() + blank.getHeight());
	}
	
	last = elo;
				
	var names = new Kinetic.Text( {
				fontFamily : 'DemiHaut',
				fontSize : entireSize,
				fill : "#FFF",
				text : "Prenoms"
				} );
	names.on('tap', function (evt) {
			getStoryLayout(this.getText());
		});
		
	names.setX(last.getX() + last.getWidth() + blank.getWidth()*3);
	names.setY(last.getY());
	if(names.getX() > screenWidth) {
		names.setX(0);
		names.setY(last.getHeight() + blank.getHeight());
	}
	
	mainLayer.add(elo);
	mainLayer.add(names);
	
	
	mainLayer.draw();
}

//Function called when user chooses a story
function getStoryLayout(title) {
	clearStage();
	setHomeBtn();

	if(title=="ELO") {
		window.location="./videoelo.html";
		return;
	}
	else if(title=="Prenoms") {
		window.location="./videoprenoms.html";
		return;
	}
	else if(title=="Separation") {
		if(activeLang == fr) {
			window.location="./videoseparfr.html";
		}
		else {
			window.location="./videoseparen.html";
		}
		return;
	}
	//Get the correct node story
	var currentStory = getRightStory(title);
	
	if(currentStory == null) {
		return;
	}
	//Retrieve all sentences
	getStoryFromXML(currentStory);
		
	//Decide which layout to set up
	if(currentStory.type==StoryType["alter"]){
		createStoryAlter(currentStory);
	}
	else if(currentStory.type==StoryType["continue"]){
		createStoryContinue(currentStory);
	}
	
	setShuffleBtn();
	setReturnBtn();
}

//affichage de toutes les phrases en même temps à l'écran
function createStoryAlter(story) {
	currentStoryType = story.type;
	var buttonSize = screenHeight*0.075;
	var lineStart = buttonSize*1.5;
	
	var usableHeight = screenHeight - (lineStart*2);
	var usableWidth = screenWidth - (lineStart*2);
	  
	storyGroup = new Kinetic.Group({
        x : lineStart,
		y : lineStart,
		listening: true
    });
	
	var heightLine = usableHeight/(maxVisibleLines + 2);
	var middleCol = usableWidth/2;
	
	var nbSentences = story.sentences.length;
	
	var lines = 0;
	
	for(var s=0; s < nbSentences ; s++) {
		var lastWord;
		var lW;
		
		for(var w=0; w < story.sentences[s].words.length ; w++) {
			var tmpWord = story.sentences[s].words[w];
			var word;
			if(tmpWord.active) { word = tmpWord.value.group; }
			else { word = tmpWord.value; }
			if(w == 0) { //premier mot de la phrase 
				word.setX( 0 );
			} 
			else { 
				if(lastWord.active) { 
					lW = lastWord.value.group; 
				}
				else { lW = lastWord.value; }
				
				if((lW.getX() + lW.getWidth() + word.getWidth() + returnBtn.getWidth()) > usableWidth) { 
					lines++;
					word.setX( 0 );
				}
				else {	
					word.setX( lW.getX() + lW.getWidth() + blank.getWidth() ); 
					}
			}
			
			word.setY( lines*heightLine );
			
			lastWord = tmpWord;
			
			storyGroup.add(word);
		}
		
		lines++;
		
	}
	mainLayer.add(storyGroup);
	mainLayer.draw();
	
	if(nbSentences > maxVisibleLines) {
		//scroll up : descendre le storyGroup (+y)
		//scroll down : monter le story Group (-y)
	}
}

function createStoryContinue(sentences) {
	var storyGroup = new Array();
	//affichage phrase une à une. if transition=>phrase=2
	//créer plusieurs phrases
	//on boucle sur les phrases pour stocker mots
	//créer mots actifs
}

//Get a random index in all the stories and load it
function getRandomStory() {
	var randomIndex = Math.floor((Math.random()*stories.length));
	getStoryLayout(stories[randomIndex].title);
}