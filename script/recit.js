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
		var title;
		if(index == 0) {
			title = new Kinetic.Text( {
				fontFamily : 'DemiHaut',
				fontSize : textSize*2,
				fill : "#FFF",
				text : stories[index].title + "  ",
				x : 0,
				y : 0
			} );
		}
		else {
			title = new Kinetic.Text( {
				fontFamily : 'DemiHaut',
				fontSize : textSize*2,
				fill : "#FFF",
				text : stories[index].title + "  ",
				x : last.getX() + last.getWidth(),
				y : last.getY()
			} );
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
}

//affichage de toutes les phrases en même temps à l'écran
function createStoryAlter(story) {
	alert("alter");
	for(var s=0; s < story.sentences.length ; s++) {
		for(var w=0; w < story.sentences[s].words.length ; w++) {
			//disposition des mots
		}
	}
}

function createStoryContinue(sentences) {
	alert("continue");
	//phrase une à une. if transition=>phrase=2
	//créer plusieurs phrases
	//on boucle sur les phrases pour stocker mots
	//créer mots actifs
}