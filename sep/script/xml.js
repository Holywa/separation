//Un array de titres
var stories = new Array();

var alreadyReadXML = false;

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
}

//Object Story, with its title, its type, and the array of sentences
function Story(title, type) {
	this.title = title;
	this.type = type;
	this.sentences = new Array();
}

//Object Sentence with the array of words (inactive and active)
function Sentence() {
	this.words = new Array();
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
	}, 10000);
};	

ActiveWord.prototype.removeHelp = function () {
	clearTimeout(helpTimer);
};

//Getting all stories to display titles
function storiesFromXML() {
	alreadyReadXML = true;
	var tmpStories = xmlFile.getElementsByTagName("story");
	for(var index = 0; index < tmpStories.length ; index++) {
		var tmpType;
		if(tmpStories[index].getAttribute("type") == "alter") {
			tmpType = StoryType["alter"];
		}
		else {
			tmpType = StoryType["continue"];
		}
		var title = tmpStories[index].getElementsByTagName("title")[0].textContent;
		stories[index] = new Story(title, tmpType);
	}
}

function getRightStory(title) {
	for(var i = 0; i < stories.length ; i++) {
		if(stories[i].title.value == title.value) {
			return stories[i];
		}		
	}
	alert("Story not found.");
	return null;
}

function getStoryFromXML(story) {
	alert("getStoryFromXML");
	//reouvrir fichier
	//selectionner bonne balise avec title
	//créer plusieurs phrases
	//on boucle sur les phrases pour stocker mots
	//créer mots actifs
}