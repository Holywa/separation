var blank = new Kinetic.Text( {
	fontFamily : 'DemiHaut',
	fontSize : textSize*2,
	fill : "#FFF",
	text : "  "
	} );
	
function getStoriesMenu() {
	clearStage();
	setHomeBtn();
	
	if(!alreadyReadXML) {
		loadXMLDoc();
		storiesFromXML();
	}
	
	var x = 0;
	var y = 0;
	var last;
	for(var index = 0; index < stories.length; index++) {
		var title = new Kinetic.Text( {
				fontFamily : 'DemiHaut',
				fontSize : textSize*2,
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
	var storyGroup = new Kinetic.Group( {
		x : 0,
		y : 0
	} );
	for(var s=0; s < story.sentences.length ; s++) {
		var sentenceGroup = new Kinetic.Group( {
			x : 0,
			y : 0
		} );
		for(var w=0; w < story.sentences[s].words.length ; w++) {
			var word = story.sentences[s].words[w];
			if(word.active) {
				alert("actif : " + word.value.getText() + " / " + word.nextValue.getText());
			}
			else {
				alert("normal : " + word.value.getText() + " ");
			}
			sentenceGroup.add(word);
		}
		storyGroup.add(sentenceGroup)
	}
	mainLayer.add(storyGroup);
}

function createStoryContinue(sentences) {
	var storyGroup = new Array();
	//phrase une à une. if transition=>phrase=2
	//créer plusieurs phrases
	//on boucle sur les phrases pour stocker mots
	//créer mots actifs
}