/*
 * Gestures for the Separation Project
 */

 var Gestures = new Array();
 
 var mouseDown = false;

 Gestures.prototype.cut = function(parameters, layer, stage){
  var rect = new Kinetic.Rect({
    x: parameters.x,
    y: parameters.y,
    width: parameters.width,
    height: parameters.height,
    opacity: 0
  });

  var x = 0;

  this.on = function(handler) {
	rect.on('mousedown', function(evt) {
		mouseDown = true;
	});
	
	rect.on('mouseup', function(evt) {
		mouseDown = false;
	});
  
    rect.on('touchmove', function(evt){
	  var touchPos = stage.getTouchPosition();

      if(touchPos.x >= (parameters.width + parameters.x - 20)) {
		x = parameters.width + parameters.x;
		}
      else if((x != 0) && (touchPos.x <= (parameters.x + 20))) {
        x = 0;
        handler()
      }  
      else if((touchPos.x < x) && ((touchPos.y < (parameters.height + parameters.y)) && (touchPos.y > parameters.y))){ x = touchPos.x; }
      else{ x = 0; }
    });
	
	rect.on('mousemove', function(evt){
		if(mouseDown) {
			var mousePos = stage.getMousePosition();
			
			if(mousePos.x >= (parameters.width + parameters.x - 20)){
				x = parameters.width + parameters.x;
				}
			else if((x != 0) && (mousePos.x <= (parameters.x + 20))) {
        x = 0;
        handler()
		}  
		else if((mousePos.x < x) && ((mousePos.y < (parameters.height + parameters.y)) && (mousePos.y > parameters.y))) {
			x = mousePos.x; }
		else{ x = 0; }
	  }
    });
	
  }

  layer.add(rect);
};

Gestures.Word = function(parameters, layer){
  Kinetic.Text.call(this, parameters);

  this.on('tap', function(){
      TweenLite.to(this, 1, {
        setScaleX: 2,
        setScaleY: 2,
        delay: 0,
        onUpdate: function() {
          layer.batchDraw() 
        }
      })
  });
};

Gestures.Word.prototype = new Kinetic.Text();
 