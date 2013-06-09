//Un array de titres
var stories = new Array();

var alreadyReadXML = false;

var xmlFile;
var frXmlPath = "./stories/fr_xml.xml";
var enXmlPath = "./stories/en_xml.xml";

var StoryType = {"alter" : 0, "continue" : 1};
var Transition = {"up" : 0, "down" : 1, "central" : 2, "shadow" : 3, "err" : -1};

function loadXMLDocRecit(lang) {
	var xmlPath;
	if(lang == "fr") { xmlPath = frXmlPath; } else { xmlPath = enXmlPath; }
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
		x : 0,
		y : 0,
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
	this.value;
	switch(this.type) {
	
		case Transition["up"] :
			this.value = new word_demihaut({
				x: 0,
				y: 0,
				mot1: value,
				mot2: next,
				fontSize: demiSize/2,
				fill: '#FFF',
				offsetMot2: - stage.getWidth()*2
			  });
			/*this.value.group.on('tap', function(){
				if(lock == 0){
					lock = 1;
					//TODO A REFAIRE
					//cut_activation();
					setTimeout(function(){ // attente pour récupérer les bons zooms
						var anim = new Separation.cut_animation(cut_word);
						var can_play = ((lock == 1) ? true : false);
						anim.start(can_play);          

						var cut_unZoom = new Separation.onCorner();
						cut_unZoom.on(function(){
							//TODO A REFAIRE
							//cut_desactivation();
							lock = 0;
						});
					}, 2000);
				}
			});*/
			break;
			
		case Transition["down"] : 
			this.value = new word_demibas({
				x: 0,
				y: 0,
				mot1: value,
				mot2: next,
				fontSize: demiSize/2,
				fill: '#FFF',
				offsetMot2: - stage.getWidth()*2
			  });
			  /*this.value.group.on('tap', function(){
				if(lock == 0){
					lock = 1;
					//TODO A REFAIRE
					//cut_activation();
					setTimeout(function(){ // attente pour récupérer les bons zooms
						var anim = new Separation.cut_animation(cut_word);
						var can_play = ((lock == 1) ? true : false);
						anim.start(can_play);          

						var cut_unZoom = new Separation.onCorner();
						cut_unZoom.on(function(){
							//TODO A REFAIRE
							//cut_desactivation();
							lock = 0;
							});
						}, 2000);
					}
				});*/
			break;
			
		case Transition["central"] : 
			this.value = new word_centrale({
				x: 0,
				y: 0,
				mot1: value,
				mot2: next,
				fontSize: centraleSize/3,
				fill: '#FFF',
				offsetMot2: - stage.getWidth()*2
			  });
			  
			/*this.value.group.on('tap', function(){
				if(lock == 0){
					lock = 3;
					//TODO A REFAIRE ACTIVATION
					//tear_activation();

					setTimeout(function(){ // attente pour récupérer les bons zooms
						var anim = new Separation.tear_animation(tear_word);
						var can_play = ((lock == 3) ? true : false);
						anim.start(((lock == 3) ? true : false));          

						var tear_unZoom = new Separation.onCorner();
						tear_unZoom.on(function(){
							//TODO A REFAIRE DESACTIVATION
							//tear_desactivation();
							can_play = false;
							lock = 0;
						});
					}, 2000);
				}
			});*/
			
			break;
			
		case Transition["shadow"]:
			var tmpImg = "imgs/stories/" + value + ".png";
			var tmpNext = "imgs/stories/" + next + ".png";
			this.value = new word_ombre({
				x: 0,
				y: 0,
				img1: tmpImg,
				img2: tmpNext,
			  });
			
			/*this.value.group.on('tap', function(){
				if(lock == 0){
					lock = 2;
					//TODO REFAIRE ACTIVATION
					//rub_activation();
					setTimeout(function(){
						var anim = new Separation.rub_animation(this.value);
						var can_play = ((lock == 2) ? true : false);
						anim.start(can_play);          

						var rub_unZoom = new Separation.onCorner();
						rub_unZoom.on(function(){
							//TODO REFAIRE DEACTIVATION
							//rub_desactivation();
							lock = 0;
						});
					}, 2000); 
				}
			});*/
			break;
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

//fix problem with sequence
//Create entire sentences and words from story in memory
function getStoryFromXML(story) {
	var tmpSen = story.storyNode.getElementsByTagName("sentence");
	for(var s = 0 ; s < tmpSen.length ; s++) {
		var tmpWords = tmpSen[s].getElementsByTagName("word");
		var tmpSentence = new Sentence();
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