/*********************************
 *        Global variables       *
 *********************************/
 
var video = -1;
 
var domaineSeparation = "http://i-trace.fr/2013/laseparation/P2MM";
var procedesDispo = new Array();

var currentGesture;
 
var screenWidth;
var screenHeight;

var inTuto = false;
var inLab = false;
var currentStoryType;

var btnFunctions = new Array();

var homeBtn;
var shuffleBtn;
var returnBtn;

var arrowUp;
var arrowDown;

var images = new Array();
var sounds = new Array();
var stage;
var mainLayer = new Kinetic.Layer();
var actionLayer = new Kinetic.Layer();

/*Main font sizes*/
var titleSize;
var demiSize;
var entireSize;
var centraleSize;

var timeStart;
var timeEnd;

var maxVisibleLines = 5;

var en = {
			"tuto" : "help",
			"story" : "story",
			"labo" : "lab",
			"concept" : "about",
			"lang" : "fr", 
			"labPromptInstruction" : "Type a word"
			};
var fr = {
			"tuto" : "aide",
			"story" : "recit",
			"labo" : "labo",
			"concept" : "a propos",
			"lang" : "en",
			"labPromptInstruction" : "Entrez un mot"
			};

var tuto_en = {
				"instruction" : "Tap the word",
				"upStart" : "application", 
				"upEnd" : "realisation",
				"shadowStart" : "lab", 
				"shadowEnd" : "about",
				"centralStart" : "fr",
				"centralEnd" : ""
				};
var tuto_fr = {
				"instruction" : "Touchez le mot",
				"upStart" : "HAINE",
				"upEnd" : "HELAS",
				"shadowStart" : "CACHE", 
				"shadowEnd" : "ORDRE",
				"centralStart" : "COUTEAU",
				"centralEnd" : "SOUTENU" 
				};	
				
var activeLang = fr;

var wordLabo;

var answers = new Array();