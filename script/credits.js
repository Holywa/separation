
function getCreditsMenu(){
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
			y : stage.getHeight()*0.02,
			opacity:1,
			fill:"white"
		} );
		creditsTitle.setOffset( creditsTitle.getWidth()/2, 0 );
	 
		creditsTitle.fire("click");
	 
		stage.getContainer().addEventListener('mousedown', function(evt) {
			var tweenTitleCredits = new Kinetic.Tween({
				node: creditsTitle, 
				duration: 2,
				opacity: 1,
			  });
			setTimeout(function() {
				tweenTitleCredits.play();
			}, 1000);
			
		});	
		
		
		actionLayer.add(creditsTitle);
		actionLayer.draw();
		
		var xmlCreditsFile=loadXMLDoc("XML/credits.xml");
		
		if(activeLang=en){
			var rootNode=xmlCreditsFile.getElementsByTagName("english")[0];
		}
		else{
			var rootNode=xmlCreditsFile.getElementsByTagName("francais")[0];
		}
		
		for(var i=0;i<rootNode.getElementsByTagName("section").length;i++){
			sectionNode=rootNode.getElementsByTagName("section").item(i);
			
			subTitleNode=sectionNode.getElementsByTagName("subtitle").item(0);
			writeSubtitle(i, subTitleNode);
			for(var j=0;j<sectionNode.getElementsByTagName("person").length;j++){
				
				personNode=sectionNode.getElementsByTagName("person").item(j);
				writePerson(i, j, personNode);
			}
		}
	}, 2000);
}
 
 function displayCredits(){ //fonction en dur
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
 


function writeSubtitle(i, sentenceNode){
	alisDescText = new Kinetic.Text( {
		text : sentenceNode.textContent,
		fontFamily : "Century Gothic",
		fontSize : window.innerWidth*0.012,
		fill : "#FFF",
		align : "center",
		x : stage.getWidth()/2,
		y : stage.getHeight()*0.15 + stage.getHeight()*0.035 *(6*i)
	} );
	
	alisDescText.setOffset(alisDescText.getWidth()/2, 0 );
	actionLayer.add(alisDescText);
}


function writePerson(i, j, sentenceNode){
	alisDescText = new Kinetic.Text( {
		text : sentenceNode.textContent,
		fontFamily : "Century Gothic",
		fontSize : window.innerWidth*0.009,
		fill : "#FFF",
		align : "center",
		x : stage.getWidth()/2,
		y : stage.getHeight()*0.2 + stage.getHeight()*0.035 *(6*i+j)
	} );
	
	alisDescText.setOffset(alisDescText.getWidth()/2, 0 );
	actionLayer.add(alisDescText);
}
