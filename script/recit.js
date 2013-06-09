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
		loadXMLDocRecit(lang);
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
	var usableHeight = screenHeight - (returnBtn.getHeight()*3);
	var usableWidth = screenWidth - (returnBtn.getWidth()*3);
	
	var lineStart = returnBtn.getWidth()*1.5;
	  
	var storyGroup = new Kinetic.Group({
        clipFunc: function(canvas) {
            var context = canvas.getContext();
            context.rect(returnBtn.getHeight()*1.5,
						 lineStart,
						 usableWidth,
						 usableHeight);
        },
        listening: false
      });
	
	var heightLine = usableHeight/(maxVisibleLines + 2);
	var middleCol = usableWidth/2;
	
	var nbSentences = story.sentences.length;
	
	if(nbSentences > maxVisibleLines) { 
		storyGroup.setListening(true);
	}
	
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
				word.setX( lineStart );
			} 
			else { 
				if(lastWord.active) { 
					lW = lastWord.value.group; 
				}
				else { lW = lastWord.value; }
				
				//traiter cas shadow à resizer correctement avec height lW
				if((lW.getX() + lW.getWidth() + word.getWidth() + returnBtn.getWidth()) > usableWidth) { 
					lines++;
					word.setX( lineStart );
				}
				else {	
					word.setX( lW.getX() + lW.getWidth() + blank.getWidth() ); 
					}
			}
			
			word.setY( (lines+1)*heightLine );
			
			lastWord = tmpWord;
			
			storyGroup.add(word);
		}
		
		lines++;
		
	}
	mainLayer.add(storyGroup);
	mainLayer.draw();
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