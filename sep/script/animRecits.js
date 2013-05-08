function loadXMLDoc(dname){

    if (window.XMLHttpRequest){
        xhttp=new XMLHttpRequest();
    }
    
    else{
        xhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    
    xhttp.open("GET",dname,false);
    xhttp.send();
    
    return xhttp.responseXML;

}


function getNomsRecits(xmlDoc){
    titres=xmlDoc.getElementsByTagName("titre");
    premierTitre=titres[0].childNodes[0].nodeValue;
    nbrTitres=xmlDoc.getElementsByTagName("titre").length;
    var listeTitres = new Array();
    for (i = 0; i < nbrTitres; i++){
        titre=titres[i].childNodes[0].nodeValue;
        //document.write(titre, "\n");
        listeTitres[i] = titre;
    }
    return listeTitres;
}





function setTextName(name, text){
    text.setAttrs({
        text: name
    });
    return text;
}


function getTextH(i){
    var text_h = new Kinetic.Text({
        x: stage.getWidth() / 2,
		y: stage.getHeight() / 2 + 100*(i-1),
        fontSize: 20,
        fontFamily: 'Demibas_haut',
        fill: 'white'
    });
    
    text_h.setOffset({ 
        x: text_h.getWidth() / 2,
        y: text_h.getWidth()*i
    });
return text_h;
}



function getTextB(i){
    var text_b = new Kinetic.Text({
        x: stage.getWidth() / 2,
		y: stage.getHeight() / 2+100*(i-1),
        fontSize: 20,
        fontFamily: 'Demibas_bas',
        fill: 'white'
    });
    
    text_b.setOffset({
        x: text_b.getWidth() / 2,
        y: -text_b.getHeight() + text_b.getWidth()*i,
    });
    return text_b;
}




function text_propage(text, anim_propage) {
    anim_propage.start();
    setTimeout(function(){ anim_propage.stop(); }, 500)
	//window.location.href ="menuRecits.html";
}


function text_rassemble(anim_rassemble) {
    anim_rassemble.start();
    setTimeout(function(){ 
		anim_rassemble.stop(); }
	, 500)
}


var stage = new Kinetic.Stage({
    container: 'container',
    width: 1024,
    height: 720
});


function newpropageAnimation(layer){

	var anim_propage = new Kinetic.Animation( function(frame) {
	
		var time = frame.time,
		timeDiff = frame.timeDiff,
		frameRate = frame.frameRate;
		
		text_h.setY(text_h.getY()-1);
		text_b.setY(text_b.getY()+1);
		
	}, layer );
	
	return anim_propage;
}


function newrassembleAnimation(layer){

	var anim_rassemble = new Kinetic.Animation( function(frame) {
	
		var time = frame.time,
		timeDiff = frame.timeDiff,
		frameRate = frame.frameRate;
		
		text_h.setY(text_h.getY()+1);
		text_b.setY(text_b.getY()-1);
		
	}, layer );
	
	return anim_rassemble;
}


function makeBig(shape, easing) {
	shape.on('mouseover touchstart', function() {
		this.transitionTo({
			scale: {
				x: 2,
				y: 1.5
			},
			duration: 1,
			easing: easing
		});
	});
	shape.on('mouseout touchend', function() {
		this.transitionTo({
			scale: {
				x: 1,
				y: 1
			},
			duration: 1,
			easing: easing
		});
	});
}


function linearMove1(text, i) {
	if (text.x==0)
		text.transitionTo({
			x: stage.getWidth() / 2 ,
			duration: 5,
			easing: "linear",
			scale: {
				x: 1,
				y: 1
			},
		});

}

function linearMove2(text, i) {
	text.transitionTo({
		x: 0 ,
		duration: 5,
		easing: "linear",
		scale: {
			x: 1,
			y: 1
		},
	});
}

function animRecit(text, i){

	var boolRebond=0;
	var layer = new Kinetic.Layer();
	
	text_h=setTextName(text, getTextH(i));
	text_b=setTextName(text, getTextB(i));

	//makeBig(text_h, 'ease-in');
	//makeBig(text_b, 'ease-in');
	
	var anim_propage=newpropageAnimation(layer);
	var anim_rassemble=newrassembleAnimation(layer);

	layer.add(text_h);
	layer.add(text_b);
	stage.add(layer);
	
	
	if(boolRebond==0){
		setTimeout(linearMove1(text_h, i), 5000);
		setTimeout(linearMove1(text_b, i), 5000);
		boolRebond=1;
	}
	if(boolRebond==1){
		setTimeout(linearMove2(text_h, i));
		setTimeout(linearMove2(text_b, i));
		boolRebond=0;
	}
	
	var boolUpDown = 0;
	// mouseover, mousemove, mouseout, mouseenter, mouseleave, mousedown, mouseup, click, dblclick, touchstart, touchmove, touchend,
	//tap, dbltap, dragstart, dragmove, and dragend events. Pass in a string of events delimmited by a space to bind multiple events
	//at once such as 'mousedown mouseup mousemove'
	layer.on('tap click', function() {
		if(boolUpDown == 0){
			text_propage(text_h, anim_propage);
			boolUpDown = 1;
		} else if(boolUpDown == 1){
			text_rassemble(anim_rassemble);
			
			setTimeout(function () {
				window.location.href ="index.html"; // suite: anim recit
			}, 1000); // attendre la fin de l'animation pour passer au récit
			
			boolUpDown = 0;
		}
});

	return layer;
}




xmlDoc=loadXMLDoc("recit.xml");
nomsRecits=getNomsRecits(xmlDoc);

for (i = 0; i < nomsRecits.length; i++){
	animRecit(nomsRecits[i], i); 
}