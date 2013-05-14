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
function Story(title, type, node) {
	this.storyNode = node;
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

ActiveWord.prototype.setActiveZone = function () {
};
	
ActiveWord.prototype.changeWord = function () {
	alert("changeword");
		//animation en fction classe
		//réafficher à l'écran
};
	
ActiveWord.prototype.helpUser = function () {
	setTimeout( function() {
		alert("help");
		//changer opacite avec kinetic js
		/*objectTaChange.transitionTo({
			opacity:0;
		});
	}, 10000);*/
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
		stories[index] = new Story(title, tmpType, tmpStories[index]);
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

//Create entire sentences and words from story in memory
function getStoryFromXML(story) {
	tmpSen = story.storyNode.getElementsByTagName("sentence");
	for(var s = 0 ; s < tmpSen.length ; s++) {
		tmpWords = tmpSen[s].getElementsByTagName("word");
		tmpSentence = new Sentence();
		for(var w = 0; w < tmpWords.length ; w++) {
			var tmpWord;
			if(tmpWords[w].attributes.length > 0) {
				tmpWord = new ActiveWord( tmpWords[w].textContent );
			}
			else {
				tmpWord = new Word( tmpWords[w].textContent );
				tmpWord.value.on("tap click", function() {
					this.activeFalse();
				} );
			}
			tmpSentence.words[w] = tmpWord;
		}
		story.sentences[s] = tmpSentence;
	}
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