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
		loadXMLDoc(lang);
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
				title.setX(0);
				title.setY(0);
		}
		else {
			title.setX(last.getX() + last.getWidth() + blank.getWidth()*2);
				title.setY(last.getY());
		}
		if(title.getX() > screenWidth) {
			title.setX(0);
			title.setY(last.getHeight() + blank.getHeight());
		}
		title.on('tap click', function (evt) {
			getStoryLayout(this.getText());
		});
		mainLayer.add(title);
		last = title;
	}
	mainLayer.draw();
}

//Function called when user chooses a story
function getStoryLayout(title) {
	clearStage();
	setHomeBtn();

	//Get the correct node story
	var currentStory = getRightStory(title);
	
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
	//mainLayer.add(blank);
	
	var usableHeight = screenHeight - returnBtn.getHeight();
	var usableWidth = screenWidth - returnBtn.getWidth();
	
	var storyLayer = new Kinetic.Layer( {
		height : usableHeight,
		width : usableWidth,
		x : returnBtn.getHeight(),
		y : returnBtn.getWidth(),
		listening : false
	} );
	
	var heightLine = usableHeight/(maxVisibleLines + 2);
	var middleCol = usableWidth/2;
	
	var nbSentences = story.sentences.length;
	
	if(nbSentences > maxVisibleLines) { 
		storyGroup.setListening(true);
	}
	
	for(var s=0; s < nbSentences ; s++) {
		var lastWord;
		
		for(var w=0; w < story.sentences[s].words.length ; w++) {
			var word = story.sentences[s].words[w];
			if(w == 0) { 
				if(word.active)
					word.value.group.setX( 0 );
				else word.value.setX( 0 );
			} //premier mot de la phrase
			else { 
				var valueX;
				if(lastWord.active)
					valueX = lastWord.value.group.getX();
				else
					valueX = lastWord.value.getX();
					
				if( (word.value.group.getWidth() + valueX) > usableWidth ) {
					
					alert("nouvelle ligne");
				}				
					
				if(word.active)
					word.value.group.setX( valueX + blank.getWidth() );
				else
					word.value.setX( valueX + blank.getWidth() );
			}
			word.value.group.setY( (s+1)*heightLine );
			lastWord = word;
		}
		var sentenceGroup = new Kinetic.Group( {
			offset : { x : 0 , y : 0 }
		} );
		storyLayer.add(sentenceGroup);
	}
	stage.add(storyLayer);
}

function createStoryContinue(sentences) {
	var storyGroup = new Array();
	//phrase une à une. if transition=>phrase=2
	//créer plusieurs phrases
	//on boucle sur les phrases pour stocker mots
	//créer mots actifs
}

function getRandomStory() {
	var randomIndex = Math.floor((Math.random()*stories.length));
	getStoryLayout(stories[randomIndex].title);
}