 function getAlisDescMenu(){
	
	setTimeout(function() {
		clearStage();
		initAlisDescMenu();
		displayVideo("animOIO");
		setHomeBtn();
	}, 2000);
	
}




function initAlisDescMenu(){
	
	alisDescTitle = new Kinetic.Text( {
		text : "La compagnie Alis",
		fontFamily : "Century Gothic",
		fontSize : titleSize,
		fill : "#FFF",
		align : "center",
		x : stage.getWidth()/2,
		y : stage.getHeight()*0.05
	} );
	alisDescTitle.setOffset( alisDescTitle.getWidth()/2, 0 );
	actionLayer.add(alisDescTitle);
	
	alisDescText = new Kinetic.Text( {
		text : "ALIS s'emploie a manipuler et detourner des signes parfaitement reconnaissables par tous pour ouvrir sur d'autres sens.",
		fontFamily : "Century Gothic",
		fontSize : centraleSize,
		fill : "#FFF",
		align : "center",
		x : stage.getWidth()/2,
		y : stage.getHeight()*0.2
	} );
	alisDescText.setOffset( alisDescText.getWidth()/2, 0 );
	actionLayer.add(alisDescText);	
	
}




function displayVideo(videoName){
	var mainTag=document.getElementsByTagName("body")[0];
	
	var videoTag=document.createElement("video");
	
	var attTaId=document.createAttribute("id");//ok
	attTaId.value="animOIO";
	
	var attTaId=document.createAttribute("preload");//ok
	attTaId.value="auto";

	var attTaWidth=document.createAttribute("width");//ok
	attTaWidth.value="320";
	
	var attTaHeight=document.createAttribute("height");//ok
	attTaHeight.value="240";
	
	var attControls=document.createAttribute("controls");
	attControls.value="controls";
	
	var sourceTag1=document.createElement("source");
	
	var attSrc=document.createAttribute("src");
	attSrc.value=videoName+".mp4";
	
	
	var attType1=document.createAttribute("type");
	attType1.value="video/mp4";
	

	var sourceTag2=document.createElement("source");
	
	var attSrc2=document.createAttribute("src");
	attSrc2.value=videoName+".ogg";
	
	
	var attType2=document.createAttribute("type");
	attType2.value="video/ogg";
	
	mainTag.appendChild(videoTag);
	videoTag.appendChild(sourceTag1);
	videoTag.appendChild(sourceTag2);
	
	videoTag.setAttributeNode(attTaId);
	videoTag.setAttributeNode(attTaWidth);
	videoTag.setAttributeNode(attTaHeight);
	videoTag.setAttributeNode(attControls);
	sourceTag1.setAttributeNode(attSrc);
	sourceTag1.setAttributeNode(attType1);	
	sourceTag2.setAttributeNode(attSrc2);
	sourceTag2.setAttributeNode(attType2);	

}


