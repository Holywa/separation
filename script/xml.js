//Un array de titres
var stories = new Array();

var alreadyReadXML = false;

var xmlFile;
var xmlPath = "./stories/test.xml";

var StoryType = {"alter" : 0, "continue" : 1};
var Transition = {"up" : 0, "down" : 1, "central" : 2, "shadow" : 3, "err" : -1};

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
		fontFamily : "DemiBas",
		fontSize : entireSize,
		fill : "#FFF",
		text : value,
		offset : { x : 0 , y : 0 }
	} );
}

function ActiveWord(value, next, type)
{
	this.active = true;
	this.type = type;
	this.value = new Kinetic.Group();
	switch(this.type) {
		case Transition["up"] : {
			this.stillPart = new Kinetic.Text( {
				fontFamily : "DemiHautB",
				fontSize : demiSize/2,
				fill : "#FFF",
				text : value,
				offset : { x : 0 , y : 0}
			} );
			this.actualPart = new Kinetic.Text( {
				fontFamily : "DemiHautH",
				fontSize : demiSize/2,
				fill : "#FFF",
				text : value,
				offset : { x : 0, y ; 0}
				x : stillPart.getX(),
				y : stillPart.getY() - stillPart.getHeight()
			} );
			this.nextPart = new Kinetic.Text( {
				fontFamily : "DemiHautH",
				fontSize : demiSize/2,
				fill : "#FFF",
				text : next,
				offset : { x : 0, y : 0}
			} );
			break;
		}

		case Transition["down"] : {
			this.stillPart = new Kinetic.Text( {
				fontFamily : "DemiBasH",
				fontSize : demiSize/2,
				fill : "#FFF",
				text : value,
				offset : { x : 0 , y : 0}
			} );
			this.actualPart = new Kinetic.Text( {
				fontFamily : "DemiBasB",
				fontSize : demiSize/2,
				fill : "#FFF",
				text : value,
				offset : { x : 0 , y : 0},
				x : stillPart.getX(),
				y : stillPart.getY() + stillPart.getHeight()
			} );
			this.nextPart = new Kinetic.Text( {
				fontFamily : "DemiBasB",
				fontSize : demiSize/2,
				fill : "#FFF",
				text : next,
				offset : { x : 0 , y : 0}
			} );
			break;
		}
		this.value.add(stillPart);
		this.value.add(actualPart);
		this.value.add(nextPart);
	}
}

//Getting all stories to display titles
function storiesFromXML() {
	if(alreadyReadXML) return;
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
		if(title === stories[i].title) {
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
				var next = tmpWords[w].getAttribute("next");
				var type = Transition["err"];
				switch(tmpWords[w].getAttribute("font"))
				{
					case "coupable_haut": type = Transition["up"]; break;
					case "coupable_bas" : type = Transition["down"]; break;
					case "centrale" : type = Transition["central"]; break;
					case "ombre" : type = Transition["shadow"]; break;
				}
				tmpWord = new ActiveWord( tmpWords[w].textContent, next, type );
			}
			else {
				tmpWord = new Word( tmpWords[w].textContent );
			}
			tmpSentence.words[w] = tmpWord;
		}
		story.sentences[s] = tmpSentence;
	}
}