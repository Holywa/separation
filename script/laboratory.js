function getLaboratoryMenu() {
	clearStage();
	setHomeBtn();
	
	inLab = true;
	
	getProcedesServeur();
	
	var middleW = screenWidth/2;
	var middleH = screenHeight/2;
	
	var instruction = ((activeLang == fr) ? "Double-cliquez" : "Double-tap" );
	
	var text = new Kinetic.Text( {
		x : middleW,
		y : middleH,
		text : instruction,
		fontFamily : "DemiHaut",
		fontSize : entireSize,
		fill : "#FFF"
	} );
	text.setOffset( { x : text.getWidth()/2, y : text.getHeight()/2 } );
	
	text.on( "dbltap" , openPrompt );
	
	mainLayer.add(text);
	mainLayer.draw();
}

var openPrompt = function() {
	var requested_word = prompt(activeLang["labPromptInstruction"]);
	if (requested_word != null) {
		requestWords(requested_word);
		//afficher signe du travail
		//calculer 10 positions autour du mot central
		//positions -> 10 mots-réponses dont la fréquence est la plus haute
		//if pas de réponses afficher : pas de réponses
    }
};