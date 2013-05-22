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
		fill : "#FFF",
		text : value
	} );
}

function ActiveWord(value, next, type)
{
	this.value = new Kinetic.Text( {
		fill : "#FFF",
		text : value
	} );
	this.nextValue = new Kinetic.Text( {
		fill : "#FFF",
		text : next
	} );
	
	this.active = true;
	
	this.type = type;
}

/*function ActiveWord(value, newValue, type)
{
	if(this.type == Transition["shadow"])
	{
		this.value = new Word(value);
		this.newValue = new Word(newValue);
		this.newValue.setOpacity(0);
		this.active = this.value;
	}
	else {
		this.value = value;
		this.newValue = newValue;
	}
}

ActiveWord.prototype.transitionShadow = function () {
	this.active.on('tap click', function() {
		if(this.active == this.value) {
			this.value.transitionTo( {
				opacity : 0, duration : 2
			} );
			this.newValue.transitionTo( {
				opacity : 1, duration : 2
			} );
			this.active = this.newValue;
			newValue.moveToTop();
		}
		else {
			this.value.transitionTo( {
				opacity : 1, duration : 2
			} );
			this.newValue.transitionTo( {
				opacity : 0, duration : 2
			} );
			this.active = this.value;
			value.moveToTop();
		}
	});
}*/

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
					case "coupable_haut": Transition["up"]; break;
					case "coupable_bas" : Transition["down"]; break;
					case "centrale" : Transition["central"]; break;
					case "ombre" : Transition["shadow"]; break;
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