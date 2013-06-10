
function getConceptMenu() {
	clearStage();
	setHomeBtn();
	
	initAproposMenu();
	actionLayer.draw();
}





function initAproposMenu(){
	conceptTitle = new Kinetic.Text( {
		text : "A propos",
		fontFamily : "DemiHaut",
		fontSize : titleSize,
		fill : "#FFF",
		align : "center",
		x : stage.getWidth()/2,
		y : stage.getHeight()*0.05
	} );
	conceptTitle.setOffset( conceptTitle.getWidth()/2, 0 );

//a modifier...	
	screenWidth = window.innerWidth;
	screenHeight = window.innerHeight;
	
	var titleSizeConcept = 0.10*screenHeight;
	var entireSizeConcept = 0.05*screenHeight;
	var demiSizeConcept = (entireSizeConcept*6)/11;
	var centraleSizeConcept = (entireSizeConcept*9)/11;
// jusque là

	
	creditsH = new Kinetic.Text( {
		text : "credits",
		fontFamily : "DemiHautH",
		fontSize : demiSizeConcept,
		fill : "#FFF",
		align : "center",
		x : stage.getWidth()/2,
		y : stage.getHeight()*0.275
	} );
	creditsH.setOffset( creditsH.getWidth()/2, creditsH.getHeight()/2 );
	
	creditsB = new Kinetic.Text( {
		text : "credits",
		fontFamily : "DemiHautB",
		fontSize : demiSizeConcept,
		fill : "#FFF",
		align : "center",
		offset : { x :creditsH.getWidth()/2,
					y : creditsH.getHeight()/2 },
		x : stage.getWidth()/2,
		y : creditsH.getY()+stage.getHeight()*0.025
	} );
	
	credits = new Kinetic.Rect( {
		listening : true,
		width : creditsH.getWidth()*1.5,
		height : creditsH.getHeight() + creditsB.getHeight(),
		x : creditsH.getX()-(creditsH.getWidth()*0.5)+(creditsH.getWidth()*0.25),
		y : creditsH.getY(),
		offset : creditsH.getOffset(),
		opacity : 0,
		fill : "red"
	} );
	
	AlisDescriptionH = new Kinetic.Text( {
		text : "la compagnie alis",
		fontFamily : "DemiHautH",
		fontSize : demiSizeConcept,
		fill : "#FFF",
		align : "center",
		x : stage.getWidth()/2,
		y : stage.getHeight()*0.475
	} );
	AlisDescriptionH.setOffset( AlisDescriptionH.getWidth()/2, AlisDescriptionH.getHeight()/2 );
	
	AlisDescriptionB = new Kinetic.Text( {
		text : "la compagnie alis",
		fontFamily : "DemiHautB",
		fontSize : demiSizeConcept,
		fill : "#FFF",
		align : "center",
		offset : { x :AlisDescriptionH.getWidth()/2,
					y : AlisDescriptionH.getHeight()/2 },
		x : stage.getWidth()/2,
		y : AlisDescriptionH.getY()+stage.getHeight()*0.025
	} );
	
	AlisDescription = new Kinetic.Rect( {
		listening : true,
		width : AlisDescriptionH.getWidth()*1.5,
		height : AlisDescriptionH.getHeight() + AlisDescriptionB.getHeight(),
		x : AlisDescriptionH.getX()-(AlisDescriptionH.getWidth()*0.5)+(AlisDescriptionH.getWidth()*0.25),
		y : AlisDescriptionH.getY(),
		offset : AlisDescriptionH.getOffset(),
		opacity : 0,
		fill : "red"
	} );

	actionLayer.add(conceptTitle);
	
	actionLayer.add(creditsB);
	actionLayer.add(creditsH);
	actionLayer.add(AlisDescriptionB);
	actionLayer.add(AlisDescriptionH);
	actionLayer.add(AlisDescription);
	actionLayer.add(credits);
	
	
	
	
	
	credits.on("tap click", function() {
		play_sound('centraleSound');
		var tweenTitle = new Kinetic.Tween({
			node: conceptTitle, 
			duration: 2,
			opacity: 0,
		  });
		  setTimeout(function() {
			tweenTitle.play();
		  }, 0);
		
		
		var tweenAlisB = new Kinetic.Tween({
			node: AlisDescriptionB, 
			duration: 4,
			X: -window.innerWidth/2,
			opacity: 1,
		  });
		  setTimeout(function() {
			tweenAlisB.play();
		  }, 0);
		
		
		var tweenAlisH = new Kinetic.Tween({
			node: AlisDescriptionH, 
			duration: 2,
			opacity: 0,
		  });
		  setTimeout(function() {
			tweenAlisH.play();
		  }, 0);
		  
		  
		var tweenCreditsB = new Kinetic.Tween({
			node: creditsB, 
			duration: 4,
			X: window.innerWidth*3/2,
			opacity: 1,
		  });
		  setTimeout(function() {
			tweenCreditsB.play();
		  }, 0);
		
		
		var tweenCreditsH = new Kinetic.Tween({
			node: creditsH, 
			duration: 2,
			opacity: 0,
		  });
		  setTimeout(function() {
			tweenCreditsH.play();
		  }, 0);		
		
		
		var tweenAlis = new Kinetic.Tween({
			node: AlisDescription, 
			duration: 4,
			X: -window.innerWidth/2,
			opacity: 0,
		  });
		  setTimeout(function() {
			tweenAlis.play();
		  }, 0);
		  
		  var tweenCredits = new Kinetic.Tween({
			node: credits, 
			duration: 4,
			X: -window.innerWidth/2,
			opacity: 0,
		  });
		  setTimeout(function() {
			tweenCredits.play();
		  }, 0);
		
		getCreditsMenu();
		
	});
	
	
	
	
	AlisDescription.on("tap click", function() {
		play_sound('centraleSound');
		
		var tweenTitle = new Kinetic.Tween({
			node: conceptTitle, 
			duration: 2,
			opacity: 0,
		  });
		  setTimeout(function() {
			tweenTitle.play();
		  }, 0);
		
		
		var tweenAlisB = new Kinetic.Tween({
			node: AlisDescriptionB, 
			duration: 4,
			X: -window.innerWidth/2,
			opacity: 1,
		  });
		  setTimeout(function() {
			tweenAlisB.play();
		  }, 0);
		
		
		var tweenAlisH = new Kinetic.Tween({
			node: AlisDescriptionH, 
			duration: 2,
			opacity: 0,
		  });
		  setTimeout(function() {
			tweenAlisH.play();
		  }, 0);
		  
		  
		var tweenCreditsB = new Kinetic.Tween({
			node: creditsB, 
			duration: 4,
			X: window.innerWidth*3/2,
			opacity: 1,
		  });
		  setTimeout(function() {
			tweenCreditsB.play();
		  }, 0);
		
		
		var tweenCreditsH = new Kinetic.Tween({
			node: creditsH, 
			duration: 2,
			opacity: 0,
		  });
		  setTimeout(function() {
			tweenCreditsH.play();
		  }, 0);		
		
		
		var tweenAlis = new Kinetic.Tween({
			node: AlisDescription, 
			duration: 4,
			X: -window.innerWidth/2,
			opacity: 0,
		  });
		  setTimeout(function() {
			tweenAlis.play();
		  }, 0);
		  
		  var tweenCredits = new Kinetic.Tween({
			node: credits, 
			duration: 4,
			X: -window.innerWidth/2,
			opacity: 0,
		  });
		  setTimeout(function() {
			tweenCredits.play();
		  }, 0);
		
		getAlisDescMenu();
	});


	
}

function play_sound(elemId) {

	document.getElementById(elemId).play();
	
	/*
	soundManager.url = 'soundmanager/swf/';

    soundManager.onready(function() {
        soundManager.createSound({
            id: 'mySound',
            url: '/path/to/an.mp3',
			preferFlash : false
        });

        // ...and play it
        soundManager.play('mySound');
    });
	*/
}
