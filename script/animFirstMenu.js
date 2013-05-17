function setTextName(name, text){
    text.setAttrs({
        text: name
    });
    return text;
}


function getTextH(i){
    var text_h = new Kinetic.Text({
        x: stage.getWidth() / 2,
		y:100*i,
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
		y:100*i,
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


function linearMove(text, i) {
	text.transitionTo({
		x: 0 ,
		duration: 5,
		easing: "linear",
		scale: {
			x: 1.6,
			y: 1.6
		},

	});
}
function animRecit(text, location, i){

	var layer = new Kinetic.Layer();
	
	text_h=setTextName(text, getTextH(i));
	text_b=setTextName(text, getTextB(i));

	var anim_propage=newpropageAnimation(layer);
	var anim_rassemble=newrassembleAnimation(layer);

	layer.add(text_h);
	layer.add(text_b);
	stage.add(layer);
	
	setTimeout(linearMove(text_h, i));
	setTimeout(linearMove(text_b, i));
	
	var boolUpDown = 0;
	

	layer.on('tap click', function() {  
		if(boolUpDown == 0){
			text_propage(text_h, anim_propage);
			
			boolUpDown = 1;
		} else if(boolUpDown == 1){
			text_rassemble(anim_rassemble);
			boolUpDown = 0;
			setTimeout(function () {
				window.location.href =location;
			}, 1000);
		}
});

	return layer;
}

//, link, i
animRecit("le laboratoire des mots", "laboDesMots.html", 0);
animRecit("le recit des mots", "menuRecits.html", 1);