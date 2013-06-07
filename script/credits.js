function getCreditsMenu(){
	//actionLayer.removeChildren();
	setTimeout(function() {
		clearStage();
		setHomeBtn();
		actionLayer.clear();
		var creditsTitle = new Kinetic.Text( {
			text : "Credits",
			fontFamily : "Century Gothic",
			fontSize : titleSize,
			fill : "#FFF",
			align : "center",
			x : stage.getWidth()/2,
			y : stage.getHeight()*0.05,
			opacity:1,
			fill:"white"
		} );
		creditsTitle.setOffset( creditsTitle.getWidth()/2, 0 );
	 
		creditsTitle.fire("click");
	 
		//creditsTitle.on("click", function(evt) {
		stage.getContainer().addEventListener('mousedown', function(evt) { //problem
			var tweenTitleCredits = new Kinetic.Tween({
				node: creditsTitle, 
				duration: 2,
				opacity: 1,
			  });
			setTimeout(function() {
				tweenTitleCredits.play();
			}, 1000);
			
		});	
		
		displayCredits();
		
		actionLayer.add(creditsTitle);
		actionLayer.draw();
			
		
	}, 2000);
	
	
}
 
 function displayCredits(){
	displayCreditsText("big", "La compagnie Alis", 1);
	displayCreditsText("normal", "Pierre Fourny, Helene Caubel", 1);
	
	displayCreditsText("big", "Le centre de recherche de l'UTC", 2);
	displayCreditsText("normal", "Serge Bouchardon",  2);
	
	displayCreditsText("big", "Les etudiants de l'UTC", 3);
	displayCreditsText("normal", "Olivia Reaney, Aurelie Suzanne, Marie Collet, Jade Copet, Jeanne Lepetit", 3);
 }
 
 function displayCreditsText(textType, text, number){
	if(textType=="big"){
		var kineticText = new Kinetic.Text( {
			text : text,
			fontFamily : "Century Gothic",
			fontSize : entireSize,
			fill : "#FFF",
			align : "center",
			x : stage.getWidth()/2,
			y : stage.getHeight()*0.25*number
		} );
		kineticText.setOffset( kineticText.getWidth()/2, 0 );
		
		actionLayer.add(kineticText);
	}
	else if (textType=="normal"){
		var kineticText = new Kinetic.Text( {
			text : text,
			fontFamily : "Century Gothic",
			fontSize : demiSize,
			fill : "#FFF",
			align : "center",
			x : stage.getWidth()/2,
			y : stage.getHeight()*0.25*number + stage.getHeight()*0.1
		} );
		kineticText.setOffset( kineticText.getWidth()/2, 0 );
		
		actionLayer.add(kineticText);
	
	}
 }