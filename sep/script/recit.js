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

function getStoryLayout(title) {
	clearStage();
	setHomeBtn();

	var currentStory = getRightStory(title);
	
	var sentences = getStoryFromXML(currentStory);
}