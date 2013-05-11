//Un array de phrases, et dans chaque phrase, plusieurs mots + mot actif
var storyTest;

//Un array de titres
var stories;

var xmlFile;
var xmlPath = "./stories/test.xml";

var StoryType = {"alter" : 0, "continue" : 1};
var Transition = {"up" : 0, "down" : 1, "central" : 2, "shadow" : 3};

function loadXMLDoc() {
	if(navigator.appname == 'Microsoft Internet Explorer') {
		xmlFile = new ActiveXObject("Microsoft.XMLDOM");
		xmlFile.async = false;
		while(xmlFile.readyState != 4) {};
		xmlFile.load(xmlPath);
	}
	else {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open("GET", xmlPath, false);
		xmlhttp.setRequestHeader('Content-Type', 'text/xml');
		xmlhttp.send();
		xmlFile = xmlhttp.responseXML;
	}
	//alert(xmlFile);
	return xmlFile;
}


//Object Story, with its name, its type, and the array of sentences
function Story(name, type) {
	this.name = name;
	this.type = type;
	this.sentences = array();
}

//Object Sentence with the array of words (inactive and active)
function Sentence() {
	this.words = array();
}

function Word(value)
{
	this.value = new Kinetic.Text( {
		fill : "#FFF",
		text : value
	} );
}

Word.prototype.activeFalse = function () {
	alert("mauvais mot");
};

function ActiveWord(value, newValue, type)
{
	this.value = value;
	this.newValue = newValue;
	this.activeZone;
	this.type = type;
}

ActiveWord.prototype.activeTransition = function () {
		if(this.type = Type.bas) {
			alert("bas");
		}
		else if(this.type = Type.haut) {
			alert("haut");
		}
		else if(this.type = Type.centrale) {
			alert("centrale");
		}
		else if(this.type = Type.ombre) {
			alert("ombre");
		}
};

ActiveWord.prototype.recognizeGesture = function () {
	alert("gesture");
};
	
ActiveWord.prototype.changeWord = function () {
	alert("changeword");
		//animation en fction classe
		//réafficher à l'écran
};
	
ActiveWord.prototype.helpUser = function () {
	setTimeout( function() {
		//changer opacite avec kinetic js
		objectTaChange.transitionTo({
			opacity:0;
		});
	}, 10000);
};	

ActiveWord.prototype.removeHelp = function () {
	clearTimeout(helpTimer);
};



function storiesFromXML() {
	var tmpStories = xmlFile.getElementsByTagName("story");
	for(var index = 0; index < tmpStories.length ; index++) {
		var tmpType;
		if(tmpStories[index].getAttribute("type") == "alter") {
			alert("alter");
			tmpType = StoryType["alter"];
		}
		else {
			alert("continue");
			tmpType = StoryType["continue"];
		}
		tmpStories[index].
		stories[index] = new Story(tmpStories[index].val(), tmpType);
	}
}

function getStoryFromXml(titlePost) {
	//reouvrir fichier
	xmlFile=loadXMLDoc();
	//selectionner bonne balise avec title
	titlesList=xmlFile.getElementsByTagName("title");
	for(i=0;i<titlesList.length;i++){
		if(titlesList[i]==titlePost){
			storyNode=titlesList[i].parentNode;
		}
	}
	if(storyNode.getAttribute("type")=="alter"){
		createStoryAlter(storyNode);
	}
	else if(storyNode.getAttribute("type")=="continue"){
		createStoryContinue(storyNode);
	}

}


function createStoryAlter(storyNode){
	sentencesNodes=storyNode.getElementsByTagName(sentence);
	for(i=0;i<sentencesNodes.length;i++){
		//affichage de toutes les phrases en même temps à l'écran
	}
	
	//créer plusieurs phrases
	//on boucle sur les phrases pour stocker mots
	//créer mots actifs
}

function createStoryContinue(storyNode){
	//phrase une à une. if transition=>phrase=2
	
	//créer plusieurs phrases
	//on boucle sur les phrases pour stocker mots
	//créer mots actifs
}

function displaySentence(sentenceNode){
	wordsList=sentenceNode.childNodes;
	var sentenceArray=new Array();
	for(i=0;i<wordsList.length;i++){
		if(wordsList[i].hasAttributes()==false){
			sentenceArray.push(wordsList[i].nodeValue);
		}
		else{
			var wordWithTransition=getWordWithTransition(wordsList[i]);
			sentenceArray.push(wordWithTransition);
		}
	}
}

function getWordWithTransition(wordNode){ // récupérer transition adéquate pour chaque procédé
	transitionType=wordNode.getAttribute("font");
	var wordWithTransition="";
	switch (transitionType) {
		case coupable_haut: 
			
		break; 
		
		case coupable_bas: 
			
		break; 
		
		case centrale: 
			
		break; 
		case ombre: 
			
		break; 
		
		default: 
			
		break;
	}
	return wordWithTransition;
}